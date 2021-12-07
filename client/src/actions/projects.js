import { FETCH_PROJECT, FETCH_PROJECTS, DELETE_PROJECT, UPDATE_PROJECT, ADD_PROJECT } from '../Constants/actionTypes'
import * as api from '../apis/index';

export const getprojects = () => async (dispatch) =>{

    try {
        const { data } = await api.getProjects();
        dispatch({ type : FETCH_PROJECTS, payload: data});

    } catch (error) {
            console.log(error)
    }
};

export const getOneProject = (id) => async (dispatch) =>{

    try {
        const { data } = await api.getOneProject(id);
        dispatch({ type : FETCH_PROJECT, payload: data});

    } catch (error) {
            console.log(error)
    }
};

export const deleteProject = (id) => async (dispatch) =>{

    try {
        await api.deleteProject(id);
        dispatch({ type : DELETE_PROJECT, payload: id});

    } catch (error) {
            console.log(error)
    }
};

export const addProject = (project,config,navigate) => async (dispatch) => {

    try {
      const { data } = await api.addProject(project,config);
      dispatch({ type: ADD_PROJECT, payload: data });
      navigate(`${process.env.REACT_APP_ADMIN_BASE_URL}/projects`)

    } catch (error) {
      console.log(error.message);
    }
};

export const updateProject = (newProject,config,navigate) => async (dispatch) => {
    
    try {
      const { data } = await api.updateProject(newProject,config);
      dispatch({ type: UPDATE_PROJECT, payload: data });
      navigate(`${process.env.REACT_APP_ADMIN_BASE_URL}/projects`);

    } catch (error) {
      console.log(error.message);
    }
};