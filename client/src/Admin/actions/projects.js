import { FETCH_ONE, FETCH_ALL, DELETE, UPDATE, ADD } from '../Constants/actionTypes'
import * as api from '../../apis/index';

export const getprojects = () => async (dispatch) =>{

    try {
        const { data } = await api.getProjects();
        console.log(data)
        dispatch({ type : FETCH_ALL, payload: data});

    } catch (error) {
            console.log(error)
    }
};

export const getOneProject = (id) => async (dispatch) =>{

    try {
        const { data } = await api.getOneProject(id);
        console.log(data)
        dispatch({ type : FETCH_ONE, payload: data});

    } catch (error) {
            console.log(error)
    }
};

export const deleteProject = (id) => async (dispatch) =>{

    try {
        await api.deleteProject(id);
        dispatch({ type : DELETE, payload: id});

    } catch (error) {
            console.log(error)
    }
};

export const addProject = (project,config,navigate) => async (dispatch) => {

    try {
      const { data } = await api.addProject(project,config);
      dispatch({ type: ADD, payload: data });
      navigate('/admin/projects')

    } catch (error) {
      console.log(error.message);
    }
};

export const updateProject = (newProject,config,navigate) => async (dispatch) => {
    
    try {
      const { data } = await api.updateProject(newProject,config);
      dispatch({ type: UPDATE, payload: data });
      navigate('/admin/projects');

    } catch (error) {
      console.log(error.message);
    }
};