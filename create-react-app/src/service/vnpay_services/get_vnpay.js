import axios from 'axios';
import API_URL from '../api_service.js';

const submitOrder = async (amount, type) => {
  const userId = localStorage.getItem('userId');
  try {
    const response = await axios.post(
      `${API_URL}submitOrder`,
      {}, // Dữ liệu body (để trống nếu API không yêu cầu)
      {
        params: {
          amount: amount,
          Status: type,
          userId: userId
        }
      }
    );

    console.log('Response:', response.data);
    if (response.status === 200) {
      let paymentUrl = response.data;

      // Loại bỏ "redirect:" nếu có
      if (paymentUrl.startsWith('redirect:')) {
        paymentUrl = paymentUrl.replace('redirect:', '').trim();
      }

      localStorage.setItem('url', paymentUrl);
    }
  } catch (error) {
    console.error('Error submitting order:', error);
  }
};


export const getPaymentHistory = async () => {
  try {
    const response = await axios.get(`${API_URL}payment/getAllPayment`);
    return response.data;
  } catch (error) {
    console.error('Error fetching payment history:', error);
  }
};

export default submitOrder;
