import axios from "axios";

// Axios 인스턴스 생성
const api = axios.create({
  // baseURL: "/api1/", // API의 기본 URL
  baseURL: "http://j9e205.p.ssafy.io:8080/", // API의 기본 URL
  withCredentials: true,
});

// 요청 인터셉터 설정
api.interceptors.request.use(
  (config) => {
    // 로컬 스토리지에서 토큰 가져오기
    localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTY5NTAyNjI3MywiaWQiOjF9.JIoqntlnxbtgw7UksxNvZCi8ef5UI0r-SQlCUlIqgEFOi8HgbJ7bkzGGaPftqaWI6fsq6rk_8fsDosGwkGIWTA"
    );
    const token = localStorage.getItem("token");

    // 헤더에 토큰 추가
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
    // 여기에 원하는 응답 후처리 로직을 추가할 수 있습니다.
    // 예를 들어, 응답 데이터를 가공하거나 에러 처리를 수행할 수 있습니다.
    // console.log(response);
    return response;
  },
  (error) => {
    // 에러 처리 로직을 추가합니다.
    return Promise.reject(error);
  }
);

export default api;
