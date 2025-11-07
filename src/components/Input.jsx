function Input({ label, icon, error, className = '', ...props }) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-fundverseHeading mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="text-fundverseMuted">
              {icon}
            </div>
          </div>
        )}
        <input
          className={`w-full px-4 ${icon ? 'pl-10' : ''} py-2 border border-fundverseBorder rounded-lg focus:outline-none focus:ring-2 focus:ring-fundverseBlue focus:border-transparent ${
            error ? 'border-fundverseError focus:ring-fundverseError' : ''
          }`}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-fundverseError">{error}</p>
      )}
    </div>
  );
}

export default Input;

