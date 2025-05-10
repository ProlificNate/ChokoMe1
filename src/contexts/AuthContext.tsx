import { createContext, useEffect, useState, ReactNode } from 'react';
import { saveToStorage, getFromStorage, removeFromStorage } from '../services/storage';

// Demo user for testing
const demoUser = {
  id: 'demo123',
  name: 'Demo User',
  email: 'demo@example.com',
  balance: 10000, // in currency units
  pin: '1234', // In a real app, this would be encrypted and not stored client-side
  transactions: [],
  createdAt: new Date().toISOString()
};

interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  pin: string;
  transactions: Transaction[];
  createdAt: string;
}

interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'top-up';
  amount: number;
  fee: number;
  sender?: string;
  receiver?: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: () => void;
  signup: () => void;
  logout: () => void;
  updateBalance: (amount: number) => void;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'timestamp'>) => void;
  verifyPin: (pin: string) => boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  signup: () => {},
  logout: () => {},
  updateBalance: () => {},
  addTransaction: () => {},
  verifyPin: () => false
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = getFromStorage('user');
    if (storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = () => {
    // In a real app, this would make an API call
    // For demo, we're using the predefined demoUser
    saveToStorage('user', demoUser);
    setUser(demoUser);
    setIsAuthenticated(true);
  };

  const signup = () => {
    // For demo purposes, signup is the same as login
    login();
  };

  const logout = () => {
    removeFromStorage('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateBalance = (amount: number) => {
    if (user) {
      const updatedUser = {
        ...user,
        balance: user.balance + amount
      };
      saveToStorage('user', updatedUser);
      setUser(updatedUser);
    }
  };

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'timestamp'>) => {
    if (user) {
      const newTransaction: Transaction = {
        ...transaction,
        id: `tx-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        timestamp: new Date().toISOString()
      };
      
      const updatedUser = {
        ...user,
        transactions: [newTransaction, ...user.transactions]
      };
      
      saveToStorage('user', updatedUser);
      setUser(updatedUser);
    }
  };

  const verifyPin = (pin: string) => {
    return user?.pin === pin;
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated, 
        login, 
        signup, 
        logout,
        updateBalance,
        addTransaction,
        verifyPin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};