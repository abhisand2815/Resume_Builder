import React from 'react';

const ProfessionalTemplate = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, extracurricular, achievements, certificates } = data;

  const styles = {
    container: {
      padding: '40px',
      fontFamily: "'Georgia', serif",
      color: '#333',
      lineHeight: '1.6',
      backgroundColor: '#fff',
      minHeight: '297mm',
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px',
    },
    name: {
      fontSize: '32px',
      fontWeight: 'bold',
      color: '#1a365d',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      marginBottom: '5px',
    },
    jobTitle: {
      fontSize: '18px',
      color: '#4a5568',
      fontStyle: 'italic',
      marginBottom: '10px',
    },
    contact: {
      fontSize: '13px',
      color: '#718096',
      borderTop: '1px solid #cbd5e0',
      borderBottom: '1px solid #cbd5e0',
      padding: '8px 0',
      display: 'flex',
      justifyContent: 'center',
      gap: '15px',
      flexWrap: 'wrap',
    },
    summary: {
      fontSize: '14px',
      marginTop: '20px',
      textAlign: 'justify',
    },
    section: {
      marginBottom: '25px',
      pageBreakInside: 'avoid',
      breakInside: 'avoid',
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#2b6cb0',
      borderBottom: '2px solid #2b6cb0',
      paddingBottom: '5px',
      marginBottom: '15px',
      textTransform: 'uppercase',
      letterSpacing: '1px',
    },
    item: {
      marginBottom: '15px',
    },
    itemHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '3px',
    },
    itemTitle: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#2d3748',
    },
    itemDate: {
      fontSize: '13px',
      color: '#4a5568',
      fontWeight: 'bold',
    },
    itemSub: {
      fontSize: '15px',
      fontStyle: 'italic',
      color: '#4a5568',
      marginBottom: '5px',
    },
    itemDesc: {
      fontSize: '14px',
      color: '#4a5568',
    },
    skillsList: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
    },
    skillBadge: {
      backgroundColor: '#edf2f7',
      color: '#2d3748',
      padding: '4px 10px',
      borderRadius: '15px',
      fontSize: '13px',
      fontWeight: 'bold',
      border: '1px solid #cbd5e0',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.name}>{personalInfo.fullName}</div>
        <div style={styles.jobTitle}>{personalInfo.jobTitle}</div>
        <div style={styles.contact}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.address && <span>• {personalInfo.address}</span>}
          {personalInfo.cgpa && <span>• CGPA: {personalInfo.cgpa}/10</span>}
          {personalInfo.github && <span>• <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" style={{color: '#718096', textDecoration: 'none'}}>GitHub</a></span>}
          {personalInfo.linkedin && <span>• <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" style={{color: '#718096', textDecoration: 'none'}}>LinkedIn</a></span>}
        </div>
      </div>

      {personalInfo.summary && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Professional Summary</div>
          <div style={{ ...styles.summary, marginTop: '0' }}>{personalInfo.summary}</div>
        </div>
      )}

      {skills?.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Technical Skills</div>
          <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
            {skills.map(skill => (
              <div key={skill.id} style={{ marginBottom: '6px' }}>
                <strong>{skill.category}:</strong> {skill.items}
              </div>
            ))}
          </div>
        </div>
      )}

      {experience?.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Professional Experience</div>
          {experience.map(exp => (
            <div key={exp.id} style={styles.item}>
              <div style={styles.itemHeader}>
                <div style={styles.itemTitle}>{exp.title}</div>
                <div style={styles.itemDate}>{exp.startDate} - {exp.endDate}</div>
              </div>
              <div style={styles.itemSub}>{exp.company}</div>
              <div style={styles.itemDesc}>{exp.description}</div>
            </div>
          ))}
        </div>
      )}

      {projects?.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Projects</div>
          {projects.map(proj => (
            <div key={proj.id} style={styles.item}>
              <div style={styles.itemHeader}>
                <div style={styles.itemTitle}>{proj.title}</div>
              </div>
              {proj.techStack && <div style={styles.itemSub}>{proj.techStack}</div>}
              <div style={styles.itemDesc}>{proj.description}</div>
            </div>
          ))}
        </div>
      )}

      {education?.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Education</div>
          {education.map(edu => (
            <div key={edu.id} style={styles.item}>
              <div style={styles.itemHeader}>
                <div style={styles.itemTitle}>{edu.degree}</div>
                <div style={styles.itemDate}>{edu.startDate} - {edu.endDate}</div>
              </div>
              <div style={styles.itemSub}>
                {edu.school} 
                {edu.gpaOrPercentage && ` | Score: ${edu.gpaOrPercentage}`}
              </div>
              {edu.description && <div style={styles.itemDesc}>{edu.description}</div>}
            </div>
          ))}
        </div>
      )}

      {certificates?.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Certificates</div>
          {certificates.map(cert => (
            <div key={cert.id} style={styles.item}>
              <div style={styles.itemHeader}>
                <div style={styles.itemTitle}>{cert.title}</div>
                <div style={styles.itemDate}>{cert.date}</div>
              </div>
              <div style={styles.itemDesc}>{cert.issuer}</div>
            </div>
          ))}
        </div>
      )}

      {achievements?.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Achievements</div>
          {achievements.map(ach => (
            <div key={ach.id} style={styles.item}>
              <div style={styles.itemHeader}>
                <div style={styles.itemTitle}>{ach.title}</div>
              </div>
              <div style={styles.itemDesc}>{ach.description}</div>
            </div>
          ))}
        </div>
      )}

      {extracurricular?.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Extracurricular Activities</div>
          {extracurricular.map(ext => (
            <div key={ext.id} style={styles.item}>
              <div style={styles.itemHeader}>
                <div style={styles.itemTitle}>{ext.title}</div>
              </div>
              <div style={styles.itemDesc}>{ext.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfessionalTemplate;
