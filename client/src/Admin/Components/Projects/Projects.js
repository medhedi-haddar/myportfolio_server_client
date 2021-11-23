import React from 'react'
import  useProjects from '../Hooks/useProjects'
import { Card,Button,Container,Row,Col } from 'react-bootstrap'; 
import { FiExternalLink } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import { FiGithub } from "react-icons/fi";

const Projects = () => {

    const {projects,isLoading} = useProjects();
    if(projects){
        console.log(projects)
    }
    return (
        <div>
             <div className="component_title d-flex justify-content-between align-items-center">
                <h2>Projects</h2>             
                <Button variant="primary" href="/admin/add_project">Add project</Button>
            </div>
           {projects && 
            <Container>
                <Row> 
                    {projects.map((project,index) => (
                        <Col md={4}>
                            <Card style={{marginBottom : "10px"}} key={`project`+index}> 
                                <Card.Img variant="top" src={project.cover} />
                                <Card.Body>
                                <Card.Title>{project.title}</Card.Title>
                                <Card.Text dangerouslySetInnerHTML={{ __html: project.description}}/>
                                <div className="d-flex row justify-conetent-between p-2">

                                <Button className="m-1 d-flex align-items-center justify-content-center" href={`/admin/up_project/${project.id}`} variant="outline-secondary"><FiEdit className="me-2" size={14} />Update</Button>
                                <Button className="m-1 d-flex align-items-center justify-content-center" href={project.weblink} target="_blank" variant="primary"><FiExternalLink className="me-2" size={14} />Web link</Button>
                                <Button className="m-1 d-flex align-items-center justify-content-center" href={project.gitlink} target="_blank" variant="success"> <FiGithub className="me-2" size={14} />Git link</Button>
                                </div>
                                </Card.Body>
                            </Card>
                        </Col> 
                        )) 
                    }
                </Row>
            </Container>
           } 
        </div>
    )
}

export default Projects
