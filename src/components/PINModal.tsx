import { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { X, AlertTriangle } from 'lucide-react';

interface PINModalProps {
  onSubmit: (pin: string) => void;
  onCancel: () => void;
  title: string;
  description: string;
}

const PINModal = ({ onSubmit, onCancel, title, description }: PINModalProps) => {
  const { t } = useLanguage();
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  
  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and limit to 4 digits
    if (/^\d*$/.test(value) && value.length <= 4) {
      setPin(value);
      setError(null);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (pin.length !== 4) {
      setError(t('pinMustBe4Digits'));
      return;
    }
    
    onSubmit(pin);
  };
  
  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onCancel} aria-hidden="true"></div>
      <div 
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pin-modal-title"
      >
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md fade-in">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 id="pin-modal-title" className="text-lg font-semibold">{title}</h3>
            <button 
              onClick={onCancel}
              className="p-1 rounded-full hover:bg-gray-100"
              aria-label={t('close')}
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="p-6">
            <p className="mb-6 text-gray-700">{description}</p>
            
            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4 flex items-center">
                <AlertTriangle size={16} className="mr-2 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="pin">
                  {t('pin')}
                </label>
                <input
                  type="password"
                  id="pin"
                  value={pin}
                  onChange={handlePinChange}
                  className="input-field text-center tracking-widest text-xl"
                  placeholder="••••"
                  maxLength={4}
                  autoComplete="off"
                  required
                  autoFocus
                />
                <p className="text-sm text-gray-500 mt-1">
                  {t('demoPin')}
                </p>
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="btn-primary flex-1"
                >
                  {t('confirm')}
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  className="btn-secondary bg-gray-100 hover:bg-gray-200 flex-1"
                >
                  {t('cancel')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PINModal;