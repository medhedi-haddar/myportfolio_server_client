import { FETCH_ABOUTME, UPDATE_ABOUTME, ADD_ABOUTME} from '../Constants/actionTypes'
import * as api from '../apis/index';

export const getAboutMe = () => async (dispatch) =>{

    try {
        const { data } = await api.getAboutMe();
        dispatch({ type : FETCH_ABOUTME, payload: data});

    } catch (error) {
            console.log(error.message)
    }
};

export const addAboutMe = (newAboutMe,config,navigate) => async (dispatch) => {

    try {
      const { data } = await api.addAboutMe(newAboutMe,config);
      dispatch({ type: ADD_ABOUTME, payload: data });
      navigate(`/admin/about_me`)

    } catch (error) {
      console.log(error.message);
    }
};

export const updateAboutMe = (updatedModel,config,navigate) => async (dispatch) => {
    
    try {
      const { data } = await api.updateAboutMe(updatedModel,config);
      dispatch({ type: UPDATE_ABOUTME, payload: data });
      navigate(`/admin/about_me`);

    } catch (error) {
      console.log(error.message);
    }
};