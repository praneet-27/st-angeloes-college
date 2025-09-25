import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  onClick,
  type = 'button',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-bold tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-105 active:scale-95';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 focus:ring-primary shadow-lg hover:shadow-xl',
    secondary: 'bg-primary/20 dark:bg-primary/30 text-primary dark:text-white hover:bg-primary/30 dark:hover:bg-primary/40 focus:ring-primary shadow-md hover:shadow-lg',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary shadow-md hover:shadow-lg'
  };
  
  const sizes = {
    sm: 'h-8 px-4 text-sm rounded-full',
    md: 'h-10 px-6 text-sm rounded-full',
    lg: 'h-12 px-8 text-base rounded-full'
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
