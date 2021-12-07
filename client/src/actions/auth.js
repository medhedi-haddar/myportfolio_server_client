import { AUTH } from '../Constants/actionTypes'
import * as api from '../apis/index';

export const signin = (loginData, navigate) => async (dispatch) =>{

    try {
        
        const {data} = await api.signin(loginData);

        dispatch({ type : AUTH, data});
        navigate(`${process.env.REACT_APP_ADMIN_BASE_URL}`)

    } catch (error) {
            console.log(error)
    }
}
