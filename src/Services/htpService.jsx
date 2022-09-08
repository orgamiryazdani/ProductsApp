import axios from "axios";

axios.defaults.baseURL = "https://api.escuelajs.co/api/v1/products";

const http = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
};

export default http;