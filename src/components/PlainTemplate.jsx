import React from 'react';

const PlainTemplate = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, extracurricular, achievements, certificates } = data;

  const styles = {
    container: {
      padding: '40px',
      fontFamily: 'Arial, sans-serif',
      color: '#000',
      lineHeight: '1.4',
    },
    header: {
      textAlign: 'center',
      marginBottom: '24px',
      borderBottom: '1px solid #000',
      paddingBottom: '16px',
    },
    name: {
      fontSize: '28px',
      fontWeight: 'bold',
      marginBottom: '4px',
      textTransform: 'uppercase',
    },
    contact: {
      fontSize: '12px',
      marginBottom: '8px',
    },
    summary: {
      fontSize: '13px',
      marginTop: '12px',
    },
    section: {
      marginBottom: '20px',
    },
    sectionTitle: {
      fontSize: '16px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      borderBottom: '1px solid #000',
      paddingBottom: '4px',
      marginBottom: '12px',
    },
    item: {
      marginBottom: '12px',
    },
    itemHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      fontWeight: 'bold',
      fontSize: '14px',
    },
    itemSub: {
      fontStyle: 'italic',
      fontSize: '13px',
      marginBottom: '4px',
    },
    itemDesc: {
      fontSize: '13px',
    },
    skillsList: {
      fontSize: '13px',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.name}>{personalInfo.fullName}</div>
        <div style={styles.contact}>
          {personalInfo.email} | {personalInfo.phone} | {personalInfo.address}
        </div>
        {personalInfo.cgpa && (
          <div style={{ ...styles.contact, fontWeight: 'bold' }}>
            Overall CGPA: {personalInfo.cgpa}/10.0
          </div>
        )}
        {(personalInfo.github || personalInfo.linkedin) && (
          <div style={styles.contact}>
            {personalInfo.github && (
              <span>
                GitHub: <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" style={{color: '#000', textDecoration: 'none'}}>{personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}</a>
                {personalInfo.linkedin && ' | '}
              </span>
            )}
            {personalInfo.linkedin && (
              <span>
                LinkedIn: <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" style={{color: '#000', textDecoration: 'none'}}>{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}</a>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Professional Summary */}
      {personalInfo.summary && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Professional Summary</div>
          <div style={styles.summary}>{personalInfo.summary}</div>
        </div>
      )}

      {/* Skills */}
      {skills?.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Technical Skills</div>
          <div style={{ fontSize: '13px' }}>
            {skills.map(skill => (
              <div key={skill.id} style={{ marginBottom: '4px' }}>
                <strong>{skill.category}:</strong> {skill.items}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {experience?.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Professional Experience</div>
          {experience.map(exp => (
            <div key={exp.id} style={styles.item}>
              <div style={styles.itemHeader}>
                <span>{exp.title}</span>
                <span>{exp.startDate} - {exp.endDate}</span>
              </div>
              <div style={styles.itemSub}>{exp.company}</div>
              <div style={styles.itemDesc}>{exp.description}</div>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects?.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Projects</div>
          {projects.map(proj => (
            <div key={proj.id} style={styles.item}>
              <div style={styles.itemHeader}>
                <span>{proj.title}</span>
              </div>
              {proj.techStack && <div style={styles.itemSub}>{proj.techStack}</div>}
              <div style={styles.itemDesc}>{proj.description}</div>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Education</div>
          {education.map(edu => (
            <div key={edu.id} style={styles.item}>
              <div style={styles.itemHeader}>
                <span>{edu.school}</span>
                <span>{edu.startDate} - {edu.endDate}</span>
              </div>
              <div style={styles.itemSub}>
                {edu.degree}
                {edu.gpaOrPercentage && ` | Score: ${edu.gpaOrPercentage}`}
              </div>
              {edu.description && <div style={styles.itemDesc}>{edu.description}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Certificates */}
      {certificates?.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Certificates</div>
          {certificates.map(cert => (
            <div key={cert.id} style={styles.item}>
              <div style={styles.itemHeader}>
                <span>{cert.title}</span>
                <span>{cert.date}</span>
              </div>
              <div style={styles.itemDesc}>{cert.issuer}</div>
            </div>
          ))}
        </div>
      )}

      {/* Achievements */}
      {achievements?.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Achievements</div>
          {achievements.map(ach => (
            <div key={ach.id} style={styles.item}>
              <div style={styles.itemHeader}>
                <span>{ach.title}</span>
              </div>
              <div style={styles.itemDesc}>{ach.description}</div>
            </div>
          ))}
        </div>
      )}

      {/* Extracurricular Activities */}
      {extracurricular?.length > 0 && (
        <div style={styles.section}>
          <div style={styles.sectionTitle}>Extracurricular Activities</div>
          {extracurricular.map(ext => (
            <div key={ext.id} style={styles.item}>
              <div style={styles.itemHeader}>
                <span>{ext.title}</span>
              </div>
              <div style={styles.itemDesc}>{ext.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlainTemplate;
