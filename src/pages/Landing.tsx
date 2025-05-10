import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../hooks/useLanguage';
import { Wallet, Users, ShieldCheck, Repeat } from 'lucide-react';
import LanguageSwitcher from '../components/LanguageSwitcher';
import personImage from '..public/person.jpeg';

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
      <section className="w-full bg-blue-50 mt-20 py-12 px-7 overflow-hidden relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Text Content */}
          <div className="text-left z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-800">
          Experience fast, secure, and seamless digital payments with ChokoMe
            </h1>
            <p className="text-xl text-gray-700 mb-6">
             . Whether online through blockchain technology or offline via USSD, ChokoMe offers the perfect solution for all your money transfer needs in Cameroon.
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
                  <p className="text-center">
                    <img src="../public/person.png" alt="Person" />
                  </p>
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
      <footer className="w-full bg-gray-100 pt-12 pb-6 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Logo & About Column */}
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-2 rounded-full mr-2">
                  <Wallet size={24} className="text-blue-600" />
                </div>
                <span className="font-bold text-xl">ChokoMe</span>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Simplifying community savings and financial management across Cameroon.
              </p>
            </div>
            
            {/* About Us Column */}
            <div>
              <h3 className="font-bold text-gray-800 mb-4">About Us</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-blue-600 text-sm">Our Story</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 text-sm">How It Works</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 text-sm">Careers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 text-sm">Press</a></li>
              </ul>
            </div>
            
            {/* Support Column */}
            <div>
              <h3 className="font-bold text-gray-800 mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-blue-600 text-sm">FAQ</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 text-sm">Contact</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 text-sm">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 text-sm">Terms of Service</a></li>
              </ul>
            </div>
            
            {/* Connect With Us Column */}
            <div>
              <h3 className="font-bold text-gray-800 mb-4">Connect with us</h3>
              <div className="flex space-x-4 mb-4">
                {/* Facebook */}
                <a href="#" className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                  </svg>
                </a>
                {/* Twitter/X */}
                <a href="#" className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a href="#" className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-pink-600 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                  </svg>
                </a>
                {/* LinkedIn */}
                <a href="#" className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-blue-700 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                  </svg>
                </a>
              </div>
              <p className="text-sm text-gray-600">Stay updated with our latest news and offers.</p>
            </div>
          </div>
          
          {/* Copyright Line */}
          <div className="pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
            © 2025 ChokoMe. {t('rightsReserved') || 'All rights reserved.'}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;