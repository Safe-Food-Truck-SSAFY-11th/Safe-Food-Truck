import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api", // API 기본 URL

  // https://i11b102.p.ssafy.io/api // 서버 URL
  timeout: 10000, // 요청 타임아웃
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    // 헤더에 토큰 넣어주기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (
//       error.response.status === 401 ||
//       error.response.data.message === "Unauthorized"
//     ) {
//       const refreshToken = sessionStorage.getItem("refresh_token");
//       try {
//         // accessToken 재발급
//         const response = await axios.post(
//           "http://localhost:8080/member/refresh",
//           refreshToken,
//           {
//             headers: {
//               "Content-Type": "text/plain",
//               "Authorization": `Bearer ${refreshToken}`
//             },
//           }
//         );
//         const newAccessToken = response.data.accessToken;
//         sessionStorage.setItem("token", newAccessToken);
//         axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         console.error("Refresh token failed:", refreshError);
//         sessionStorage.removeItem("token");
//         sessionStorage.removeItem("refresh_token");
//         return Promise.reject(refreshError);
//       } 
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;