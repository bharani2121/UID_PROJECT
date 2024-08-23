import axios from "axios"; 

const apiInstance = axios.create({
  baseURL: "INVALID_URL",
});
let current = process.env.REACT_APP_CURRENT_ENV;

apiInstance.interceptors.request.use(
  async function (config) {

    if(current === "DEVELOPMENT") {
      config.baseURL = process.env.REACT_APP_DEV_URL;
      config.headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      return config;
    } else {
      config.baseURL = process.env.REACT_APP_PRODUCTION_URL;
      config.headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      return config;
      
    }
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default apiInstance;
