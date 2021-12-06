import React from 'react'
import { useSelector } from 'react-redux';
import UpdateExperienceForm from './Form/UpdateExperienceForm';
import Loader from '../../../Loader/Loader'

const UpdateExperience = ({id}) => {
    
    const experiences = useSelector((state) => state.experiences);
    const experience = experiences.find(experience => experience._id === id);
   
    return ( !experience ? <Loader/> : ( <UpdateExperienceForm experience={experience}/> ))
    
}

export default UpdateExperience
