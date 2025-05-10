import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../hooks/useLanguage';
import { Wallet, Users, ShieldCheck, Repeat } from 'lucide-react';
import LanguageSwitcher from '../components/LanguageSwitcher';

const Landing = () => {
  const { login, signup } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      login();
      navigate('/dashboard');
      setIsLoading(false);
    }, 800);
  };

  const handleSignup = () => {
    setIsLoading(true);
    setTimeout(() => {
      signup();
      navigate('/dashboard');
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* Language Switcher */}
      <header className="absolute top-4 right-4">
        <LanguageSwitcher />
      </header>

      {/* Hero Section - Styled like the image */}
      <section className="w-full bg-blue-50 py-12 px-6 overflow-hidden relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Text Content */}
          <div className="text-left z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-800">
          Looking for a safe and fast way to transfer money?
            </h1>
            <p className="text-xl text-gray-700 mb-6">
              Search no more, for ChokoMe is your all in one solution to digital payments in Cameroon with an online function using block chain technology and also with an offline function using USSD.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleSignup}
                disabled={isLoading}
                className="py-3 px-6 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
              >
                {isLoading ? 'Loading...' : t('Get Started') || 'Get Started'}
              </button>
              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="py-3 px-6 border border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition"
              >
                {isLoading ? 'Loading...' : t('login') || 'Login'}
              </button>
            </div>
            
          </div>
          
          {/* Right Side - Image with UI Elements */}
          <div className="relative hidden md:block">
            {/* Large circular background */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-96 h-96 bg-blue-200 rounded-full opacity-50"></div>
            
            {/* Image placeholder - would be replaced with actual image */}
            <div className="relative z-10 flex justify-center">
              <div className="relative">
                {/* This would be an actual image in production */}
                <div className="w-64 h-80 bg-purple-500 rounded-xl flex items-center justify-center text-white font-bold">
                  {/* This is a placeholder for person image */}
                  <p className="text-center">Person Image Here</p>
                </div>
                
                {/* Floating UI Elements */}
                <div className="absolute -top-6 -right-16 bg-white p-3 rounded-lg shadow-md w-36">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex-shrink-0"></div>
                    <div className="ml-2">
                      <p className="text-xs font-semibold">TopUp Successful</p>
                      <p className="text-xs text-gray-500">1000Xaf</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -left-16 bg-white p-3 rounded-lg shadow-md w-36">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex-shrink-0"></div>
                    <div className="ml-2">
                      <p className="text-xs font-semibold">Payment Complete</p>
                      <p className="text-xs text-gray-500">2500Xaf</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 px-4">
        <h2 className="text-2xl font-bold text-center mb-12">Features</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="mb-4">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <ShieldCheck size={24} className="text-purple-400" />
              </div>
            </div>
            <h3 className="font-semibold mb-2">Secure Transactions</h3>
            <p className="text-sm text-gray-700">End-to-end encryption for all payments and transfers</p>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="mb-4">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <Repeat size={24} className="text-purple-400" />
              </div>
            </div>
            <h3 className="font-semibold mb-2">Works Offline</h3>
            <p className="text-sm text-gray-700">Continue operations even without internet connection</p>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="mb-4">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <Users size={24} className="text-purple-400" />
              </div>
            </div>
            <h3 className="font-semibold mb-2">Easy Transfers</h3>
            <p className="text-sm text-gray-700">Send money using NFC or QR codes</p>
          </div>
          
          {/* Feature 4 */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="mb-4">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <Wallet size={24} className="text-purple-400" />
              </div>
            </div>
            <h3 className="font-semibold mb-2">Affordable Fees</h3>
            <p className="text-sm text-gray-700">Low transaction fees compared to traditional banks</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full bg-blue-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">How It Works</h2>
          
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex items-start">
              <div className="mr-6">
                <div className="w-10 h-10 rounded-full bg-yellow-200 flex items-center justify-center font-semibold text-black">1</div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Create an account</h3>
                <p className="text-sm text-gray-700">Create your secure ChokoMe account with your email and phone number.</p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="flex items-start">
              <div className="mr-6">
                <div className="w-10 h-10 rounded-full bg-yellow-200 flex items-center justify-center font-semibold text-black">2</div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Top up your balance</h3>
                <p className="text-sm text-gray-700">Add funds to your wallet using Nkwa.</p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="flex items-start">
              <div className="mr-6">
                <div className="w-10 h-10 rounded-full bg-yellow-200 flex items-center justify-center font-semibold text-black">3</div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Send money using NFC or QR code</h3>
                <p className="text-sm text-gray-700">Transfer money easily by tapping phones (NFC) or scanning QR codes.</p>
              </div>
            </div>
            
            {/* Step 4 */}
            <div className="flex items-start">
              <div className="mr-6">
                <div className="w-10 h-10 rounded-full bg-yellow-200 flex items-center justify-center font-semibold text-black">4</div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Track your transactions in real-time</h3>
                <p className="text-sm text-gray-700">Monitor all your transactions in your personal dashboard.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">What Our Users Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <p className="italic text-gray-700 mb-4">"ChokoMe has transformed how our savings group operates. It's so much easier to track contributions now!"</p>
              <p className="font-semibold text-sm">Mami Put, Buea</p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <p className="italic text-gray-700 mb-4">"The offline mode is perfect for when I'm in areas with poor network coverage."</p>
              <p className="font-semibold text-sm">Papa Joseph, Kumba</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-yellow-100 py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-2">Ready to get started?</h2>
          <p className="text-gray-700 mb-6">Join thousands of Cameroonians using ChokoMe for secure, easy payments</p>
          <button
            onClick={handleSignup}
            className="py-3 px-6 bg-gray-900 text-white font-semibold rounded flex items-center mx-auto hover:bg-gray-800 transition"
          >
            Create Your Account <span className="ml-2">→</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-100 py-4 text-center text-gray-600 text-sm">
        © 2025 ChokoMe. {t('rightsReserved')}
      </footer>
    </div>
  );
};

export default Landing;