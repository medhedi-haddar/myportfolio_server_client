import { FETCH_EXPERIENCES, FETCH_EXPERIENCE, UPDATE_EXPERIENCE, DELETE_EXPERIENCE, ADD_EXPERIENCE } from '../Constants/actionTypes'
import * as api from '../apis/index';


export const getExperiences = () => async (dispatch) =>{

    try {
        const { data } = await api.getExperiences();
        dispatch({ type : FETCH_EXPERIENCES, payload: data});

    } catch (error) {
        return JSON.parse({ success : false , error : error.message });
    }
};

export const getOneExperience = (id) => async (dispatch) =>{

    try {
        const { data } = await api.getOneExperience(id);
        dispatch({ type : FETCH_EXPERIENCE, payload: data});

    } catch (error) {
        return JSON.parse({ success : false , error : error.message });
    }
};

export const deleteExperience = (id) => async (dispatch) =>{

    try {
        await api.deleteExperience(id);
        dispatch({ type : DELETE_EXPERIENCE, payload: id});

    } catch (error) {
        return JSON.parse({ success : false , error : error.message });
    }
};

export const addExperience = (newModel,navigate) => async (dispatch) => {

    try {
      const { data } = await api.addExperience(newModel);
      dispatch({ type: ADD_EXPERIENCE, payload: data });
      navigate('/admin/experiences');

    } catch (error) {
        return JSON.parse({ success : false , error : error.message });
    }
};

export const updateExperience = (updatedModel,navigate) => async (dispatch) => {
    
    try {
      const { data } = await api.updateExperience(updatedModel);
      dispatch({ type: UPDATE_EXPERIENCE, payload: data });
      navigate('/admin/experiences');

    } catch (error) {
        return JSON.parse({ success : false , error : error.message });
    }
};