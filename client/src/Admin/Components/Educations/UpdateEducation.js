import React from 'react'
import { useSelector } from 'react-redux';
import UpdateEducationForm from './Form/UpdateEducationForm';
import Loader from '../../../Loader/Loader'

const UpdateEducation = ({id}) => {
    
    const educations = useSelector((state) => state.educations);
    const education = educations.find(education => education._id === id);
   
    return ( !education ? <Loader/> : ( <UpdateEducationForm education={education}/> ))
    
}

export default UpdateEducation
