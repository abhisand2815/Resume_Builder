import React from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

const ResumeForm = ({ data, setData }) => {
  
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [name]: value }
    }));
  };

  const handleArrayChange = (category, id, field, value) => {
    setData(prev => ({
      ...prev,
      [category]: prev[category].map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const addItem = (category, defaultItem) => {
    setData(prev => ({
      ...prev,
      [category]: [...prev[category], { id: Date.now().toString(), ...defaultItem }]
    }));
  };

  const removeItem = (category, id) => {
    setData(prev => ({
      ...prev,
      [category]: prev[category].filter(item => item.id !== id)
    }));
  };

  return (
    <div className="resume-form">
      {/* Personal Information */}
      <div className="form-section">
        <h2>Personal Information</h2>
        <div className="form-group">
          <label>Full Name</label>
          <input 
            type="text" 
            name="fullName" 
            className="form-control" 
            value={data.personalInfo.fullName} 
            onChange={handlePersonalInfoChange}
            placeholder="e.g. Abhimanyu"
          />
        </div>
        <div className="form-group">
          <label>Job Title</label>
          <input 
            type="text" 
            name="jobTitle" 
            className="form-control" 
            value={data.personalInfo.jobTitle} 
            onChange={handlePersonalInfoChange}
            placeholder="e.g. Full Stack Developer"
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              name="email" 
              className="form-control" 
              value={data.personalInfo.email} 
              onChange={handlePersonalInfoChange}
              placeholder="e.g. abhi@example.com"
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input 
              type="text" 
              name="phone" 
              className="form-control" 
              value={data.personalInfo.phone} 
              onChange={handlePersonalInfoChange}
              placeholder="e.g. +91 98765xxxxx"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Address</label>
            <input 
              type="text" 
              name="address" 
              className="form-control" 
              value={data.personalInfo.address} 
              onChange={handlePersonalInfoChange}
              placeholder="e.g. New Delhi, India"
            />
          </div>
          <div className="form-group">
            <label>Overall CGPA (out of 10)</label>
            <input 
              type="number" 
              name="cgpa" 
              min="0"
              max="10"
              step="0.01"
              className="form-control" 
              value={data.personalInfo.cgpa || ''} 
              onChange={handlePersonalInfoChange}
              placeholder="e.g. 9.0"
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>GitHub Profile Link</label>
            <input 
              type="url" 
              name="github" 
              className="form-control" 
              value={data.personalInfo.github || ''} 
              onChange={handlePersonalInfoChange}
              placeholder="e.g. https://github.com/username"
            />
          </div>
          <div className="form-group">
            <label>LinkedIn Profile Link</label>
            <input 
              type="url" 
              name="linkedin" 
              className="form-control" 
              value={data.personalInfo.linkedin || ''} 
              onChange={handlePersonalInfoChange}
              placeholder="e.g. https://linkedin.com/in/username"
            />
          </div>
        </div>
        <div className="form-group">
          <label>Professional Summary</label>
          <textarea 
            name="summary" 
            className="form-control" 
            rows="4" 
            value={data.personalInfo.summary} 
            onChange={handlePersonalInfoChange}
            placeholder="Briefly explain your professional background and goals..."
          />
        </div>
      </div>

      {/* Experience */}
      <div className="form-section">
        <h2>Experience</h2>
        {data.experience.map(exp => (
          <div key={exp.id} className="list-item">
            <button className="remove-btn" onClick={() => removeItem('experience', exp.id)}>
              <Trash2 size={16} />
            </button>
            <div className="form-row">
              <div className="form-group">
                <label>Job Title</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={exp.title} 
                  onChange={(e) => handleArrayChange('experience', exp.id, 'title', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Company</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={exp.company} 
                  onChange={(e) => handleArrayChange('experience', exp.id, 'company', e.target.value)}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Start Date</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. Jan 2020"
                  value={exp.startDate} 
                  onChange={(e) => handleArrayChange('experience', exp.id, 'startDate', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. Present"
                  value={exp.endDate} 
                  onChange={(e) => handleArrayChange('experience', exp.id, 'endDate', e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea 
                className="form-control" 
                rows="3" 
                value={exp.description} 
                onChange={(e) => handleArrayChange('experience', exp.id, 'description', e.target.value)}
              />
            </div>
          </div>
        ))}
        <button 
          className="add-btn" 
          onClick={() => addItem('experience', { title: '', company: '', startDate: '', endDate: '', description: '' })}
        >
          <PlusCircle size={16} /> Add Experience
        </button>
      </div>

      {/* Education */}
      <div className="form-section">
        <h2>Education</h2>
        {data.education.map(edu => (
          <div key={edu.id} className="list-item">
            <button className="remove-btn" onClick={() => removeItem('education', edu.id)}>
              <Trash2 size={16} />
            </button>
            <div className="form-row">
              <div className="form-group">
                <label>Degree</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={edu.degree} 
                  onChange={(e) => handleArrayChange('education', edu.id, 'degree', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>School</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={edu.school} 
                  onChange={(e) => handleArrayChange('education', edu.id, 'school', e.target.value)}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Start Date</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={edu.startDate} 
                  onChange={(e) => handleArrayChange('education', edu.id, 'startDate', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={edu.endDate} 
                  onChange={(e) => handleArrayChange('education', edu.id, 'endDate', e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Percentage/GPA</label>
              <input 
                type="text" 
                className="form-control" 
                value={edu.gpaOrPercentage || ''} 
                onChange={(e) => handleArrayChange('education', edu.id, 'gpaOrPercentage', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Description (Optional)</label>
              <textarea 
                className="form-control" 
                rows="2" 
                value={edu.description} 
                onChange={(e) => handleArrayChange('education', edu.id, 'description', e.target.value)}
              />
            </div>
          </div>
        ))}
        <button 
          className="add-btn" 
          onClick={() => addItem('education', { degree: '', school: '', startDate: '', endDate: '', description: '' })}
        >
          <PlusCircle size={16} /> Add Education
        </button>
      </div>

      {/* Skills */}
      <div className="form-section">
        <h2>Skills</h2>
        {data.skills.map(skill => (
          <div key={skill.id} className="list-item">
            <button className="remove-btn" onClick={() => removeItem('skills', skill.id)}>
              <Trash2 size={16} />
            </button>
            <div className="form-group">
              <label>Category (e.g. Programming Languages)</label>
              <input 
                type="text" 
                className="form-control" 
                value={skill.category} 
                onChange={(e) => handleArrayChange('skills', skill.id, 'category', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Skills (Comma separated)</label>
              <textarea 
                className="form-control" 
                rows="2"
                value={skill.items} 
                onChange={(e) => handleArrayChange('skills', skill.id, 'items', e.target.value)}
              />
            </div>
          </div>
        ))}
        <button 
          className="add-btn" 
          onClick={() => addItem('skills', { category: '', items: '' })}
        >
          <PlusCircle size={16} /> Add Skill Category
        </button>
      </div>

      {/* Projects */}
      <div className="form-section">
        <h2>Projects</h2>
        {data.projects.map(proj => (
          <div key={proj.id} className="list-item">
            <button className="remove-btn" onClick={() => removeItem('projects', proj.id)}>
              <Trash2 size={16} />
            </button>
            <div className="form-group">
              <label>Project Title</label>
              <input 
                type="text" 
                className="form-control" 
                value={proj.title} 
                onChange={(e) => handleArrayChange('projects', proj.id, 'title', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Tech Stack / Tools</label>
              <input 
                type="text" 
                className="form-control" 
                value={proj.techStack} 
                onChange={(e) => handleArrayChange('projects', proj.id, 'techStack', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea 
                className="form-control" 
                rows="3" 
                value={proj.description} 
                onChange={(e) => handleArrayChange('projects', proj.id, 'description', e.target.value)}
              />
            </div>
          </div>
        ))}
        <button 
          className="add-btn" 
          onClick={() => addItem('projects', { title: '', techStack: '', description: '' })}
        >
          <PlusCircle size={16} /> Add Project
        </button>
      </div>

      {/* Certificates */}
      <div className="form-section">
        <h2>Certificates</h2>
        {data.certificates.map(cert => (
          <div key={cert.id} className="list-item">
            <button className="remove-btn" onClick={() => removeItem('certificates', cert.id)}>
              <Trash2 size={16} />
            </button>
            <div className="form-group">
              <label>Certificate Title</label>
              <input 
                type="text" 
                className="form-control" 
                value={cert.title} 
                onChange={(e) => handleArrayChange('certificates', cert.id, 'title', e.target.value)}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Issuer</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={cert.issuer} 
                  onChange={(e) => handleArrayChange('certificates', cert.id, 'issuer', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={cert.date} 
                  onChange={(e) => handleArrayChange('certificates', cert.id, 'date', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
        <button 
          className="add-btn" 
          onClick={() => addItem('certificates', { title: '', issuer: '', date: '' })}
        >
          <PlusCircle size={16} /> Add Certificate
        </button>
      </div>

      {/* Achievements */}
      <div className="form-section">
        <h2>Achievements</h2>
        {data.achievements.map(ach => (
          <div key={ach.id} className="list-item">
            <button className="remove-btn" onClick={() => removeItem('achievements', ach.id)}>
              <Trash2 size={16} />
            </button>
            <div className="form-group">
              <label>Title</label>
              <input 
                type="text" 
                className="form-control" 
                value={ach.title} 
                onChange={(e) => handleArrayChange('achievements', ach.id, 'title', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea 
                className="form-control" 
                rows="2" 
                value={ach.description} 
                onChange={(e) => handleArrayChange('achievements', ach.id, 'description', e.target.value)}
              />
            </div>
          </div>
        ))}
        <button 
          className="add-btn" 
          onClick={() => addItem('achievements', { title: '', description: '' })}
        >
          <PlusCircle size={16} /> Add Achievement
        </button>
      </div>

      {/* Extracurricular Activities */}
      <div className="form-section">
        <h2>Extracurricular Activities</h2>
        {data.extracurricular.map(ext => (
          <div key={ext.id} className="list-item">
            <button className="remove-btn" onClick={() => removeItem('extracurricular', ext.id)}>
              <Trash2 size={16} />
            </button>
            <div className="form-group">
              <label>Title / Role</label>
              <input 
                type="text" 
                className="form-control" 
                value={ext.title} 
                onChange={(e) => handleArrayChange('extracurricular', ext.id, 'title', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea 
                className="form-control" 
                rows="2" 
                value={ext.description} 
                onChange={(e) => handleArrayChange('extracurricular', ext.id, 'description', e.target.value)}
              />
            </div>
          </div>
        ))}
        <button 
          className="add-btn" 
          onClick={() => addItem('extracurricular', { title: '', description: '' })}
        >
          <PlusCircle size={16} /> Add Extracurricular Activity
        </button>
      </div>
    </div>
  );
};

export default ResumeForm;
