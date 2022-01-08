import axios from "axios";

const headers =  {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}

const apiClient = axios.create({
    baseURL: 'https://todolist-backend.cytr.us/api/'
})

const registerUser = (user) => {
    return apiClient.post('auth/signup', user);
};

const loginUser = (credentials) => {
    return apiClient.post('auth/signin', credentials);
};

const getUserActiveTasks = () => {
    return apiClient.get('task/active', headers);
};

const getUserFinishedTasks = () => {
    return apiClient.get('task/finish', headers);
};

const getTask = (id) => {
    return apiClient.get(`task/${id}`, headers);
};

const addTask = (task) => {
    return apiClient.post('task', task, headers);
};

const updateTask = (updatedTask, task) => {
    return apiClient.put(`task/${updatedTask.id}`, task, headers);
};

const deleteTask = (id) => {
    return apiClient.delete(`task/${id}`, headers);
};

const finishTask = (id) => {
    return apiClient.post(`task/${id}/finish`, {},  headers)
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
    finishTask
}

export default ApiService;
