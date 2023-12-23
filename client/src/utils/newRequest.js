import axios from "axios";

const newRequest = axios.create({              // creating an axios instance
    baseURL: "http://localhost:3000/api/",
    withCredentials: true,                     //  // browser should include cookies while making the request
});       

export default newRequest;