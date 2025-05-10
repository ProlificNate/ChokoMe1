import axios from 'axios';

const API_BASE_URL = 'https://api.pay.staging.mynkwa.com';
const API_KEY = 't7hJfI56vOkb1xxAjbY0n'; // Store this securely in your environment variables

export const topUpWallet = async ({
  amount,
  phone
}: {
  amount: number;
  Phone: String; // Note: It's generally convention to use lowercase 'phone' for consistency
}) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/collect`,
      {
        amount,
        phone,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`, // Or another scheme if your backend uses one
        },
      }
    );

    return response.data; // Should return { success: true, message: "Top-up successful" }
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.Message || 'Top-up failed',
    };
  }
};