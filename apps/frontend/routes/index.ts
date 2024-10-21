import axios from "axios";

const NETWORK = axios.create({
  baseURL: '__REPL__SERVER_API_ENDPOINT',
  validateStatus: (status) => {
    return status < 500;
  },
});

// NETWORK.interceptors.request.use((config) => {
//   let accessToken = localStorage.getItem("access_token");
//   config.headers.Authorization = "Bearer " + accessToken;
//   return config;
// });

// NETWORK.interceptors.response.use(
//   // в случае валидного accessToken ничего не делаем:
//   (config) => {
//     return config;
//   },
//   // в случае просроченного accessToken пытаемся его обновить:
//   async (error) => {
//     const originalRequest = { ...error.config };
//     // предотвращаем зацикленный запрос, добавляя свойство _isRetry
//     originalRequest._isRetry = true;

//     if (
//       // проверим, что ошибка именно из-за невалидного accessToken
//       error.response.status === 401 &&
//       // проверим, что запрос не повторный
//       error.config &&
//       !error.config._isRetry
//     ) {
//       try {
//         // запрос на обновление токенов

//         console.log(error.response.status);

//         const resp = await NETWORK.post("auth/refresh");

//         const newAccessToken = resp.data.access_token;

//         originalRequest.headers.Authorization = newAccessToken;

//         localStorage.setItem("access_token", resp.data.access_token);
//         // переотправляем запрос с обновленным accessToken
//         return NETWORK.request(originalRequest);
//       } catch (error) {}
//     }
//     // на случай, если возникла другая ошибка (не связанная с авторизацией)
//     // пробросим эту ошибку
//     throw error;
//   }
// );

export const API = NETWORK;
