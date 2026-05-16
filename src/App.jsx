import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, LogOut, Save, LayoutDashboard, Plus, FileText, CheckCircle } from 'lucide-react';
import { supabase } from './supabase';
import AuthModal from './components/AuthModal';
import Dashboard from './components/Dashboard';
import Toast from './components/Toast';
import ConfirmModal from './components/ConfirmModal';
import './App.css';

import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';

function App() {
  const [template, setTemplate] = useState('modern');
  const [isGenerating, setIsGenerating] = useState(false);
  const [session, setSession] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [currentResumeId, setCurrentResumeId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [confirmConfig, setConfirmConfig] = useState({ isOpen: false, title: '', message: '', onConfirm: () => {} });

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };
  
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: '',
      jobTitle: '',
      email: '',
      phone: '',
      address: '',
      cgpa: '',
      summary: '',
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    extracurricular: [],
    achievements: [],
    certificates: [],
  });

  const resumeRef = useRef(null);

  // We add a scaling effect in the UI
  // and pass it down. But html2canvas requires the element to be unscaled.
  // We'll handle scaling via CSS and remove it temporarily during PDF generation.
  const handleDownloadPDF = async () => {
    if (!session) {
      setIsAuthModalOpen(true);
      return;
    }

    if (!resumeRef.current) return;
    
    setIsGenerating(true);
    
    try {
      const element = resumeRef.current;
      
      // Temporarily remove transform and shadow for accurate PDF generation
      const originalTransform = element.style.transform;
      const originalShadow = element.style.boxShadow;
      element.style.transform = 'none';
      element.style.boxShadow = 'none';

      // Capture all link positions NOW, before html2canvas runs
      // At this point the element has no transform, same state as html2canvas will capture
      const elementRect = element.getBoundingClientRect();
      const linkData = [];
      element.querySelectorAll('a[href]').forEach((link) => {
        const href = link.getAttribute('href');
        if (!href || href === '#') return;
        const linkRect = link.getBoundingClientRect();
        linkData.push({
          href,
          x: linkRect.left - elementRect.left,
          y: linkRect.top - elementRect.top,
          w: linkRect.width,
          h: linkRect.height,
        });
      });

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      
      // Restore transform and shadow
      element.style.transform = originalTransform;
      element.style.boxShadow = originalShadow;
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // Add clickable link annotations at the pre-captured positions
      // element.offsetWidth is the layout width (no transform), same as what html2canvas used
      const scaleX = pdfWidth / element.offsetWidth;
      const scaleY = pdfHeight / element.offsetHeight;

      linkData.forEach(({ href, x, y, w, h }) => {
        const pdfX = x * scaleX;
        const pdfY = y * scaleY;
        const pdfW = w * scaleX;
        const pdfH = h * scaleY;
        if (pdfW > 0 && pdfH > 0) {
          pdf.link(pdfX, pdfY, pdfW, pdfH, { url: href });
        }
      });
      const fileName = `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_${Date.now()}.pdf`;
      
      // Convert PDF to Blob for upload
      const pdfBlob = pdf.output('blob');
      
      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(`${session.user.id}/${fileName}`, pdfBlob);

      if (uploadError) throw uploadError;

      // Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('resumes')
        .getPublicUrl(`${session.user.id}/${fileName}`);

      // Update Database if currentResumeId exists
      if (currentResumeId) {
        await supabase
          .from('resumes')
          .update({ pdf_url: publicUrl })
          .match({ id: currentResumeId });
      }

      pdf.save(fileName);
      showToast('Resume downloaded and backed up to cloud!');
    } catch (error) {
      console.error('Error generating PDF', error);
      showToast('Failed to generate PDF. Please try again.', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!session) {
      setIsAuthModalOpen(true);
      return;
    }

    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const resumeName = resumeData.personalInfo.fullName || 'Untitled Resume';
      
      const payload = {
        user_id: user.id,
        name: resumeName,
        data: resumeData,
        template: template,
        updated_at: new Date().toISOString(),
      };

      if (currentResumeId) {
        const { error } = await supabase
          .from('resumes')
          .update(payload)
          .match({ id: currentResumeId });
        if (error) throw error;
        showToast('Resume updated successfully!');
      } else {
        const { data, error } = await supabase
          .from('resumes')
          .insert([payload])
          .select();
        if (error) throw error;
        setCurrentResumeId(data[0].id);
        showToast('Resume saved to dashboard!');
      }
    } catch (error) {
      console.error('Error saving resume:', error);
      showToast('Failed to save resume.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSelectResume = (resume) => {
    setResumeData(resume.data);
    setTemplate(resume.template);
    setCurrentResumeId(resume.id);
    setIsDashboardOpen(false);
  };

  const handleNewResume = () => {
    setResumeData({
      personalInfo: { fullName: '', jobTitle: '', email: '', phone: '', address: '', cgpa: '', summary: '' },
      experience: [],
      education: [],
      skills: [],
      projects: [],
      extracurricular: [],
      achievements: [],
      certificates: [],
    });
    setCurrentResumeId(null);
    setIsDashboardOpen(false);
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="navbar-brand">
          <FileText size={24} />
          <span>ResumePro</span>
        </div>
        
        <div className="navbar-links">
          <button 
            className={`nav-link ${!isDashboardOpen ? 'active' : ''}`}
            onClick={() => setIsDashboardOpen(false)}
          >
            Resume Builder
          </button>
          {session && (
            <button 
              className={`nav-link ${isDashboardOpen ? 'active' : ''}`}
              onClick={() => setIsDashboardOpen(true)}
            >
              Dashboard
            </button>
          )}
        </div>

        <div className="user-controls">
          {session ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span className="user-email">{session.user.email}</span>
              <button className="sign-out-btn" title="Logout" onClick={() => {
                supabase.auth.signOut();
                setIsDashboardOpen(false);
              }}>
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button className="template-btn" onClick={() => setIsAuthModalOpen(true)}>
              Sign In
            </button>
          )}
        </div>
      </nav>

      <div className="main-content">
        <div className="left-panel">
          <div className="header">
            <h2>{isDashboardOpen ? 'Dashboard' : 'Information'}</h2>
            <p>{isDashboardOpen ? 'Manage your saved resumes.' : 'Fill in your details to generate your professional resume.'}</p>
          </div>

          {isDashboardOpen ? (
            <Dashboard 
              onSelectResume={handleSelectResume} 
              onNewResume={handleNewResume}
              customConfirm={(config) => setConfirmConfig({ ...config, isOpen: true })}
              showToast={showToast}
            />
          ) : (
            <div style={{ padding: '0 2rem' }}>
              <ResumeForm data={resumeData} setData={setResumeData} />
            </div>
          )}
        </div>
      
      <div className="right-panel">
        <div className="preview-header">
          <div className="template-selector">
            <button 
              className={`template-btn ${template === 'plain' ? 'active' : ''}`}
              onClick={() => setTemplate('plain')}
            >
              Plain
            </button>
            <button 
              className={`template-btn ${template === 'modern' ? 'active' : ''}`}
              onClick={() => setTemplate('modern')}
            >
              Modern
            </button>
            <button 
              className={`template-btn ${template === 'professional' ? 'active' : ''}`}
              onClick={() => setTemplate('professional')}
            >
              Professional
            </button>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="save-btn" onClick={handleSave} disabled={isSaving}>
              <Save size={18} />
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            <button 
              className="download-btn" 
              onClick={handleDownloadPDF}
              disabled={isGenerating}
            >
              <Download size={18} />
              {isGenerating ? 'Generating...' : 'Download PDF'}
            </button>
          </div>
        </div>

        
        <div className="preview-container">
          <ResumePreview 
            ref={resumeRef}
            data={resumeData} 
            template={template} 
          />
        </div>
      </div>
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />

      <ConfirmModal 
        isOpen={confirmConfig.isOpen}
        title={confirmConfig.title}
        message={confirmConfig.message}
        onConfirm={() => {
          confirmConfig.onConfirm();
          setConfirmConfig(prev => ({ ...prev, isOpen: false }));
        }}
        onCancel={() => setConfirmConfig(prev => ({ ...prev, isOpen: false }))}
      />

      <div className="toast-container">
        {toasts.map(toast => (
          <Toast 
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  </div>
  );
}

export default App;
