import axios from "axios";
const bu_api_url = process.env.REACT_APP_API_URL;
const baseURL =`${bu_api_url}`;
const api = axios.create({
    baseURL,
});
export default api;
