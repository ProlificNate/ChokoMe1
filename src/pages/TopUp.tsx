import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../hooks/useLanguage';
import { useOffline } from '../hooks/useOffline';
// import { mockApi } from '../services/mockApi';
import { topUpWallet } from '../services/api';
import { formatCurrency } from '../utils/encryption';
import { ArrowLeft, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import PINModal from '../components/PINModal';
import OfflineBanner from '../components/OfflineBanner';

const TopUp = () => {
  const navigate = useNavigate();
  const { user, updateBalance, addTransaction } = useAuth();
  const { t } = useLanguage();
  const { isOffline } = useOffline();

  const [amount, setAmount] = useState<number>(0);
  const [phone, setPhone] = useState('');
  const [provider, setProvider] = useState<'mtn' | 'orange'>('mtn');
  const [showPINModal, setShowPINModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const predefinedAmounts = [1000, 2000, 5000, 10000];

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setAmount(isNaN(value) ? 0 : value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handlePredefinedAmount = (value: number) => {
    setAmount(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isOffline) return setError(t('offlineTopUpError'));
    if (amount <= 0) return setError(t('invalidAmount'));

    setError(null);
    setShowPINModal(true);
  };

  const handlePINSubmit = async (pin: string) => {
    setShowPINModal(false);
    setIsLoading(true);

    try {
      const response = await topUpWallet({ amount, Phone, pin }); // Change to mockApi if used
      if (response.success) {
        updateBalance(amount);
        addTransaction({ type: 'top-up', amount, fee: 0, status: 'completed' });

        setSuccess(response.message);
        setAmount(0);
        setProvider('mtn');

        setTimeout(() => navigate('/dashboard'), 2000);
      } else {
        setError(response.error || t('topUpFailed'));
      }
    } catch {
      setError(t('unexpectedError'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => navigate('/dashboard');

  if (!user) return <div className="p-6">{t('notAuthenticated')}</div>;

  return (
    <div className="min-h-screen bg-[#D3E7EB] pt-20 pb-12">
      {isOffline && <OfflineBanner />}

      <div className="container-fluid">
        <div className="card fade-in h-screen">
          {/* Header */}
          <div className="flex items-center mb-6">
            <button onClick={handleCancel} className="mr-3 p-2 rounded-full hover:bg-gray-100" aria-label={t('back')}>
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold">{t('topUp')}</h1>
          </div>

          {/* Messages */}
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded flex items-start">
              <AlertCircle size={20} className="mr-2 mt-0.5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded flex items-start">
              <CheckCircle size={20} className="mr-2 mt-0.5 flex-shrink-0" />
              <p>{success}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Phone */}
            <div className="mb-6">
              <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                {t('phoneNumber')}
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                className="input-field"
                placeholder="2376 XXX XXX XXX"
                pattern="2376[0-9]{8}"
                required
                disabled={isLoading}
                aria-describedby="phone-description"
              />
              <p id="phone-description" className="text-sm text-gray-500 mt-1">
                {t('enterValidPhone')} (e.g., 6XX XXX XXX)
              </p>
            </div>

            {/* Amount */}
            <div className="mb-6">
              <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">
                {t('amount')}
              </label>
              <input
                id="amount"
                type="number"
                value={amount || ''}
                onChange={handleAmountChange}
                className="input-field"
                placeholder="0"
                min="1"
                required
                disabled={isLoading}
                aria-describedby="amount-description"
              />
              <p id="amount-description" className="text-sm text-gray-500 mt-1">
                {t('minimumAmount')}: 100 FCFA
              </p>
            </div>

            {/* Quick Amounts */}
            <div className="mb-6">
              <p className="text-gray-700 font-medium mb-2">{t('quickAmounts')}</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {predefinedAmounts.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handlePredefinedAmount(value)}
                    className={`py-2 px-4 rounded-md border ${
                      amount === value
                        ? 'bg-[#D7CFFE] border-[#242528]'
                        : 'bg-white border-gray-300 hover:bg-gray-50'
                    }`}
                    disabled={isLoading}
                  >
                    {formatCurrency(value)}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <button
                type="submit"
                className="btn-primary"
                disabled={isLoading || amount <= 0 || isOffline}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 size={20} className="animate-spin mr-2" />
                    {t('processing')}
                  </span>
                ) : (
                  t('proceed')
                )}
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className="btn-secondary bg-gray-100 hover:bg-gray-200"
                disabled={isLoading}
              >
                {t('cancel')}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* PIN Modal */}
      {showPINModal && (
        <PINModal
          onSubmit={handlePINSubmit}
          onCancel={() => setShowPINModal(false)}
          title={t('enterPIN')}
          description={t('confirmTopUp', {
            amount: formatCurrency(amount),
            provider,
          })}
        />
      )}
    </div>
  );
};

export default TopUp;
