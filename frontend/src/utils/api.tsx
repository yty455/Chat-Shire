import axios from "axios";

// Axios 인스턴스 생성
const api = axios.create({
  // baseURL: "/api1", // API의 기본 URL
  baseURL: "http://j9e205.p.ssafy.io:8080", // API의 기본 URL
  withCredentials: true,
});

// 요청 인터셉터 설정
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // 헤더에 토큰 추가
    if (token) {
      config.headers.Authorization = `${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 403) {
      // 403 에러
      // 리프레쉬 토큰 가져오기
      const refreshToken = sessionStorage.getItem("refresh_token");

      if (refreshToken) {
        try {
          // 새로운 토큰과 리프레쉬
          const response = await axios.request({
            method: error.config.method, // 원래 요청의 HTTP 메서드를 사용합니다.
            url: error.config.url, // 원래 요청의 URL을 사용합니다.
            headers: {
              AuthorizationRefresh: `${refreshToken}`, // 리프레시 토큰을 사용하여 인증합니다.
            },
          });

          if (response.status === 200) {
            // const { access_token, refresh_token } = response.data;
            const token = response.headers["authorization"];
            localStorage.setItem("token", response.headers["authorization"]);
            sessionStorage.setItem(
              "refresh_token",
              response.headers["authorization-refresh"]
            );
            // // 새로운 토큰을 저장
            // localStorage.setItem("token", access_token);
            // localStorage.setItem("refresh_token", refresh_token);

            // 요청 재시도
            error.config.headers.Authorization = `${token}`;
            return axios.request(error.config);
          }
        } catch (refreshError) {
          // 리프레쉬 토큰을 사용해도 또 에러
          // 로그인 페이지로 이동
          window.location.href = "/login";
        }
      } else {
        // 리프레쉬 토큰 없어도 로그인 페이지로 이동
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
