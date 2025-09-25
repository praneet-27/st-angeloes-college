import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  hover = false,
  ...props 
}) => {
  const baseClasses = 'bg-white dark:bg-background-dark rounded-xl shadow-md overflow-hidden transition-all duration-300';
  const hoverClasses = hover ? 'hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10' : 'hover:shadow-lg';
  
  const classes = `${baseClasses} ${hoverClasses} ${className}`;
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card;
