import axios from 'axios';
import { useState,useEffect} from 'react';
import {getProject} from '../../../apis/Api'

const useProject = (id) => {

    const [project, setProject] = useState([]);
    const [isError, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);
    
    const fetchProject = async (id) => {

        setLoading(true); 
        const data = await getProject(id); 
        if(data){     
            setProject(
                {
                    _id : data._id,
                    title : data.title,
                    description : data.description,
                    weblink : data.weblink,
                    gitlink : data.gitlink,
                    cover : data.cover.url
                }
            );
        }
        else{
            setError(true); 
        }
        setLoading(false);
    }
    
    useEffect(() =>{
        fetchProject(id)
    },[id])
    return {
        project,
        isError,
        isLoading
        
    }
}

export default useProject
