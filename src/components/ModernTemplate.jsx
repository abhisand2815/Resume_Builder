import React from 'react';

const ModernTemplate = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, extracurricular, achievements, certificates } = data;

  const styles = {
    container: {
      display: 'flex',
      minHeight: '100%',
      fontFamily: "'Inter', sans-serif",
      color: '#1e293b',
      lineHeight: '1.5',
    },
    sidebar: {
      width: '40%',
      backgroundColor: '#2563eb', // Blue theme
      color: '#ffffff',
      padding: '40px 25px',
    },
    main: {
      width: '60%',
      padding: '40px 30px',
      backgroundColor: '#ffffff',
    },
    name: {
      fontSize: '28px',
      fontWeight: '700',
      marginBottom: '4px',
      lineHeight: '1.2',
    },
    jobTitle: {
      fontSize: '16px',
      fontWeight: '500',
      color: '#bfdbfe',
      marginBottom: '30px',
      textTransform: 'uppercase',
      letterSpacing: '1px',
    },
    sidebarSection: {
      marginBottom: '30px',
    },
    sidebarTitle: {
      fontSize: '16px',
      fontWeight: '600',
      textTransform: 'uppercase',
      borderBottom: '2px solid #3b82f6',
      paddingBottom: '8px',
      marginBottom: '16px',
      letterSpacing: '1px',
    },
    contactItem: {
      fontSize: '11.5px', // Slightly smaller
      marginBottom: '10px',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    },
    contactValue: {
      fontSize: '12px',
      wordBreak: 'break-all',
      display: 'block',
      lineHeight: '1.3',
    },
    contactLabel: {
      fontSize: '11px',
      color: '#93c5fd',
      textTransform: 'uppercase',
      marginBottom: '2px',
    },
    skillItem: {
      fontSize: '13px',
      backgroundColor: '#1d4ed8',
      padding: '6px 12px',
      borderRadius: '4px',
      marginBottom: '8px',
      display: 'inline-block',
      marginRight: '8px',
    },
    mainSection: {
      marginBottom: '32px',
    },
    mainTitle: {
      fontSize: '18px',
      fontWeight: '700',
      color: '#2563eb',
      textTransform: 'uppercase',
      borderBottom: '2px solid #e2e8f0',
      paddingBottom: '8px',
      marginBottom: '20px',
      letterSpacing: '1px',
    },
    summary: {
      fontSize: '14px',
      color: '#475569',
    },
    item: {
      marginBottom: '20px',
    },
    itemHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: '4px',
    },
    itemTitle: {
      fontSize: '15px',
      fontWeight: '600',
      color: '#0f172a',
    },
    itemDate: {
      fontSize: '12px',
      color: '#64748b',
      fontWeight: '500',
    },
    itemSub: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#2563eb',
      marginBottom: '8px',
    },
    itemDesc: {
      fontSize: '13px',
      color: '#475569',
    }
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.name}>{personalInfo.fullName}</div>
        <div style={styles.jobTitle}>{personalInfo.jobTitle}</div>

        <div style={styles.sidebarSection}>
          <div style={styles.sidebarTitle}>Contact</div>
          {personalInfo.email && (
            <div style={styles.contactItem}>
              <span style={styles.contactLabel}>Email</span>
              <span style={styles.contactValue}>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div style={styles.contactItem}>
              <span style={styles.contactLabel}>Phone</span>
              <span style={styles.contactValue}>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.address && (
            <div style={styles.contactItem}>
              <span style={styles.contactLabel}>Address</span>
              <span style={styles.contactValue}>{personalInfo.address}</span>
            </div>
          )}
          {personalInfo.cgpa && (
            <div style={styles.contactItem}>
              <span style={styles.contactLabel}>CGPA</span>
              <span style={styles.contactValue}>{personalInfo.cgpa} / 10</span>
            </div>
          )}
          {personalInfo.github && (
            <div style={styles.contactItem}>
              <span style={styles.contactLabel}>GitHub</span>
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" style={{...styles.contactValue, color: '#ffffff', textDecoration: 'none'}}>
                {personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}
              </a>
            </div>
          )}
          {personalInfo.linkedin && (
            <div style={styles.contactItem}>
              <span style={styles.contactLabel}>LinkedIn</span>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" style={{...styles.contactValue, color: '#ffffff', textDecoration: 'none'}}>
                {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.main}>
        {/* Professional Summary */}
        {personalInfo.summary && (
          <div style={styles.mainSection}>
            <div style={styles.mainTitle}>Professional Summary</div>
            <div style={styles.summary}>{personalInfo.summary}</div>
          </div>
        )}

        {/* Technical Skills */}
        {skills?.length > 0 && (
          <div style={styles.mainSection}>
            <div style={styles.mainTitle}>Technical Skills</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {skills.map(skill => (
                <div key={skill.id} style={{ fontSize: '13px' }}>
                  <div style={{ fontWeight: '600', color: '#2563eb', marginBottom: '2px' }}>{skill.category}</div>
                  <div style={{ color: '#475569' }}>{skill.items}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {experience?.length > 0 && (
          <div style={styles.mainSection}>
            <div style={styles.mainTitle}>Experience</div>
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

        {/* Projects */}
        {projects?.length > 0 && (
          <div style={styles.mainSection}>
            <div style={styles.mainTitle}>Projects</div>
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

        {/* Education */}
        {education?.length > 0 && (
          <div style={styles.mainSection}>
            <div style={styles.mainTitle}>Education</div>
            {education.map(edu => (
              <div key={edu.id} style={styles.item}>
                <div style={styles.itemHeader}>
                  <div style={styles.itemTitle}>{edu.degree}</div>
                  <div style={styles.itemDate}>{edu.startDate} - {edu.endDate}</div>
                </div>
                <div style={styles.itemSub}>
                  {edu.school}
                  {edu.gpaOrPercentage && <span style={{ color: '#64748b', fontSize: '13px' }}> | Score: {edu.gpaOrPercentage}</span>}
                </div>
                {edu.description && <div style={styles.itemDesc}>{edu.description}</div>}
              </div>
            ))}
          </div>
        )}

        {/* Certificates */}
        {certificates?.length > 0 && (
          <div style={styles.mainSection}>
            <div style={styles.mainTitle}>Certificates</div>
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

        {/* Achievements */}
        {achievements?.length > 0 && (
          <div style={styles.mainSection}>
            <div style={styles.mainTitle}>Achievements</div>
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

        {/* Extracurricular Activities */}
        {extracurricular?.length > 0 && (
          <div style={styles.mainSection}>
            <div style={styles.mainTitle}>Extracurricular</div>
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
    </div>
  );
};

export default ModernTemplate;
