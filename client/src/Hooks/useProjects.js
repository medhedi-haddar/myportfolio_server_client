import { useState,useEffect} from 'react';
import {getProjects,getProject} from '../apis/GetApi'

const useProjects = (id) => {

    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState([]);
    const [isError, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);
    
    const fetchProjects = async () => {
    setLoading(true);

       const data = await getProjects();
       if(data){    
            const alldata = [];
            data.forEach((project)=>{
                let projectItemData = {
                    _id : project._id,
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

    const fetchProject = async (id) => {

        setLoading(true); 
        const data = await getProject(id); 
        if(data){     
            setProject({ 
                _id : data._id,
                title : data.title,
                description : data.description,
                weblink : data.weblink,
                gitlink : data.gitlink,
                cover : data.cover.url });
        }
        else{
            setError(true); 
        }
        setLoading(false);
    }
    
    useEffect(() =>{
        if(id){
            fetchProject(id);
        }else{
            fetchProjects()
        }
    },[id])
    return {
        projects,
        project,
        isError,
        isLoading,
        fetchProjects,
        fetchProject
        
    }
}

export default useProjects
