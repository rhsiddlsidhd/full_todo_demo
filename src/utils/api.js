import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_PROXY}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});
/**
 * console.log all requests and responses
 */
api.interceptors.request.use(
  (request) => {
    console.log("Starting Request", request);
    return request;
  },

  function (error) {
    console.log("REQUEST ERROR", error);
  }
);

// api.interceptors.response.use(
//   (response) => {
//     console.log("Response:", response);
//     return response;
//   },
//   function (error) {
//     error = error.response.data;
//     console.log("RESPONSE ERROR", error);
//     return Promise.reject(error);
//   }
// );

api.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  (error) => {
    if (error.response) {
      // 서버가 응답을 보낸 경우 (4xx, 5xx)
      console.log("RESPONSE ERROR", error.response.data);
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // 요청이 만들어졌지만 서버로부터 응답이 없는 경우
      console.log("NO RESPONSE RECEIVED", error.request);
      return Promise.reject({ message: "No response received from server" });
    } else {
      // 요청 설정 중에 에러가 발생한 경우
      console.log("REQUEST SETUP ERROR", error.message);
      return Promise.reject({ message: error.message });
    }
  }
);

export default api;
