import { FETCH_SKILLS, UPDATE_SKILLS, DELETE_SKILLS, ADD_SKILLS } from '../Constants/actionTypes'
import * as api from '../apis/index';

export const getSkills = () => async (dispatch) =>{
    
    try {
        const { data } = await api.getSkills();
        
        dispatch({ type : FETCH_SKILLS, payload: data});

    } catch (error) {
            console.log(error)
    }
}
export const addSkills = (newModel,navigate) => async (dispatch)  =>{
    
    try {
        const { data } = await api.addSkills(newModel);
        dispatch({ type : ADD_SKILLS, payload: data});
        navigate(`${process.env.REACT_APP_ADMIN_BASE_URL}/skills`)

    } catch (error) {
            console.log(error)
    }
}
export const updateSkills = (updatedModel,navigate) => async (dispatch)  =>{
    
    try {
        const { data } = await api.updateSkills(updatedModel);
        dispatch({ type : UPDATE_SKILLS, payload: data});
        navigate(`${process.env.REACT_APP_ADMIN_BASE_URL}/skills`)

    } catch (error) {
            console.log(error)
    }
}
export const deleteSkills = (id,navigate) => async (dispatch)  =>{
    
    try {
        const { data } = await api.deleteSkills(id);
        dispatch({ type : DELETE_SKILLS, payload: data});
        navigate(`${process.env.REACT_APP_ADMIN_BASE_URL}/skills`)

    } catch (error) {
            console.log(error)
    }
}