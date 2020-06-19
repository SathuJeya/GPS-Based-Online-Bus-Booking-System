import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const instance = axios.create({
  baseURL: 'http://192.168.1.7:8085',
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      // config.cookies.token = token;
      //   {
      headers: Authorization: `Bearer ${token}`;

      //   }},
      // config.headers.token = token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);
export default instance;
