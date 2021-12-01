import { useEffect, useState} from 'react';

const useSkills = () => {

    const [skills, setSkills] = useState([]);
    const [isError, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);
    
    const fetchSkills = async () => {

        setLoading(true); 
        const data = await getSkills(); 
        if(data){     
            setSkills(data);
        }
        else{
            setError(true); 
        }
        setLoading(false);
    }
    
    useEffect(() =>{
        fetchSkills()
    },[])
    {
        skills,
        isError,
        isLoading
    }
}

export default useSkills