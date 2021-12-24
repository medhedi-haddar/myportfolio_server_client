
import { FETCH_EDUCATIONS, FETCH_EDUCATION, DELETE_EDUCATION, UPDATE_EDUCATION, ADD_EDUCATION } from '../Constants/actionTypes';
import * as api from '../apis/index';

export const getEducations = () => async (dispatch) =>{

    try {
        const { data } = await api.getEducations();
        dispatch({ type : FETCH_EDUCATIONS, payload: data});

    } catch (error) {
        return JSON.parse({ success : false , error : error.message });
    }
};

export const getOneEducation = (id) => async (dispatch) =>{

    try {
        const { data } = await api.getOneEducation(id);
        dispatch({ type : FETCH_EDUCATION, payload: data});

    } catch (error) {
        return JSON.parse({ success : false , error : error.message });
    }
};

export const deleteEducation = (id) => async (dispatch) =>{

    try {
        await api.deleteEducation(id);
        dispatch({ type : DELETE_EDUCATION, payload: id});

    } catch (error) {
        return JSON.parse({ success : false , error : error.message });
    }
};

export const addEducation = (newModel,navigate) => async (dispatch) => {

    try {
      const { data } = await api.addEducation(newModel);
      dispatch({ type: ADD_EDUCATION, payload: data });
      navigate(`/admin/educations`);

    } catch (error) {
        return JSON.parse({ success : false , error : error.message });
    }
};

export const updateEducation = (updatedModel,navigate) => async (dispatch) => {
    
    try {
      const { data } = await api.updateEducation(updatedModel);
      dispatch({ type: UPDATE_EDUCATION, payload: data });
      navigate(`/admin/educations`);

    } catch (error) {
        return JSON.parse({ success : false , error : error.message });
    }
};