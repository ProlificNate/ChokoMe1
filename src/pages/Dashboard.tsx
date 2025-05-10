  import { useEffect, useState } from 'react';
  import { Link } from 'react-router-dom';
  import { useAuth } from '../hooks/useAuth';
  import { useLanguage } from '../hooks/useLanguage';
  import { useOffline } from '../hooks/useOffline';
  import { formatCurrency, formatDate } from '../utils/encryption';
  import { PlusCircle, SendIcon, RefreshCcw } from 'lucide-react';
  import TransactionList from '../components/TransactionList';
  import OfflineBanner from '../components/OfflineBanner';

  const Dashboard = () => {
    const { user, isAuthenticated } = useAuth();
    const { t } = useLanguage();
    const { isOffline } = useOffline();
    const [refreshing, setRefreshing] = useState(false);

    // Simulate refreshing data
    const handleRefresh = () => {
      if (isOffline) return;
      
      setRefreshing(true);
      setTimeout(() => {
        setRefreshing(false);
      }, 1500);
    };

    if (!isAuthenticated || !user) {
      return <div className="p-6">{t('notAuthenticated')}</div>;
    }

    return (
      <div className="min-h-screen bg-[#D3E7EB] pt-20 pb-12">
        {isOffline && <OfflineBanner />}
        
        <div className="container-fluid">
          <div className="card mb-6 fade-in">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">{t('welcome')}, {user.name}</h1>
              <button 
                onClick={handleRefresh} 
                disabled={refreshing || isOffline}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                aria-label={t('refresh')}
              >
                <RefreshCcw 
                  size={20} 
                  className={`${refreshing ? 'animate-spin' : ''} ${isOffline ? 'text-gray-400' : 'text-gray-700'}`} 
                />
              </button>
            </div>
            
            <div className="bg-[#242528] text-white p-6 rounded-lg mb-6">
              <p className="text-sm opacity-80 mb-1">{t('availableBalance')}</p>
              <p className="text-3xl font-bold mb-2">{formatCurrency(user.balance)}</p>
              <p className="text-xs opacity-60">{t('lastUpdated')}: {formatDate(new Date().toISOString())}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Link 
                to="/top-up" 
                className="bg-[#D7CFFE] text-[#242528] p-4 rounded-lg flex flex-col items-center justify-center hover:shadow-md transition-all duration-200"
                aria-label={t('topUp')}
              >
                <PlusCircle size={28} className="mb-2" />
                <span className="font-medium">{t('topUp')}</span>
              </Link>
              
              <Link 
                to="/send-money" 
                className="bg-[#FDECBA] text-[#242528] p-4 rounded-lg flex flex-col items-center justify-center hover:shadow-md transition-all duration-200"
                aria-label={t('sendMoney')}
              >
                <SendIcon size={28} className="mb-2" />
                <span className="font-medium">{t('sendMoney')}</span>
              </Link>
            </div>
          </div>
          
          <div className="card slide-up">
            <h2 className="text-xl font-semibold mb-4">{t('recentTransactions')}</h2>
            <TransactionList 
              transactions={user.transactions} 
              emptyMessage={t('noTransactions')}
            />
          </div>
        </div>
      </div>
    );
  };

  export default Dashboard;