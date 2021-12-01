import React,{ useEffect } from 'react'
import { Button,Container,Row } from 'react-bootstrap'; 
import { useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { FiPlusCircle } from "react-icons/fi";
import { getprojects} from '../../actions/projects'
import Project from './Project';

const Projects = () => {

    const location = useLocation();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getprojects());
     }, [location])
     
    return (
        <div className="contentBody"> 
           
            <div className="component_title ">
                <Container fluid className="d-flex justify-content-between align-items-center"> 
                    <h2>Projects</h2>             
                    <Button className="d-flex align-items-center" variant="secondary" href="/admin/add_project"><FiPlusCircle className="me-2"/> Project</Button>
                </Container>
            </div>
            <Container fluid>
                <Row> 
                    <Project />     
                </Row>
            </Container>
        </div>
    )
}

export default Projects
