
import React,{ useEffect, useState} from 'react'
import { useParams, useNavigate,useLocation } from "react-router-dom";
import NavTop from './Components/SideNav/NavTop';
import SideNav from './Components/SideNav/SideNav';
import './Styles/Styles.css'
import AboutMe from './Components/AboutMe/AboutMe';
import UpdateAboutMe from './Components/AboutMe/UpdateAboutMe';
import Skills from './Components/Skills/Skills';
import Projects from './Components/Projects/Projects';
import AddProject from './Components/Projects/AddProject';
import UpdateProject from './Components/Projects/UpdateProject';
import Experience from './Components/Experience/Experience';
import AddExperience from './Components/Experience/AddExperience';
import UpdateExperience from './Components/Experience/UpdateExperience';
import useProjects from '../Hooks/useProjects';
import { useDispatch } from 'react-redux';
import { getOneProject} from './actions/projects'

const Admin = ({requestedComponent})=>{

    const dispatch = useDispatch();

    const [user , setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const navigate = useNavigate(); 
    const location = useLocation();
    
    const params = useParams();
    let projectData = null;
    const {project,isLoading} = useProjects(params.id);
    if(params.id && requestedComponent === 'up_project'){
        projectData = project;
    }
   
    const [classContentDiv, setClassContentDiv] = useState('');
    const [classSideNav, setClassSideNav] = useState('');

    const toggleSideNav = () =>{
        classContentDiv === '' ? setClassContentDiv('stretched') : setClassContentDiv('');
        classSideNav === '' ? setClassSideNav('minimized') : setClassSideNav('');
    }
    
    useEffect(() => {
        // window.addEventListener("resize", () => {
            const ismobile = window.innerWidth < 768;
            console.log( window.innerWidth);
            if (ismobile ) {
                setClassContentDiv('stretched');
                setClassSideNav('minimized');
            }
            else{
                setClassContentDiv('');
                setClassSideNav('');
            }
            
        // }, false);
    }, [])

    useEffect(() => {
        if(params.id){
            dispatch(getOneProject(params.id));
        }
        const token  = user?.token;
        
        const storage = JSON.parse(localStorage.getItem('profile'))
        setUser(storage)
        if(!user || !storage){
            navigate('/admin/login')
        }
    }, [location])

    function renderSwitch(requestedComponent) {

        switch (requestedComponent) {
            case 'about_me':
                 return <AboutMe />
            break;
            // case 'about_me_up':
            //      return <UpdateAboutMe />
            // break;
            case 'skills':
                 return <Skills />
            break;
            case 'projects':
                 return <Projects />
            break;
            case 'add_project':
                 return <AddProject />
            break;
            case 'up_project':
                 return <UpdateProject />
                 return Object.keys(projectData).length > 0 ? <UpdateProject  params={params} project={project}/> : ""
            break;
            case 'experience':
                 return <Experience />
            break;
            case 'add_experience':
                 return <AddExperience />
            break;
            case 'up_experience':
                 return <UpdateExperience />
            break;
            // case 'login':
            //      return <Login />
            // break;

            default:
            break;
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