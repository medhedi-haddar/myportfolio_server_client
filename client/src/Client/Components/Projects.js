import React,{ useState } from 'react'
import  useProjects from '../../Admin/Components/Hooks/useProjects'
import { Card,Button,Container,Row,Col,Modal } from 'react-bootstrap'; 
import { FiExternalLink,FiEdit,FiGithub,FiTrash2,FiTablet } from "react-icons/fi";

const Projects = () => {
    const {projects,isLoading,fetchProjects} = useProjects();
    const [fullscreen, setFullscreen] = useState(true);
    const [modal,setModal] = useState({ show : false, 
            title : '', 
            cover : '',
            description : ''
        });
    const [modalContent,setModalContent] = useState({ 
        title : '', cover : '' ,description : ''
    });


    const handleClose = () =>{ setModal({show : false,   title : '', cover : '',description : ''}) }
    const handleReadMore = (index) =>{ 
       
        setModal({ 
            show : true, 
            title : projects[index].title, 
            cover : projects[index].cover,
            description : projects[index].description
        })

    }

    return (
        <section  className="section" id="Projects">
              <Modal show={modal.show} onHide={handleClose}
              fullscreen={fullscreen}  
            style={{ zIndex: "10000"}}
              
               >
                <Modal.Header closeButton>
                    <Modal.Title>{modal.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col>
                        <img src={modal.cover} style={{width: '100%'}}/>
                    </Col>
                    <Col>
                        <div dangerouslySetInnerHTML={{ __html: modal.description}}/>
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
                {projects.map((project,index) => (
                        <Col md={4} key={`project`+index}>
                            {}
                            <Card style={{marginBottom : "10px"}} > 
                                <div className="card_image"> 
                                    <Card.Img variant="top" src={project.cover} />
                                </div>
                                <Card.Body>
                                <Card.Title>{project.title}</Card.Title>
                                
                                <div className="d-flex row justify-conetent-between p-2">
                                <Button className="m-1 d-flex align-items-center justify-content-center" target="_blank" variant="outline-secondary"
                                onClick={()=>{handleReadMore(index)}}
                                ><FiTablet className="me-2" size={14} />Read more</Button>
                                <Button className="m-1 d-flex align-items-center justify-content-center" href={project.weblink} target="_blank" variant="primary"><FiExternalLink className="me-2" size={14} />Web link</Button>
                                <Button className="m-1 d-flex align-items-center justify-content-center" href={project.gitlink} target="_blank" variant="secondary"> <FiGithub className="me-2" size={14} />Git link</Button>
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
