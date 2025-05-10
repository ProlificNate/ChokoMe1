  import { useState, useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { useAuth } from '../hooks/useAuth';
  import { useLanguage } from '../hooks/useLanguage';
  import { useOffline } from '../hooks/useOffline';
  import { mockApi } from '../services/mockApi';
  import { formatCurrency } from '../utils/encryption';
  import { ArrowLeft, Smartphone, QrCode, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
  import QRCodeGenerator from '../components/QRCodeGenerator';
  import QRCodeScanner from '../components/QRCodeScanner';
  import PINModal from '../components/PINModal';
  import OfflineBanner from '../components/OfflineBanner';

  const SendMoney = () => {
    const navigate = useNavigate();
    const { user, updateBalance, addTransaction } = useAuth();
    const { t } = useLanguage();
    const { isOffline } = useOffline();
    
    const [method, setMethod] = useState<'nfc' | 'qr'>('qr');
    const [nfcSupported, setNfcSupported] = useState(false);
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState<number>(0);
    const [showQRScanner, setShowQRScanner] = useState(false);
    const [showPINModal, setShowPINModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    
    // Check if NFC is supported
    useEffect(() => {
      const checkNfcSupport = () => {
        if ('NDEFReader' in window) {
          setNfcSupported(true);
        }
      };
      
      checkNfcSupport();
    }, []);
    
    const handleMethodChange = (newMethod: 'nfc' | 'qr') => {
      setMethod(newMethod);
    };
    
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value, 10);
      setAmount(isNaN(value) ? 0 : value);
    };
    
    const handleRecipientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setRecipient(e.target.value);
    };
    
    const handleQRScan = (data: string) => {
      setShowQRScanner(false);
      try {
        // Assuming QR code contains recipient ID
        setRecipient(data);
      } catch (err) {
        setError(t('invalidQRCode'));
      }
    };
    
    const handleInitiateNFC = async () => {
      if (!('NDEFReader' in window)) {
        setError(t('nfcNotSupported'));
        return;
      }
      
      setError(null);
      
      try {
        // @ts-ignore - NDEFReader is not in the TypeScript types yet
        const ndef = new window.NDEFReader();
        await ndef.scan();
        
        ndef.onreading = ({ message }: any) => {
          // Process NFC message
          for (const record of message.records) {
            if (record.recordType === "text") {
              const textDecoder = new TextDecoder();
              const text = textDecoder.decode(record.data);
              setRecipient(text);
            }
          }
        };
        
        ndef.onreadingerror = () => {
          setError(t('nfcReadError'));
        };
      } catch (error) {
        setError(t('nfcScanFailed'));
      }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      if (isOffline) {
        setError(t('offlineSendError'));
        return;
      }
      
      if (amount <= 0) {
        setError(t('invalidAmount'));
        return;
      }
      
      if (!recipient) {
        setError(t('recipientRequired'));
        return;
      }
      
      if (user && amount > user.balance) {
        setError(t('insufficientFunds'));
        return;
      }
      
      setError(null);
      setShowPINModal(true);
    };
    
    const handlePINSubmit = async (pin: string) => {
      setShowPINModal(false);
      setIsLoading(true);
      
      try {
        const response = await mockApi.sendMoney({ amount, recipient, pin });
        
        if (response.success) {
          // Calculate total amount with fee
          const totalAmount = amount + (response.fee || 0);
          
          // Update user balance
          updateBalance(-totalAmount);
          
          // Add transaction record
          addTransaction({
            type: 'send',
            amount,
            fee: response.fee || 0,
            receiver: recipient,
            status: 'completed'
          });
          
          setSuccess(response.message);
          
          // Reset form after success
          setAmount(0);
          setRecipient('');
          
          // Redirect after delay
          setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
        } else {
          setError(response.error || t('sendFailed'));
        }
      } catch (err) {
        setError(t('unexpectedError'));
      } finally {
        setIsLoading(false);
      }
    };
    
    const handleCancel = () => {
      navigate('/dashboard');
    };
    
    if (!user) {
      return <div className="p-6">{t('notAuthenticated')}</div>;
    }
    
    return (
      <div className="min-h-screen bg-[#D3E7EB] pt-20 pb-12">
        {isOffline && <OfflineBanner />}
        
        <div className="container-fluid">
          <div className="card fade-in">
            <div className="flex items-center mb-6">
              <button 
                onClick={handleCancel}
                className="mr-3 p-2 rounded-full hover:bg-gray-100"
                aria-label={t('back')}
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-2xl font-bold">{t('sendMoney')}</h1>
            </div>
            
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
            
            <div className="mb-6">
              <p className="block text-gray-700 font-medium mb-2">{t('transferMethod')}</p>
              <div className="grid grid-cols-2 gap-4">
                {nfcSupported && (
                  <button
                    type="button"
                    onClick={() => handleMethodChange('nfc')}
                    className={`flex flex-col items-center justify-center border rounded-md p-4 transition-all duration-200 ${
                      method === 'nfc' 
                      ? 'border-[#242528] bg-[#FDECBA]' 
                      : 'border-gray-300 hover:bg-gray-50'
                    }`}
                    disabled={isLoading || isOffline}
                  >
                    <Smartphone size={28} className="mb-2" />
                    <p className="font-medium">NFC</p>
                  </button>
                )}
                
                <button
                  type="button"
                  onClick={() => handleMethodChange('qr')}
                  className={`flex flex-col items-center justify-center border rounded-md p-4 transition-all duration-200 ${
                    method === 'qr' 
                    ? 'border-[#242528] bg-[#FDECBA]' 
                    : 'border-gray-300 hover:bg-gray-50'
                  }`}
                  disabled={isLoading}
                >
                  <QrCode size={28} className="mb-2" />
                  <p className="font-medium">QR Code</p>
                </button>
              </div>
            </div>
            
            {method === 'nfc' && (
              <div className="mb-6 p-6 border border-gray-200 rounded-lg bg-gray-50 text-center">
                <Smartphone size={48} className="mx-auto mb-3 text-gray-600" />
                <h3 className="text-lg font-semibold mb-2">{t('nfcPrompt')}</h3>
                <p className="text-gray-600 mb-4">{t('nfcInstructions')}</p>
                <button
                  type="button"
                  onClick={handleInitiateNFC}
                  className="btn-primary"
                  disabled={isLoading || isOffline}
                >
                  {t('scanNFC')}
                </button>
              </div>
            )}
            
            {method === 'qr' && (
              <div className="mb-6">
                <div className="p-6 border border-gray-200 rounded-lg bg-gray-50 text-center">
                  {!showQRScanner ? (
                    <>
                      <QrCode size={48} className="mx-auto mb-3 text-gray-600" />
                      <h3 className="text-lg font-semibold mb-2">{t('qrPrompt')}</h3>
                      <p className="text-gray-600 mb-4">{t('qrInstructions')}</p>
                      <button
                        type="button"
                        onClick={() => setShowQRScanner(true)}
                        className="btn-primary"
                        disabled={isLoading || isOffline}
                      >
                        {t('scanQR')}
                      </button>
                      
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600 mb-2">{t('myQRCode')}</p>
                        <div className="flex justify-center">
                          <QRCodeGenerator value={user.id} size={150} />
                        </div>
                      </div>
                    </>
                  ) : (
                    <QRCodeScanner onScan={handleQRScan} onCancel={() => setShowQRScanner(false)} />
                  )}
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="recipient">
                  {t('recipientId')}
                </label>
                <input
                  type="text"
                  id="recipient"
                  value={recipient}
                  onChange={handleRecipientChange}
                  className="input-field"
                  placeholder={t('recipientPlaceholder')}
                  disabled={isLoading}
                  required
                />
              </div>
              
              <div className="mb-8">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="amount">
                  {t('amount')}
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount || ''}
                  onChange={handleAmountChange}
                  className="input-field"
                  placeholder="0"
                  disabled={isLoading}
                  required
                  min="1"
                  aria-describedby="amount-description"
                />
                <p id="amount-description" className="text-sm text-gray-500 mt-1">
                  {t('availableBalance')}: {formatCurrency(user.balance)}
                </p>
              </div>
              
              <div className="flex flex-col gap-3">
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isLoading || amount <= 0 || !recipient || isOffline}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <Loader2 size={20} className="animate-spin mr-2" />
                      {t('processing')}
                    </span>
                  ) : t('proceed')}
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
        
        {showPINModal && (
          <PINModal 
            onSubmit={handlePINSubmit} 
            onCancel={() => setShowPINModal(false)}
            title={t('enterPIN')}
            description={t('confirmSend', { amount: formatCurrency(amount), recipient })}
          />
        )}
      </div>
    );
  };

  export default SendMoney;