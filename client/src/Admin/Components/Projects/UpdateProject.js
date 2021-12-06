import React from 'react'
import { useSelector } from 'react-redux';
import UpdateProjectForm from './Form/UpdateProjectForm';
import Loader from '../../../Loader/Loader'

const UpdateProject = ({id}) => { 
    const projects = useSelector((state) => state.projects);
    const project = projects.find(project => project._id === id);
    return ( !project ? <Loader/> : ( <UpdateProjectForm project={project}/> ))
}

export default UpdateProject
