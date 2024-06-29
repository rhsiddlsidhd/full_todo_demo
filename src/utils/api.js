import axios from "axios";

export const api = axios.create({
  // baseURL: `${process.env.REACT_APP_BACKEND_PROXY}/api`,
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    authorization: "Bearer " + sessionStorage.getItem("token"),
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

api.interceptors.response.use(
  (response) => {
    console.log("Response:", response);

    return response;
  },
  function (error) {
    error = error.response.data;
    console.log("RESPONSE ERROR", error);
    return Promise.reject(error);
  }
);

export const apiGetTask = () => {
  return api.get("/tasks");
};

export const apiPostTask = (todo) => {
  return api.post("/tasks", {
    task: todo,
    isComplete: false,
  });
};

export const apiPutTask = (id, task, isComplete) => {
  return api.put(`/tasks/${id}`, {
    task: task,
    isComplete: !isComplete,
  });
};

export const apiDeleteTask = (id) => {
  return api.delete(`/tasks/${id}`);
};
