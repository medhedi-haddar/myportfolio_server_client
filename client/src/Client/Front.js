import React, { useEffect } from 'react'
import { getAboutMe } from '../actions/aboutMe';
import { getSkills } from '../actions/skills';
import { getprojects } from '../actions/projects';
import { getExperiences } from '../actions/experiences';
import { getEducations } from '../actions/educations';
import './Styles/Style.css';
// Disptacher
import { useDispatch } from 'react-redux';

import NavBarMenu from './Components/NavBarMenu';
import AboutMe from './Components/AboutMe';
import Experience from './Components/Experience';
import Skills from './Components/Skills';
import Projects from './Components/Projects';
import Educations from './Components/Educations';
import Footer from './Components/Footer';

const Front = () => {

    const dispatch  = useDispatch();

    useEffect(() => {
        dispatch(getAboutMe());
        dispatch(getSkills());
        dispatch(getprojects());
        dispatch(getExperiences());
        dispatch(getEducations());
    },[])

    return (
        <div id="under-root">
            <NavBarMenu/>
            <AboutMe/>
            <Skills/>
            <Projects/>
            <Experience/>
            <Educations/>
            <Footer/>
        </div>
    )
}

export default Front;
