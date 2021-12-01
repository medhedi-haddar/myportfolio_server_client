import { useState,useEffect} from 'react';
import {getExperiences,getExperience} from '../apis/GetApi'

const useExperiences = () => {

    const [experiences, setExperiences] = useState([]);
    const [experience, setExperience] = useState([]);
    const [isError, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const fetchExperiences = async () =>{
        setLoading(true);
        const data = await getExperiences();
        if(data){
            setExperiences(data);
        }else{
            setError(true);
        }
        setLoading(false);

    }
    const fetchExperience = async (id) =>{
        setLoading(true);
        const data = await getExperience(id);
        if(data){
            setExperience(data);
        }else{
            setError(true);
        }
        setLoading(false);
    }

    useEffect(() =>{
        if(id){
            fetchExperience(id);
        }else{
            fetchExperiences()
        }
    },[id])
    return {
        isLoading,
        isError,
        experience,
        experiences,
        fetchExperiences,
        fetchExperience
    }
}

export default useExperiences
