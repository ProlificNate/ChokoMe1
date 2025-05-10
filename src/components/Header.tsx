import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, Wallet } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../hooks/useLanguage';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };
  
  const closeMenu = () => {
    setMenuOpen(false);
  };
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 z-10">
      <div className="bg-[#242528] text-white shadow-md">
        <div className="container-fluid">
          <div className="flex items-center justify-between h-16">
            <Link 
              to="/" 
              className="flex items-center"
              aria-label={t('home')}
            >
              <div className="bg-[#D7CFFE] rounded-full p-1.5 mr-2">
                <Wallet size={20} className="text-[#242528]" />
              </div>
              <span className="font-bold text-lg">ChokoMe</span>
            </Link>
            
            <div className="flex items-center space-x-3">
              {!isAuthenticated ? (
                <div className="hidden md:flex md:items-center md:space-x-2">
                  <LanguageSwitcher light />
                </div>
              ) : (
                <div className="hidden md:flex md:items-center md:space-x-2">
                  <LanguageSwitcher light />
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-md hover:bg-white/10 transition-colors duration-200"
                    aria-label={t('logout')}
                  >
                    <LogOut size={16} />
                    <span>{t('logout')}</span>
                  </button>
                </div>
              )}
              
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 rounded-md hover:bg-white/10 transition-colors duration-200"
                aria-label={menuOpen ? t('closeMenu') : t('openMenu')}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-20 bg-[#242528] min-h-screen pt-16 md:hidden">
          <div className="container-fluid p-4">
            <nav className="flex flex-col space-y-4">
              {isAuthenticated && (
                <>
                  <Link
                    to="/dashboard"
                    className={`text-white py-3 px-4 rounded-md ${
                      location.pathname === '/dashboard' ? 'bg-white/10' : 'hover:bg-white/5'
                    }`}
                    onClick={closeMenu}
                  >
                    {t('dashboard')}
                  </Link>
                  <Link
                    to="/top-up"
                    className={`text-white py-3 px-4 rounded-md ${
                      location.pathname === '/top-up' ? 'bg-white/10' : 'hover:bg-white/5'
                    }`}
                    onClick={closeMenu}
                  >
                    {t('topUp')}
                  </Link>
                  <Link
                    to="/send-money"
                    className={`text-white py-3 px-4 rounded-md ${
                      location.pathname === '/send-money' ? 'bg-white/10' : 'hover:bg-white/5'
                    }`}
                    onClick={closeMenu}
                  >
                    {t('sendMoney')}
                  </Link>
                  <Link
                    to="/support"
                    className={`text-white py-3 px-4 rounded-md ${
                      location.pathname === '/support' ? 'bg-white/10' : 'hover:bg-white/5'
                    }`}
                    onClick={closeMenu}
                  >
                    {t('support')}
                  </Link>
                </>
              )}
              
              <div className="pt-4 border-t border-white/10">
                <LanguageSwitcher light />
              </div>
              
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="flex items-center text-white py-3 px-4 rounded-md hover:bg-white/5 mt-4"
                >
                  <LogOut size={18} className="mr-2" />
                  {t('logout')}
                </button>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;