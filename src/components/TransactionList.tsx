import { useState } from 'react';
import { ArrowDown, ArrowUp, RefreshCw, CreditCard } from 'lucide-react';

// Simplified hooks and utils
const useLanguage = () => {
  return {
    t: (key) => {
      const translations = {
        toppedUp: 'Topped Up',
        debit: 'Debit Purchase',
        fee: 'Fee',
        from: 'From',
        to: 'To',
        at: 'at'
      };
      return translations[key] || key;
    }
  };
};

const formatCurrency = (amount) => {
  return `${amount.toFixed(2)}Xaf`;
};

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
};

// Types
const transactionTypes = {
  TOP_UP: 'top-up',
  DEBIT: 'debit'
};

// Sample transaction data
const sampleTransactions = [
  {
    id: '1',
    type: transactionTypes.DEBIT,
    amount: 25000,
    fee: 0,
    merchant: 'NjeiForbi',
    timestamp: '2025-05-07T10:23:45Z',
    status: 'completed'
  },
  {
    id: '2',
    type: transactionTypes.DEBIT,
    amount: 42.50,
    fee: 1.25,
    merchant: 'Y Complexe',
    timestamp: '2025-05-06T17:15:23Z',
    status: 'completed'
  },
  {
    id: '3',
    type: transactionTypes.TOP_UP,
    amount: 120.00,
    fee: 2.50,
    receiver: '0xde45a12bc8f0',
    timestamp: '2025-05-05T09:18:32Z',
    status: 'completed'
  },
  {
    id: '4',
    type: transactionTypes.TOP_UP,
    amount: 500.00,
    fee: 0,
    timestamp: '2025-05-03T14:42:19Z',
    status: 'completed'
  },
  {
    id: '5',
    type: transactionTypes.DEBIT,
    amount: 78.35,
    fee: 0,
    merchant: 'Mr Enow_Taxi',
    timestamp: '2025-05-01T11:05:27Z',
    status: 'completed'
  }
];

const TransactionHistory = () => {
  const [transactions] = useState(sampleTransactions);
  const { t } = useLanguage();
  
  const getTransactionIcon = (type) => {
    switch (type) {
      case transactionTypes.TOP_UP:
        return <RefreshCw size={18} className="text-blue-500" />;
      case transactionTypes.DEBIT:
        return <CreditCard size={18} className="text-purple-500" />;
      default:
        return null;
    }
  };
  
  const getTransactionLabel = (type) => {
    switch (type) {
      case transactionTypes.TOP_UP:
        return t('toppedUp');
      case transactionTypes.DEBIT:
        return t('debit');
      default:
        return type;
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const isNegativeTransaction = (type) => {
    return type === transactionTypes.DEBIT;
  };
  
  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No transaction history available
      </div>
    );
  }
  
  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Transaction History</h2>
      </div>
      
      <div className="divide-y divide-gray-200">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="p-4 flex items-start hover:bg-gray-50 transition-colors">
            <div className="bg-gray-100 p-2 rounded-full mr-3">
              {getTransactionIcon(transaction.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900">
                    {getTransactionLabel(transaction.type)}
                    {transaction.merchant && ` ${t('at')} ${transaction.merchant}`}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDate(transaction.timestamp)}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${isNegativeTransaction(transaction.type) ? 'text-red-600' : 'text-green-600'}`}>
                    {isNegativeTransaction(transaction.type) ? '- ' : '+ '}
                    {formatCurrency(transaction.amount)}
                  </p>
                  {transaction.fee > 0 && (
                    <p className="text-xs text-gray-500">
                      {t('fee')}: {formatCurrency(transaction.fee)}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="mt-1 flex flex-wrap gap-2">
                <span 
                  className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}
                >
                  {transaction.status}
                </span>
                
                {transaction.sender && (
                  <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                    {t('from')}: {transaction.sender.substring(0, 8)}...
                  </span>
                )}
                
                {transaction.receiver && (
                  <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                    {t('to')}: {transaction.receiver.substring(0, 8)}...
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;