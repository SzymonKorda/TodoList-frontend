import axios from "axios";

export default axios.create({
    baseURL: 'https://todolist-backend.cytr.us/api/'
})
