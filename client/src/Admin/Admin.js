
import React,{ useEffect, useState} from 'react'
import { useParams, useNavigate,useLocation } from "react-router-dom";
// Navigation Componenets
import NavTop from './Components/SideNav/NavTop';
import SideNav from './Components/SideNav/SideNav';
import './Styles/Styles.css'
// AboutMe Componenet
import AboutMe from './Components/AboutMe/AboutMe';
import UpdateAboutMe from './Components/AboutMe/UpdateAboutMe';
// Profile Componenet
import Profile from './Components/Profile/Profile'
import EditProfile from './Components/Profile/EditProfile'
// Skills Componenets
import Skills from './Components/Skills/Skills';
import UpdateSkills from './Components/Skills/UpdateSkills';
// Projects Componenets
import Projects from './Components/Projects/Projects';
import AddProject from './Components/Projects/AddProject';
import UpdateProject from './Components/Projects/UpdateProject';
// Experiences Componenets
import Experiences from './Components/Experiences/Experiences';
import AddExperience from './Components/Experiences/AddExperience';
import UpdateExperience from './Components/Experiences/UpdateExperience';
// Educations Componenets
import Educations from './Components/Educations/Educations';
import AddEducation from './Components/Educations/AddEducation';
import UpdateEducation from './Components/Educations/UpdateEducation';
// Disptacher
import { useDispatch } from 'react-redux';
// Reducers
import { getprojects} from '../actions/projects'
import { getExperiences} from '../actions/experiences'
import { getEducations} from '../actions/educations'
import { getAboutMe} from '../actions/aboutMe'
import { getSkills} from '../actions/skills'

import PageNotFound from '../PageNotFound';

const Admin = ({requestedComponent})=>{

    const dispatch  = useDispatch();
    const navigate  = useNavigate(); 
    const location  = useLocation();
    const params    = useParams();

    const [user , setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const [classContentDiv, setClassContentDiv] = useState('');
    const [classSideNav, setClassSideNav] = useState('');

    const toggleSideNav = () =>{
        classContentDiv === '' ? setClassContentDiv('stretched') : setClassContentDiv('');
        classSideNav === '' ? setClassSideNav('minimized') : setClassSideNav('');
    }
    
    useEffect(() => {
        document.title="Admin";
        const ismobile = window.innerWidth <= 768;
        
        if (ismobile ) {
            setClassContentDiv('stretched');
            setClassSideNav('minimized');
        }
        else{
            setClassContentDiv('');
            setClassSideNav('');
        }  
    }, [])

    useEffect(() => { 
        const storage = JSON.parse(localStorage.getItem('profile'))
        setUser(storage)
        if(!user || !storage){
            navigate(`${process.env.REACT_APP_ADMIN_BASE_URL}/login`)
        }else{
            dispatch(getAboutMe());
            dispatch(getSkills());
            dispatch(getprojects());
            dispatch(getExperiences());
            dispatch(getEducations());
        }
    }, [location])

    function renderSwitch(requestedComponent) {

        switch (requestedComponent) {
            case 'about_me':
                 return <AboutMe />
            break;
            case 'up_aboutme':
                 return <UpdateAboutMe />
            break;
            case 'skills':
                return <Skills />
            break;
            case 'up_skills':
                return <UpdateSkills />
            break;
            case 'projects':
                return <Projects />
            break;
            case 'add_project':
                return <AddProject />
            break;
            case 'up_project':
                if(params.id) return <UpdateProject id={params.id}/>
            break;
            case 'experiences':
                return <Experiences />
            break;
            case 'add_experience':
                return <AddExperience />
            break;
            case 'up_experience':
                if(params.id_exp) return <UpdateExperience id={params.id_exp} /> 
            break;
            case 'educations':
                return <Educations/>
            break;
            case 'add_education':
                return <AddEducation />
            break;
            case 'up_education':
                if(params.id_edu) return <UpdateEducation id={params.id_edu} /> 
            break;
            case '':
                return <Profile/>
            break;
            case 'edit_profile':
                return <EditProfile/>
            break;
            case 'medias':
                return <EditProfile/>
            break;
            case "notFound" :
                return <PageNotFound/>
            break
        }
    }
  
    return (
        <div className="body"> 
            
            <SideNav active_link={requestedComponent} classSideNav={classSideNav}/>
            <div className={`d-flex flex-column content ${classContentDiv}`} > 
            <NavTop user={user} toggleSideNav={toggleSideNav}/>
                <div className="component"> 
                    {renderSwitch(requestedComponent)}
                </div> 
            </div>
        </div>
    )
}

export default Admin;