import React, { forwardRef } from 'react';
import PlainTemplate from './PlainTemplate';
import ModernTemplate from './ModernTemplate';
import ProfessionalTemplate from './ProfessionalTemplate';

const ResumePreview = forwardRef(({ data, template }, ref) => {
  return (
    <div ref={ref} className="resume-page">
      {template === 'plain' && <PlainTemplate data={data} />}
      {template === 'modern' && <ModernTemplate data={data} />}
      {template === 'professional' && <ProfessionalTemplate data={data} />}
    </div>
  );
});

export default ResumePreview;
