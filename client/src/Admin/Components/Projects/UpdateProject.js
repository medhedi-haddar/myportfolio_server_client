import React, {} from 'react'

import { useSelector, useDispatch } from 'react-redux';
import FormProject from './Form/FormProject';
import Loader from '../../../Loader/Loader'

const UpdateProject = () => { 
    const projects = useSelector((state) => state.projects);
    return ( !Object.keys(projects).length ? <Loader/> : ( <FormProject project={projects}/> ) )
}

export default UpdateProject
