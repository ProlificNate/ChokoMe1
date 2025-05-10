import { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { X, Camera } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

interface QRCodeScannerProps {
  onScan: (data: string) => void;
  onCancel: () => void;
}

const QRCodeScanner = ({ onScan, onCancel }: QRCodeScannerProps) => {
  const { t } = useLanguage();
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scannerContainerId = 'qrcode-scanner';

  useEffect(() => {
    const startScanner = async () => {
      scannerRef.current = new Html5Qrcode(scannerContainerId);
      try {
        await scannerRef.current.start(
          { facingMode: 'environment' }, // Use rear camera by default
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            onScan(decodedText);
            stopScanner();
          },
          (errorMessage) => {
            // Handle scan error silently
            console.log(errorMessage);
          }
        );
      } catch (error) {
        console.error('Error starting QR scanner:', error);
      }
    };

    const stopScanner = async () => {
      if (scannerRef.current) {
        await scannerRef.current.stop();
        await scannerRef.current.clear();
      }
    };

    startScanner();

    return () => {
      stopScanner();
    };
  }, [onScan]);

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <Camera size={20} className="mr-2" />
          <span className="font-medium">{t('scanQRCode')}</span>
        </div>
        <button
          onClick={onCancel}
          className="p-1 rounded-full hover:bg-gray-200"
          aria-label={t('cancel')}
        >
          <X size={20} />
        </button>
      </div>

      <div id={scannerContainerId} className="w-full aspect-square" />

      <style jsx>{`
        #${scannerContainerId} video {
          border-radius: 8px;
          width: 100% !important;
          height: auto !important;
        }
      `}</style>
    </div>
  );
};

export default QRCodeScanner;
