function Button({ children, variant = 'primary', size = 'md', className = '', onClick, type = 'button', ...props }) {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-fundverseBlue text-white hover:bg-fundverseAccentHover focus:ring-fundverseBlue shadow-md hover:shadow-lg',
    secondary: 'bg-white text-fundverseBlue border-2 border-fundverseBlue hover:bg-fundverseBg focus:ring-fundverseBlue',
    outline: 'bg-transparent text-fundverseBlue border-2 border-fundverseBlue hover:bg-fundverseBlue hover:text-white focus:ring-fundverseBlue',
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;

