// Simulate API response delays and network conditions

// Simulated delay to mimic network latency
const simulateNetworkDelay = async (minMs = 300, maxMs = 1200): Promise<void> => {
  const delay = Math.floor(Math.random() * (maxMs - minMs)) + minMs;
  return new Promise(resolve => setTimeout(resolve, delay));
};

// Simulate network failure with a specified probability
const simulateNetworkFailure = (failureProbability = 0.1): boolean => {
  return Math.random() < failureProbability;
};

interface TopUpRequest {
  amount: number;
  provider: 'mtn' | 'orange';
  pin: string;
}

interface TopUpResponse {
  success: boolean;
  message: string;
  transactionId?: string;
  timestamp?: string;
  amount?: number;
  balance?: number;
  error?: string;
}

interface SendMoneyRequest {
  amount: number;
  recipient: string;
  pin: string;
}

interface SendMoneyResponse {
  success: boolean;
  message: string;
  transactionId?: string;
  timestamp?: string;
  amount?: number;
  fee?: number;
  recipient?: string;
  error?: string;
}

// Simulated API endpoints
export const mockApi = {
  // Simulate top-up request
  topUp: async (request: TopUpRequest): Promise<TopUpResponse> => {
    await simulateNetworkDelay();
    
    // Simulate network failure
    if (simulateNetworkFailure()) {
      return {
        success: false,
        message: 'Network error',
        error: 'Failed to connect to payment provider'
      };
    }
    
    // Simulate PIN validation
    if (request.pin !== '1234') {
      return {
        success: false,
        message: 'Invalid PIN',
        error: 'The PIN you entered is incorrect'
      };
    }
    
    // Successful top-up
    return {
      success: true,
      message: `Successfully topped up ${request.amount} via ${request.provider}`,
      transactionId: `top-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      timestamp: new Date().toISOString(),
      amount: request.amount,
    };
  },
  
  // Simulate send money request
  sendMoney: async (request: SendMoneyRequest): Promise<SendMoneyResponse> => {
    await simulateNetworkDelay();
    
    // Simulate network failure
    if (simulateNetworkFailure()) {
      return {
        success: false,
        message: 'Network error',
        error: 'Failed to complete transaction'
      };
    }
    
    // Simulate PIN validation
    if (request.pin !== '1234') {
      return {
        success: false,
        message: 'Invalid PIN',
        error: 'The PIN you entered is incorrect'
      };
    }
    
    // Calculate transaction fee (1% of amount)
    const fee = Math.round(request.amount * 0.01);
    
    // Successful money transfer
    return {
      success: true,
      message: `Successfully sent ${request.amount} to ${request.recipient}`,
      transactionId: `send-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      timestamp: new Date().toISOString(),
      amount: request.amount,
      fee: fee,
      recipient: request.recipient
    };
  }
};