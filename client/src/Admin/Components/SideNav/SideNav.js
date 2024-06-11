import React from 'react';
import { MdOutlineContactPage, MdFingerprint, MdDeveloperMode,MdBubbleChart,MdOutlineMenuBook, MdEngineering, MdBurstMode } from "react-icons/md";
import { Link } from 'react-router-dom';


const SideNav = ({active_link,classSideNav}) => {
    return (
        <div>
            <ul className={`sideNav ${classSideNav}`} >
                <li className="HomeLink">
                    <Link to={`/admin`} >Admin</Link>  
                </li>
                <li className={`sideNavItem ${["profile", "edit_profile", ""].indexOf(active_link) != -1 ? "active" : ""}`}>
                    <Link to={`/admin`} > <span>Profile</span> <MdFingerprint className="sideNaveItemIcon"/></Link>     
                </li> 
                <li className={`sideNavItem ${["about_me", "up_aboutme"].indexOf(active_link) != -1 ? "active" : ""}`}>
                    <Link to={`/admin/about_me`} > <span>About Me</span> <MdOutlineContactPage className="sideNaveItemIcon"/></Link>     
                </li> 
                <li className={`sideNavItem ${["skills" , "up_skills"].indexOf(active_link) != -1 ? 'active' : ''}`}>
                    <Link to={`/admin/skills`} > <span>Skills</span><MdBubbleChart className="sideNaveItemIcon"/></Link>     
                </li> 
                <li className={`sideNavItem ${["add_project", "projects", "up_project"].indexOf(active_link) != -1 ? 'active' : ''}`}>
                    <Link to={`/admin/projects`} > <span>Projects</span><MdDeveloperMode className="sideNaveItemIcon"/></Link>     
                </li> 
                <li className={`sideNavItem ${["experiences", "add_experience", "up_experience"].indexOf(active_link) != -1 ? "active" : ""}`}>
                    <Link to={`/admin/experiences`} > <span>Experience </span><MdEngineering className="sideNaveItemIcon"/></Link>     
                </li> 
                <li className={`sideNavItem ${["educations", "add_education", "up_education"].indexOf(active_link) != -1 ? 'active' : ''}`}>
                    <Link to={`/admin/educations`} > <span>Educations</span><MdOutlineMenuBook className="sideNaveItemIcon"/></Link>     
                </li> 
                <li className={`sideNavItem ${["educations", "add_education", "up_education"].indexOf(active_link) != -1 ? 'active' : ''}`}>
                    <Link to={`/admin/medias`} > <span>Gallery</span><MdBurstMode className="sideNaveItemIcon"/></Link>     
                </li> 
            </ul>
        </div>
        
    )
}

export default SideNav;
