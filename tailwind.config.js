/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Gradient Colors
        fundverseIndigo: '#4F46E5', // Primary Gradient Start
        fundverseBlue: '#3B82F6', // Primary Gradient End
        fundverseAccent: '#2563EB', // Button Blue - Buttons, progress bars
        fundverseAccentHover: '#1E40AF', // Button Hover Blue - Hover
        
        // Background Colors
        fundverseCardBg: '#FFFFFF', // White - Cards
        fundverseBg: '#F9FAFB', // Light Gray - App background
        
        // Border & Divider
        fundverseBorder: '#E5E7EB', // Light Gray - Borders
        
        // Text Colors
        fundverseHeading: '#111827', // Deep Charcoal - Main titles
        fundverseBody: '#374151', // Medium Gray - Paragraphs
        fundverseMuted: '#6B7280', // Light Gray Text - Helper text
        
        // Status Colors
        fundverseSuccess: '#10B981', // Green - Success/Positive
        fundverseWarning: '#F59E0B', // Amber - Warning/Rank Badge
        fundverseError: '#DC2626', // Red - Error/Danger
        
        // Footer Gradient
        fundverseFooterStart: '#EEF2FF', // Soft Blue Tint
        fundverseFooterEnd: '#DBEAFE', // Light Blue Tint
        
        // Legacy support
        fundverseOrange: '#EB5E28',
        fundverseGrayDark: '#252422',
        fundverseGrayLight: '#E5E7EB',
        fundverseBgLight: '#F9FAFB',
        iconBlue: '#2563EB',
        iconIndigo: '#4F46E5',
        mutedText: '#6B7280',
      },
      backgroundImage: {
        'fundverse-gradient': 'linear-gradient(135deg, #4F46E5, #3B82F6)',
        'fundverse-footer': 'linear-gradient(180deg, #EEF2FF, #DBEAFE)',
      },
    },
  },
  plugins: [],
}
