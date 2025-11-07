import { useState } from 'react';

function Accordion({ title, content }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-fundverseBorder rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex justify-between items-center text-left hover:bg-fundverseBg transition-colors"
      >
        <span className="font-semibold text-fundverseHeading">{title}</span>
        <svg
          className={`w-5 h-5 text-fundverseMuted transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-4 py-3 bg-fundverseBg border-t border-fundverseBorder">
          <p className="text-fundverseBody">{content}</p>
        </div>
      )}
    </div>
  );
}

export default Accordion;

