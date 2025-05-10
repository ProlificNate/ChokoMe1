import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  light?: boolean;
}

const LanguageSwitcher = ({ light = false }: LanguageSwitcherProps) => {
  const { language, setLanguage, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  const handleLanguageChange = (code: string) => {
    // @ts-ignore
    setLanguage(code);
    setIsOpen(false);
  };
  
  const buttonClass = light 
    ? 'text-white hover:bg-white/10' 
    : 'text-gray-700 hover:bg-gray-100';
  
  return (
    <div className="relative">
      <button
        className={`flex items-center space-x-1 rounded-md px-3 py-1.5 ${buttonClass}`}
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Change language"
      >
        <Globe size={16} />
        <span className="capitalize">{language}</span>
      </button>
      
      {isOpen && (
        <div 
          className="absolute right-0 mt-1 bg-white rounded-md shadow-lg py-1 min-w-32 z-50"
          role="menu"
        >
          {availableLanguages.map((lang) => (
            <button
              key={lang.code}
              className={`w-full text-left px-4 py-2 text-sm ${
                language === lang.code 
                  ? 'bg-[#D7CFFE] text-[#242528]' 
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
              onClick={() => handleLanguageChange(lang.code)}
              role="menuitem"
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;