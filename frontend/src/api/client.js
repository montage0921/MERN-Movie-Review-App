import axios from "axios";

const client = axios.create({ baseURL: "http://localhost:1108/api" });

export default client;
