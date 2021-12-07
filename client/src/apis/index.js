
import axios from 'axios'
// Constants
const API_ADMIN         = axios.create({ baseURL : `/admin` });
const API_PROFILE       = axios.create({ baseURL : `/admin` });
const API_PROJECT       = axios.create({ baseURL : `/projects` });
const API_SKILLS        = axios.create({ baseURL : `/skills` });
const API_EXPERIENCES   = axios.create({ baseURL : `/experiences` });
const API_ABOUT         = axios.create({ baseURL : `/aboutme` });
const API_EDUCATIONS    = axios.create({ baseURL : `/educations` });
const API_CONTACT       = axios.create({ baseURL : `/contact` });

// Interseptor

API_PROFILE.interceptors.request.use((req)=>{
    if(localStorage.getItem(`profile`)){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem(`profile`)).token}`
    }
    return req;
});
API_PROJECT.interceptors.request.use((req)=>{
    if(localStorage.getItem(`profile`)){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem(`profile`)).token}`
    }
    return req;
});
API_SKILLS.interceptors.request.use((req)=>{
    if(localStorage.getItem(`profile`)){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem(`profile`)).token}`
    }
    return req;
});
API_EXPERIENCES.interceptors.request.use((req)=>{
    if(localStorage.getItem(`profile`)){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem(`profile`)).token}`
    }
    return req;
});
API_EDUCATIONS.interceptors.request.use((req)=>{
    if(localStorage.getItem(`profile`)){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem(`profile`)).token}`
    }
    return req;
});
API_ABOUT.interceptors.request.use((req)=>{
    if(localStorage.getItem(`profile`)){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem(`profile`)).token}`
    }
    return req;
});
API_CONTACT.interceptors.request.use((req)=>{
    if(localStorage.getItem(`profile`)){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem(`profile`)).token}`
    }
    return req;
});

// Auth
export const signin = async (formData) => await API_ADMIN.post(`/signin`,formData);

// projects 
export const getProjects    = async () => await API_PROJECT.get(`/get_all`);
export const getOneProject  = async (id) => await API_PROJECT.get(`get_one/${id}`);
export const addProject     = async (newModel,config) => await API_PROJECT.post(`add`, newModel,config);
export const updateProject  = async (updatedModel,config) => await API_PROJECT.post(`update`,updatedModel,config);
export const deleteProject  = async (id) => await API_PROJECT.post(`/delete_one/${id}`);

// experience 
export const getExperiences    = async () => await API_EXPERIENCES.get(`/get_all`) ;
export const getOneExperience  = async (id) => await API_EXPERIENCES.get(`get_one/${id}`);
export const addExperience     = async (newModel) => await API_EXPERIENCES.post(`add`, newModel);
export const updateExperience  = async (updatedModel) => await API_EXPERIENCES.post(`update`,updatedModel);
export const deleteExperience  = async (id) => await API_EXPERIENCES.post(`/delete_one/${id}`);

// experience 
export const getEducations    = async () => await API_EDUCATIONS.get(`/get_all`) ;
export const getOneEducation  = async (id) => await API_EDUCATIONS.get(`get_one/${id}`);
export const addEducation     = async (newModel) => await API_EDUCATIONS.post(`add`, newModel);
export const updateEducation  = async (updatedModel) => await API_EDUCATIONS.post(`update`,updatedModel);
export const deleteEducation  = async (id) => await API_EDUCATIONS.post(`/delete_one/${id}`);

// Profile
export const updateProfile  = async (updatedModel) => await API_PROFILE.post(`update`,updatedModel);

// about me
export const getAboutMe     = async () => await API_ABOUT.get(`/get_all`); 
export const addAboutMe     = async (newModel,config) => await API_ABOUT.post(`add`, newModel,config);
export const updateAboutMe  = async (updatedModel,config) => await API_ABOUT.post(`update`,updatedModel,config);

// skills
export const getSkills  = async (id) => await API_SKILLS.get(`get_all`);
export const addSkills     = async (newModel) => await API_SKILLS.post(`add`, newModel);
export const updateSkills  = async (updatedModel) => await API_SKILLS.post(`update`,updatedModel);
export const deleteSkills  = async (id) => await API_SKILLS.post(`/delete_one/${id}`);
