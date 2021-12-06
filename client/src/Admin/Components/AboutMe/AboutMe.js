import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { FiEdit } from "react-icons/fi";

import { useSelector } from 'react-redux';

import Loader from '../../../Loader/Loader';
import AboutMeContent from './AboutMeContent';

const AboutMe = () => {

    const aboutMe = useSelector((state) => state.aboutMe);

    return ( 
        <>
         <div className="component_title">
            <Container fluid className="d-flex justify-content-between"> 
                <h2>About Me</h2>             
                <Button className="d-flex align-items-center " variant="secondary" href="/admin/up_aboutme"><FiEdit className="me-2"/>Edit About me</Button>
            </Container>
        </div>
        {typeof aboutMe === 'object' && 
        !Object.keys(aboutMe).length  ?  <Loader/> :
            <div className="component_body"> 
           
            <div>
                <Container fluid>
                    <AboutMeContent aboutMeData={aboutMe[0]}/>  
                </Container> 
            </div>
        </div> 
        
    }
        </>
    )
}

export default AboutMe
