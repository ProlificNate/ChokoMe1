import { Loader2 } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const Loading = () => {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#D3E7EB] p-6">
      <div className="text-center">
        <Loader2 className="animate-spin text-[#242528] w-12 h-12 mx-auto mb-4" />
        <p className="text-lg font-medium text-gray-700">{t('loading')}</p>
      </div>
    </div>
  );
};

export default Loading;