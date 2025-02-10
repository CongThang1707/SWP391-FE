import axios from 'axios';

export const fetchData = async () => {
  try {
    const response = await axios.get('https://2330-2405-4802-9387-3470-bca5-27ff-fa16-a85f.ngrok-free.app/api/getUserByRoleId/1');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

// import axios from 'axios';

// export const fetchData = async () => {
//   try {
//     const response = await axios.get(
//       'https://2330-2405-4802-9387-3470-bca5-27ff-fa16-a85f.ngrok-free.app/api/getUserByRoleId/1'
//     );
//     return response.data ?? []; // Nếu response.data là null hoặc undefined, trả về []
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return []; // Trả về mảng rỗng khi có lỗi
//   }
// };
