import { useState } from 'react';
import topup from './connect';

export default TopUpForm =()=>{
  const [amount, setAmount] = useState<number>(0);
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    if (amount <= 0 || !/^2376\d{8}$/.test(phone)) {
      setErrorMsg('Please enter a valid amount and phone number.');
      setLoading(false);
      return;}

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Top Up Wallet</h2>

      {successMsg && <p className="text-green-600 mb-3">{successMsg}</p>}
      {errorMsg && <p className="text-red-600 mb-3">{errorMsg}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1" htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="2376XXXXXXXX"
            className="w-full border p-2 rounded"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="amount">Amount (XAF)</label>
          <input
            id="amount"
            type="number"
            value={amount || ''}
            onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
            placeholder="1000"
            className="w-full border p-2 rounded"
            required
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
          disabled={loading}
          onClick={topup(amount,phone)}
        >
          {loading ? 'Processing...' : 'Top Up'}
        </button>
      </form>
    </div>
  );
}};
