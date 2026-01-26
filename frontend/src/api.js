import axios from "axios";

const BaseURL = "http://localhost:5000/api";

export const API = axios.create({
    baseURL: BaseURL,

});