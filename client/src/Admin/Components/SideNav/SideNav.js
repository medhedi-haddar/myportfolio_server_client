import React from 'react';
import { MdOutlineContactPage, MdOutlinePhotoLibrary, MdDeveloperMode,MdBubbleChart,MdOutlineMessage, MdEngineering } from "react-icons/md";
import { Link } from 'react-router-dom';


const SideNav = ({active_link,classSideNav}) => {
    return (
        <ul className={`sideNav ${classSideNav}`} >
            <li className="HomeLink">
                <Link to={'/admin'} >Admin</Link>  
            </li>
            <li className={`sideNavItem ${["about_me", "about_me_up"].indexOf(active_link) >= 0 ? "active" : ""}`}>
                <Link to={'/admin/about_me'} > <span>About Me</span> <MdOutlineContactPage className="sideNaveItemIcon"/></Link>     
            </li> 
            <li className={`sideNavItem ${active_link === 'skills' ? 'active' : ''}`}>
                <Link to={'/admin/skills'} > <span>Skills</span><MdBubbleChart className="sideNaveItemIcon"/></Link>     
            </li> 
            <li className={`sideNavItem ${["add_project", "projects", "up_project"].indexOf(active_link) >= 0 ? 'active' : ''}`}>
                <Link to={'/admin/projects'} > <span>Projects</span><MdDeveloperMode className="sideNaveItemIcon"/></Link>     
            </li> 
            <li className={`sideNavItem ${["experience", "add_experience", "up_experience"].indexOf(active_link) >= 0 ? "active" : ""}`}>
                <Link to={'/admin/experience'} > <span>Experience </span><MdEngineering className="sideNaveItemIcon"/></Link>     
            </li> 
            <li className={`sideNavItem ${active_link === 'messages' ? 'active' : ''}`}>
                <Link to={'/admin/messages'} > <span>Messages</span><MdOutlineMessage className="sideNaveItemIcon"/></Link>     
            </li> 
        </ul>
    )
}

export default SideNav;
