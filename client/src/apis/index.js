
import axios from 'axios'

export  const signin = (formData) => axios.post('/admin/signin',formData);

const API = axios.create({ baseURL : '/projects' });

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
});

export const getProjects    = async () => await API.get('/getprojects') ;
export const getOneProject  = async (id) => await API.get(`get_one_project/${id}`)
export const addProject     = async (newProject,config) => await API.post('add_project', newProject,config)
export const updateProject  = async (updatedProject,config) => await API.post(`update_project`,updatedProject,config)
export const deleteProject  = async (id) => await API.post(`/delete_project/${id}`) ;
