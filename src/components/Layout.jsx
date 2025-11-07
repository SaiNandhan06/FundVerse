import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout({ children }) {
  const location = useLocation();
  const hideNavbarFooter = 
    location.pathname === '/login' || 
    location.pathname === '/signup' ||
    location.pathname === '/support/payment';

  return (
    <div className="min-h-screen flex flex-col bg-[#fffcf2]">
      {!hideNavbarFooter && <Navbar />}
      <main className="flex-1 animate-fade-in">
        {children}
      </main>
      {!hideNavbarFooter && <Footer />}
    </div>
  );
}

export default Layout;

