import { UPDATE_PROFILE } from '../Constants/actionTypes'
import * as api from '../apis/index';

export const updateProfile = (newProfile) => async (dispatch) => {
    
    try {
      const { data } = await api.updateProfile(newProfile);
      dispatch({ type: UPDATE_PROFILE, payload: data });

    } catch (error) {
      console.log(error.message);
    }
};
