import { Link } from 'react-router-dom';
import logo from '../assets/my-logo.png.png';

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#EEF2FF] to-[#DBEAFE] text-[#111827] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* FundVerse Intro */}
          <div>
            <div className="mb-4">
              <img src={logo} alt="FundVerse" className="h-10 w-auto" />
            </div>
            <p className="text-sm leading-relaxed text-[#374151]">
              Where Ideas Take Flight & Futures Are Built. Empowering creators and innovators to bring their dreams to life through the power of community funding.
            </p>
          </div>
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#111827]">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-[#374151] hover:text-[#2563EB] transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/discover" className="text-[#374151] hover:text-[#2563EB] transition-colors">Browse</Link>
              </li>
              <li>
                <Link to="/create" className="text-[#374151] hover:text-[#2563EB] transition-colors">Launch</Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-[#374151] hover:text-[#2563EB] transition-colors">How it Works</Link>
              </li>
              <li>
                <Link to="/success-stories" className="text-[#374151] hover:text-[#2563EB] transition-colors">Success Stories</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#111827]">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-[#374151] hover:text-[#2563EB] transition-colors">Help Center</Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#374151] hover:text-[#2563EB] transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/guidelines" className="text-[#374151] hover:text-[#2563EB] transition-colors">Community Guidelines</Link>
              </li>
              <li>
                <Link to="/safety" className="text-[#374151] hover:text-[#2563EB] transition-colors">Safety & Trust</Link>
              </li>
              <li>
                <Link to="/fees" className="text-[#374151] hover:text-[#2563EB] transition-colors">Fees & Pricing</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#111827]">Contact</h4>
            <ul className="space-y-3 text-[#374151]">
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:support@fundverse.com" className="hover:text-[#2563EB] transition-colors">
                  support@fundverse.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#6B7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+918688221336" className="hover:text-[#2563EB] transition-colors">
                  +91 86882 21336
                </a>
              </li>
              <li className="flex items-start gap-2 pt-1">
                <svg className="w-5 h-5 text-[#6B7280] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="hover:text-[#2563EB] transition-colors">Ira by Orchid Hyderabad Hitech City Mindspace IT Park</p>
                  <p className="hover:text-[#2563EB] transition-colors">Hyderabad, Telangana 500032</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-[#E5E7EB] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#111827] text-sm">&copy; 2025 FundVerse. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy" className="text-[#6B7280] hover:text-[#2563EB] transition-colors">
              Privacy Policy
            </Link>
            <span className="text-[#6B7280]">|</span>
            <Link to="/terms" className="text-[#6B7280] hover:text-[#2563EB] transition-colors">
              Terms of Service
            </Link>
            <span className="text-[#6B7280]">|</span>
            <Link to="/cookies" className="text-[#6B7280] hover:text-[#2563EB] transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>

        {/* Developed By */}
        <div className="mt-4 pt-4 border-t border-[#E5E7EB] text-center">
          <p className="text-sm text-[#6B7280]">
            Developed by{' '}
            <a href="https://www.linkedin.com/in/sainandhan" target="_blank" rel="noopener noreferrer" className="text-[#3B82F6] hover:underline font-medium">
              M Sainandhan
            </a>
            {' & '}
            <a href="https://www.linkedin.com/in/sufian0/" target="_blank" rel="noopener noreferrer" className="text-[#3B82F6] hover:underline font-medium">
              Abu Sufian Choudhury
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

