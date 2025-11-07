function ProgressBar({ value, size = 'md' }) {
  const heightClass = size === 'sm' ? 'h-2' : 'h-3';
  
  return (
    <div className={`w-full bg-fundverseBorder rounded-full overflow-hidden ${heightClass}`}>
      <div
        className={`bg-fundverse-gradient ${heightClass} rounded-full transition-all duration-500 ease-out`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

export default ProgressBar;

