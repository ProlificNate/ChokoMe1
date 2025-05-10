import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

interface QRCodeGeneratorProps {
  size?: number;
}

const QRCodeGenerator = ({ size = 200 }: QRCodeGeneratorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ussdCode = '*126*9*678105010*50000#';
  const encodedUssdCode = `tel:${encodeURIComponent(ussdCode)}`;

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        encodedUssdCode,
        {
          width: size,
          margin: 2,
          color: {
            dark: '#242528',
            light: '#ffffff'
          }
        },
        (error) => {
          if (error) console.error('Error generating QR code:', error);
        }
      );
    }
  }, [encodedUssdCode, size]);

  return (
    <div>
      <canvas 
        ref={canvasRef} 
        className="rounded-md" 
        aria-label={`QR code for ${ussdCode}`}
      />
    </div>
  );
};

export default QRCodeGenerator;
