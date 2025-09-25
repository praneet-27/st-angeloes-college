import React from 'react';

const SectionTitle = ({ 
  children, 
  className = '', 
  ...props 
}) => {
  const classes = `text-3xl font-bold text-slate-900 dark:text-white mb-6 ${className}`;
  
  return (
    <h2 className={classes} {...props}>
      {children}
    </h2>
  );
};

export default SectionTitle;
