import axios from 'axios';
import { useState,useEffect} from 'react';
import {getProjects} from '../apis/Api'

const useProjects = () => {

    const [projects, setProjects] = useState([]);
    const [isError, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);
    
    const fetchProjects = async () => {
    setLoading(true);

       const data = await getProjects();
       if(data){    
            const alldata = [];
            data.forEach((project)=>{
                let projectItemData = {
                    id : project._id,
                    title : project.title,
                    description : project.description,
                    weblink : project.weblink,
                    gitlink : project.gitlink,
                    cover : project.cover.url
                }
                alldata.push(projectItemData);
            })
            setProjects(alldata);
       }
       else{
        setError(true); 
       }
       setLoading(false);
    }
    
    useEffect(() =>{
        fetchProjects()
    },[])
    return {
        projects,
        isError,
        isLoading
        
    }
}

export default useProjects
