import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Loading from './components/Loading';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';

// Lazy load pages for better performance
const Landing = lazy(() => import('./pages/Landing'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const TopUp = lazy(() => import('./pages/TopUp'));
const SendMoney = lazy(() => import('./pages/SendMoney'));
const Support = lazy(() => import('./pages/Support'));

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-[#D3E7EB]">
      <Header />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route 
            path="/" 
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Landing />} 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/top-up" 
            element={
              <ProtectedRoute>
                <TopUp />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/send-money" 
            element={
              <ProtectedRoute>
                <SendMoney />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/support" 
            element={
              <ProtectedRoute>
                <Support />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="*" 
            element={<Navigate to="/" />} 
          />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;