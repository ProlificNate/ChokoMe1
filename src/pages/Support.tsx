import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { useOffline } from '../hooks/useOffline';
import OfflineBanner from '../components/OfflineBanner';

const Support = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { isOffline } = useOffline();
  
  const supportTopics = [
    {
      id: 'account',
      title: t('accountIssues'),
      questions: [
        { 
          q: t('forgotPIN'), 
          a: t('forgotPINAnswer')
        },
        {
          q: t('accountLimit'),
          a: t('accountLimitAnswer')
        }
      ]
    },
    {
      id: 'transactions',
      title: t('transactionIssues'),
      questions: [
        {
          q: t('failedTransaction'),
          a: t('failedTransactionAnswer')
        },
        {
          q: t('refundPolicy'),
          a: t('refundPolicyAnswer')
        }
      ]
    },
    {
      id: 'technical',
      title: t('technicalIssues'),
      questions: [
        {
          q: t('appNotWorking'),
          a: t('appNotWorkingAnswer')
        },
        {
          q: t('offlineMode'),
          a: t('offlineModeAnswer')
        }
      ]
    }
  ];
  
  return (
    <div className="min-h-screen bg-[#D3E7EB] pt-20 pb-12">
      {isOffline && <OfflineBanner />}
      
      <div className="container-fluid">
        <div className="card fade-in">
          <div className="flex items-center mb-6">
            <button 
              onClick={() => navigate('/dashboard')}
              className="mr-3 p-2 rounded-full hover:bg-gray-100"
              aria-label={t('back')}
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold">{t('supportCenter')}</h1>
          </div>
          
          <div className="mb-8">
            <p className="text-gray-600 mb-4">
              {t('supportDescription')}
            </p>
            
            {isOffline && (
              <div className="bg-yellow-100 p-4 rounded-md mb-6">
                <p className="text-yellow-800 font-medium mb-1">{t('offlineNotice')}</p>
                <p className="text-yellow-700 text-sm">{t('offlineSupportLimited')}</p>
              </div>
            )}
            
            <div className="bg-[#FDECBA] rounded-md p-4 mb-6">
              <p className="font-medium">{t('emergencySupport')}</p>
              <p className="text-sm mt-1">{t('callCenter')}: +123 456 7890</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">{t('faq')}</h2>
            
            <div className="space-y-6">
              {supportTopics.map((topic) => (
                <div key={topic.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-4 border-b">
                    <h3 className="font-medium">{topic.title}</h3>
                  </div>
                  
                  <div className="divide-y divide-gray-200">
                    {topic.questions.map((item, index) => (
                      <details key={index} className="group">
                        <summary className="flex justify-between items-center p-4 cursor-pointer">
                          <span className="font-medium">{item.q}</span>
                          <span className="ml-6 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">
                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </span>
                        </summary>
                        <div className="px-4 pb-4 pt-2 text-gray-700">
                          <p>{item.a}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {!isOffline && (
            <div className="mt-8 border-t pt-6">
              <h2 className="text-xl font-semibold mb-4">{t('contactUs')}</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                    {t('name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="input-field"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                    {t('email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="input-field"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
                    {t('message')}
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="input-field"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="btn-primary"
                >
                  {t('submit')}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Support;