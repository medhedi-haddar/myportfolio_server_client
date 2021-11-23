import React from 'react';
import { MdOutlineContactPage, MdOutlinePhotoLibrary, MdDeveloperMode,MdBubbleChart,MdOutlineMessage } from "react-icons/md";
import { Link } from 'react-router-dom';


const SideNav = ({active_link}) => {
    console.log( );
    return (
        <ul className="sideNav">
            <li className="HomeLink">
                <Link to={'/admin'} >Admin</Link>  
            </li>
            <li className={`sideNavItem ${["about_me", "about_me_up"].indexOf(active_link) >= 0 ? "active" : ""}`}>
                <Link to={'/admin/about_me'} > <span>About Me</span> <MdOutlineContactPage/></Link>     
            </li> 
            <li className={`sideNavItem ${active_link === 'skills' ? 'active' : ''}`}>
                <Link to={'/admin/skills'} > <span>Skills</span><MdBubbleChart/></Link>     
            </li> 
            <li className={`sideNavItem ${["add_project", "projects", "up_project"].indexOf(active_link) >= 0 ? 'active' : ''}`}>
                <Link to={'/admin/projects'} > <span>Projects</span><MdDeveloperMode/></Link>     
            </li> 
            <li className={`sideNavItem ${active_link === 'gallery' ? 'active' : ''}`}>
                <Link to={'/admin/gallery'} > <span>Gallery Photo</span><MdOutlinePhotoLibrary/></Link>     
            </li> 
            <li className={`sideNavItem ${active_link === 'messages' ? 'active' : ''}`}>
                <Link to={'/admin/messages'} > <span>Messages</span><MdOutlineMessage/></Link>     
            </li> 
        </ul>
    )
}

export default SideNav;
