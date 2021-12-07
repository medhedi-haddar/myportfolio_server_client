import React from 'react';
import { MdOutlineContactPage, MdFingerprint, MdDeveloperMode,MdBubbleChart,MdOutlineMenuBook, MdEngineering } from "react-icons/md";
import { Link } from 'react-router-dom';


const SideNav = ({active_link,classSideNav}) => {
    return (
        <ul className={`sideNav ${classSideNav}`} >
            <li className="HomeLink">
                <Link to={`${process.env.REACT_APP_ADMIN_BASE_URL}`} >Admin</Link>  
            </li>
            <li className={`sideNavItem ${["profile", "edit_profile", ""].indexOf(active_link) != -1 ? "active" : ""}`}>
                <Link to={`${process.env.REACT_APP_ADMIN_BASE_URL}`} > <span>Profile</span> <MdFingerprint className="sideNaveItemIcon"/></Link>     
            </li> 
            <li className={`sideNavItem ${["about_me", "up_aboutme"].indexOf(active_link) != -1 ? "active" : ""}`}>
                <Link to={`${process.env.REACT_APP_ADMIN_BASE_URL}/about_me`} > <span>About Me</span> <MdOutlineContactPage className="sideNaveItemIcon"/></Link>     
            </li> 
            <li className={`sideNavItem ${["skills" , "up_skills"].indexOf(active_link) != -1 ? 'active' : ''}`}>
                <Link to={`${process.env.REACT_APP_ADMIN_BASE_URL}/skills`} > <span>Skills</span><MdBubbleChart className="sideNaveItemIcon"/></Link>     
            </li> 
            <li className={`sideNavItem ${["add_project", "projects", "up_project"].indexOf(active_link) != -1 ? 'active' : ''}`}>
                <Link to={`${process.env.REACT_APP_ADMIN_BASE_URL}/projects`} > <span>Projects</span><MdDeveloperMode className="sideNaveItemIcon"/></Link>     
            </li> 
            <li className={`sideNavItem ${["experiences", "add_experience", "up_experience"].indexOf(active_link) != -1 ? "active" : ""}`}>
                <Link to={`${process.env.REACT_APP_ADMIN_BASE_URL}/experiences`} > <span>Experience </span><MdEngineering className="sideNaveItemIcon"/></Link>     
            </li> 
            <li className={`sideNavItem ${["educations", "add_education", "up_education"].indexOf(active_link) != -1 ? 'active' : ''}`}>
                <Link to={`${process.env.REACT_APP_ADMIN_BASE_URL}/educations`} > <span>Educations</span><MdOutlineMenuBook className="sideNaveItemIcon"/></Link>     
            </li> 
        </ul>
    )
}

export default SideNav;
