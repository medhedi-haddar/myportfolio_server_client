import React,{ useEffect, useState} from 'react'
import {getFromStorage} from '../Utils/Storage';
import axios from 'axios';

const useLogin = () => {

    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(true);
    const [isLogged, setIsLogged] = useState(false);


    const checkUserSession =  async () => {
        const token  = getFromStorage('the_main_app');
        console.log(token);
        if( token ) {
            await axios.get('/api/admin/verify?token='+token)
            .then((data) => {
              
                if(data.data.success === true){
                    setToken(token);
                    setIsLogged(true)
                }else{
                    setToken('');
                    setIsLogged(false)
                }
            })
            .catch((error)=>{
                setLoading(false)
            });
        }
        setLoading(false)
    }

    // useEffect(() => {
    //     checkUserSession();
    //  }, [])

    return{
        isLogged,
        token,
        loading,
        checkUserSession
    }
}

export default useLogin
