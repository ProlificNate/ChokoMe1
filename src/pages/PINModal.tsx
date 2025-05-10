import React, { useState } from 'react';

interface PINModalProps {
  title: string;
  description: string;
  onSubmit: (pin: string) => void;
  onCancel: () => void;
}

const PINModal: React.FC<PINModalProps> = ({ title, description, onSubmit, onCancel }) => {
  const [pin, setPin] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (/^\d{0,5}$/.test(input)) {
      setPin(input);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length === 5) {
      onSubmit(pin);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-sm text-gray-600 mb-4">{description}</p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            inputMode="numeric"
            value={pin}
            onChange={handleChange}
            maxLength={5}
            className="w-full p-2 border border-gray-300 rounded mb-4 text-center tracking-widest text-lg"
            placeholder="•••••"
            required
          />

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={pin.length !== 5}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PINModal;
