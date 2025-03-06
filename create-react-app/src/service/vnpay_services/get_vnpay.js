import axios from 'axios';
import API_URL from '../api_service.js';

const submitOrder = async () => {
  const userId = localStorage.getItem('userId');
  try {
    const response = await axios.post(
      `${API_URL}submitOrder`,
      {}, // Dữ liệu body (để trống nếu API không yêu cầu)
      {
        params: {
          amount: 10000,
          Status: 'PREMIUM',
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

export default submitOrder;
