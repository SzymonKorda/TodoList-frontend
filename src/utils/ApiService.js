import axios from "axios";

const getHeaders = () => {
    return {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }
};

const apiClient = axios.create({
    // baseURL: 'https://todolist-backend.cytr.us/api/'
    baseURL: 'http://localhost:8080/api'
})

const registerUser = (user) => {
    return apiClient.post('auth/signup', user);
};

const loginUser = (credentials) => {
    return apiClient.post('auth/signin', credentials);
};

const getUserActiveTasks = () => {
    return apiClient.get('task/active', getHeaders());
};

const getUserFinishedTasks = () => {
    return apiClient.get('task/finish', getHeaders());
};

const getUserTaskCount = () => {
    return apiClient.get('task/count', getHeaders());
};

const getTask = (id) => {
    return apiClient.get(`task/${id}`, getHeaders());
};

const addTask = (task) => {
    return apiClient.post('task', task, getHeaders());
};

const updateTask = (updatedTask, task) => {
    return apiClient.put(`task/${updatedTask.id}`, task, getHeaders());
};

const deleteTask = (id) => {
    return apiClient.delete(`task/${id}`, getHeaders());
};

const finishTask = (id) => {
    return apiClient.post(`task/${id}/finish`, {},  getHeaders())
};

const ApiService = {
    registerUser,
    loginUser,
    getUserActiveTasks,
    getUserFinishedTasks,
    getTask,
    addTask,
    updateTask,
    deleteTask,
    finishTask,
    getUserTaskCount
}

export default ApiService;
