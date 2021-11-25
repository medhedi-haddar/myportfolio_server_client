import React,{ useState } from 'react'
import  useProjects from '../Hooks/useProjects'
import { Card,Button,Container,Row,Col, Modal } from 'react-bootstrap'; 
import { FiExternalLink,FiEdit,FiGithub,FiTrash2,FiPlusCircle } from "react-icons/fi";
import Loader from '../Loader/Loader';
import {deleteProject} from '../../../apis/Api'

const Projects = () => {

    const {projects,isLoading,fetchProjects} = useProjects();
    const [modal,setModal] = useState({ show : false, id : null ,name: null});

    const handleDelete = (id,name) =>{
        setModal({show : true, id : id,name : name})
    }
    const handleDeleteTrue = async () =>{
            await deleteProject(modal.id);
            handleClose();
            fetchProjects()
    }

    const handleClose = () =>{ setModal({show : false, id : null,name :null}) }


    return (
        <div className="contentBody"> 
            <Modal show={modal.show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete project</Modal.Title>
                </Modal.Header>
                <Modal.Body>Would you really delete <b>{modal.name}</b> project ? </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    No
                    </Button>
                    <Button variant="danger" onClick={()=> handleDeleteTrue()}>
                    Yes
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="component_title ">
                <Container className="d-flex justify-content-between align-items-center"> 
                    <h2>Projects</h2>             
                    <Button variant="primary" href="/admin/add_project"><FiPlusCircle className="me-2"/> Project</Button>
                </Container>
            </div>
            {isLoading && <Loader/> }
            {!isLoading && projects && 
            <Container>
                <Row> 
                    {projects.map((project,index) => (
                        <Col md={4} key={`project`+index}>
                            <Card style={{marginBottom : "10px"}} > 
                                <div className="card_image"> 
                                    <Button className="" variant="danger" onClick={() => handleDelete(project._id,project.title)}><FiTrash2/></Button>
                                    <Card.Img variant="top" src={project.cover} />
                                </div>
                                <Card.Body>
                                <Card.Title>{project.title}</Card.Title>
                                <Card.Body >
                                    <div className="card_description">
                                        <div className="card_description_content" dangerouslySetInnerHTML={{ __html: project.description}}/>
                                    </div>
                                </Card.Body>

                                <div className="d-flex row justify-conetent-between p-2">

                                <Button className="m-1 d-flex align-items-center justify-content-center" href={`/admin/up_project/${project._id}`} variant="outline-secondary"><FiEdit className="me-2" size={14} />Update</Button>
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
