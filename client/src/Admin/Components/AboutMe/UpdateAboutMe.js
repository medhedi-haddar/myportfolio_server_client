import React from 'react'

import { useSelector } from 'react-redux';
import UpdateAboutMeForm from './Form/UpdateAboutMeForm';
import Loader from '../../../Loader/Loader'

const UpdateAboutMe = () => { 
    const aboutMe = useSelector((state) => state.aboutMe);
    return ( !Object.keys(aboutMe).length ? <Loader/> : ( <UpdateAboutMeForm aboutMe={aboutMe[0]}/> ) )
}

export default UpdateAboutMe
