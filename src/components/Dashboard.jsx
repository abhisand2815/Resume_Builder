import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { FileText, Download, Trash2, Edit3, Plus } from 'lucide-react';

const Dashboard = ({ onSelectResume, onNewResume, customConfirm, showToast }) => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .order('updated_at', { ascending: false });
        
      if (!error) setResumes(data);
    }
    setLoading(false);
  };

  const deleteResume = async (id) => {
    customConfirm({
      title: 'Delete Resume',
      message: 'Are you sure you want to delete this resume? This action cannot be undone.',
      onConfirm: async () => {
        const { error } = await supabase
          .from('resumes')
          .delete()
          .match({ id });
          
        if (!error) {
          setResumes(resumes.filter(r => r.id !== id));
          showToast('Resume deleted successfully.');
        } else {
          showToast('Failed to delete resume.', 'error');
        }
      }
    });
  };

  if (loading) {
    return <div className="dashboard-loading">Loading your resumes...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>My Resumes</h2>
        <button className="new-resume-btn" onClick={onNewResume}>
          <Plus size={18} /> New Resume
        </button>
      </div>

      {resumes.length === 0 ? (
        <div className="no-resumes">
          <FileText size={48} />
          <p>You haven't saved any resumes yet.</p>
          <button onClick={onNewResume}>Create your first resume</button>
        </div>
      ) : (
        <div className="resume-grid">
          {resumes.map((resume) => (
            <div key={resume.id} className="resume-card">
              <div className="resume-card-icon">
                <FileText size={32} />
              </div>
              <div className="resume-card-info">
                <h3>{resume.name}</h3>
                <p>Last updated: {new Date(resume.updated_at).toLocaleDateString()}</p>
              </div>
              <div className="resume-card-actions">
                <button className="edit-btn" onClick={() => onSelectResume(resume)}>
                  <Edit3 size={18} /> Edit
                </button>
                <button className="delete-btn" onClick={() => deleteResume(resume.id)}>
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
