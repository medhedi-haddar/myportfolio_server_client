import React from 'react'
import { Button,Container,Row } from 'react-bootstrap'; 
import { FiPlusCircle } from "react-icons/fi";
import Project from './Project';
import { useSelector } from 'react-redux';
import Loader from '../../../Loader/Loader'

const Projects = () => {

    const projects = useSelector((state) => state.projects);

    return (
        <>
         <div className="component_title ">
                <Container fluid className="d-flex justify-content-between align-items-center"> 
                    <h2>Projects</h2>             
                    <Button className="d-flex align-items-center" variant="secondary" href={`${process.env.REACT_APP_ADMIN_BASE_URL}/add_project`}><FiPlusCircle className="me-2"/> Project</Button>
                </Container>
            </div>
        <div className="component_body">    
            <Container fluid>
                <Row> 
                    {!projects.length ? <Loader/>: (
                        typeof projects === "object" ?  ( <Project projects={projects}/>  )
                    
                :(
                    <div>
                        <p className="text-danger">( ! ) No Data maybe it's a serve problem (check your request path)</p>
                        <p>The type of responce is string but it should be an object</p>
                    </div>
                )  
                    )  
                }
                </Row>
            </Container>
        </div>
        </>
    )
}

export default Projects
