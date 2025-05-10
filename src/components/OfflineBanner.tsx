import { Wifi, WifiOff } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const OfflineBanner = () => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-yellow-50 border-b border-yellow-200 p-3 fixed top-16 left-0 right-0 z-10">
      <div className="container-fluid">
        <div className="flex items-center">
          <WifiOff size={18} className="text-yellow-600 mr-2" />
          <span className="text-yellow-800 font-medium text-sm">
            {t('offlineMode')} — {t('limitedFunctionality')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OfflineBanner;