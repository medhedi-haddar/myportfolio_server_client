
import React, { Component } from 'react'
import { BrowserRouter as Router, Routes,Switch, Route} from "react-router-dom";
import NavTop from './Components/SideNav/NavTop';
import SideNav from './Components/SideNav/SideNav';
import {Container} from 'react-bootstrap'
import './Styles/Styles.css'
import AboutMe from './Components/AboutMe/AboutMe';
import UpdateAboutMe from './Components/AboutMe/UpdateAboutMe';
import Skills from './Components/Skills/Skills';
import Projects from './Components/Projects/Projects';
// import Gallery from './Components/Gallery/Gallery';
// import Messages from './Components/Messages/Messages';


const Admin = ({requestedComponent})=>{

   
    function renderSwitch(requestedComponent) {

        switch (requestedComponent) {
            case 'about_me':
                 return <AboutMe />
            break;
            case 'about_me_up':
                 return <UpdateAboutMe />
            break;
            case 'skills':
                 return <Skills />
            break;
            case 'projects':
                 return <Projects />
            break;
            // case 'gallery':
            //      return <Gallery />
            // break;
            // case 'messages':
            //      return <Messages />
            // break;

            default:
            break;
        }
    }

        return (
            <div className="body"> 
                <SideNav active_link={requestedComponent}/>
                <div className="d-flex flex-column content"> 
                        <NavTop/>
                    <div className="contentBody">
                        <div className="component"> 
                        {renderSwitch(requestedComponent)}
                        </div>
                    </div>
                </div>
            </div>
        )
    
}

export default Admin;