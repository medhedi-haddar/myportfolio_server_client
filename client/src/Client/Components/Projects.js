import React,{ useState } from 'react'
import { Card,Button,Container,Row,Col,Modal } from 'react-bootstrap'; 
import { FaLink,FaGithub,FaExpandArrowsAlt } from "react-icons/fa";

import { useSelector } from 'react-redux';

const Projects = () => {

    const projects = useSelector((state) => state.projects);

    const [modal,setModal] = useState({ show : false, 
            title : '', 
            cover : '',
            description : ''
        });

    const handleClose = () =>{ setModal({show : false,   title : '', cover : '',description : ''}) }
    const handleReadMore = (index) =>{ 
       
        setModal({ 
            show : true, 
            title : projects[index].title, 
            cover : projects[index].cover.url,
            description : projects[index].description
        })
    }

    return (
        <section id="Projects" className="section">
            <Modal show={modal.show} onHide={handleClose}
                fullscreen={true}  
                style={{ zIndex: "10000"}} >
                <Modal.Header closeButton>
                    <Modal.Title>{modal.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Col>
                            <img src={modal.cover} style={{width: '100%'}}/>
                        </Col>
                        <Col>
                            <div className="modal-project-description" dangerouslySetInnerHTML={{ __html: modal.description}}/>
                        </Col>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                        Close
                        </Button>
                    </Modal.Footer>
            </Modal>
            <Container>
            <h1 className="mb-3 text-uppercase"><span className="text-secondary"></span>Projects</h1>
                <Row>
                    {(!projects.length) ? '' 
                    :
                        projects.map((project,index) => (
                            <Col md={4} key={`project`+index}>
                                {}
                                <Card style={{marginBottom : "10px"}} > 
                                    <div className="card_image" onClick={()=>{handleReadMore(index)}}> 
                                        <div className="card_image_hover d-flex justify-content-center align-items-center">
                                            <div className="card_image_hover_button">
                                                <FaExpandArrowsAlt color="#aaa" size={25} />
                                            </div>
                                        </div>
                                        <Card.Img variant="top" src={project.cover.url}  />
                                    </div>
                                    <Card.Body>
                                    <Card.Title>{project.title}</Card.Title>
                                    
                                    <div className="d-flex row justify-conetent-between p-2">
                                    <Button className="my-1 d-flex align-items-center justify-content-center" target="_blank" variant="outline-secondary"
                                    onClick={()=>{handleReadMore(index)}}
                                    ><FaExpandArrowsAlt className="me-2" size={14} />Read more</Button>
                                    <Button className="my-1 d-flex align-items-center justify-content-center" target="_blank" href={project.weblink} target="_blank" variant="primary"><FaLink className="me-2" size={14} />Website</Button>
                                    <Button className="my-1 d-flex align-items-center justify-content-center" target="_blank"  href={project.gitlink} target="_blank" variant="secondary"> <FaGithub className="me-2" size={14} />GitHub</Button>
                                    </div>
                                    </Card.Body>
                                </Card>
                            </Col> 
                        )) 
                    }
                </Row>
            </Container>
            
        </section>
    )
}

export default Projects
