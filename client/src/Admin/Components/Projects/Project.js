import React,{useState } from 'react'
import { Card,Button,Col, Modal } from 'react-bootstrap'; 
import { FiExternalLink,FiEdit,FiGithub,FiTrash2 } from "react-icons/fi";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Loader from '../../../Loader/Loader'
import {deleteProject} from '../../actions/projects'

const Project = () => {

    const projects = useSelector((state) => state.projects);

    const dispatch = useDispatch();

    const handleClose = () =>{ setModal({show : false, id : null,name :null}) }

    const [modal,setModal] = useState({ show : false, id : null ,name: null});

    const handleDelete = (id,name) =>{
        console.log('delete')
        setModal({show : true, id : id,name : name})
    }

    const handleDeleteTrue = async () =>{
        dispatch(deleteProject(modal.id));
        handleClose();
    }

    return (
            <>
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
            {!projects.length ? <Loader/>: (
                projects.map((project,index) => (
                    <Col md={6} lg={4} xxl={3} key={`project`+project._id}>

                    <Card style={{marginBottom : "10px"}} > 
                        <div className="card_image"> 
                            <Button className="" variant="danger" onClick={() => handleDelete(project._id,project.title)}><FiTrash2/></Button>
                            <Card.Img variant="top" src={project.cover.url} />
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
                        <Button className="m-1 d-flex align-items-center justify-content-center" href={project.gitlink} target="_blank" variant="secondary"> <FiGithub className="me-2" size={14} />Git link</Button>
                        </div>
                        </Card.Body>
                    </Card>
                </Col> 
                )) 
            )}
           
            </>
    )
}

export default Project
