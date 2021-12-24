import React,{ useState} from 'react';
import { Container,Button,Modal} from 'react-bootstrap';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import { FiTrash2,FiEdit,FiPlusCircle } from "react-icons/fi";
import 'react-vertical-timeline-component/style.min.css';
import { deleteEducation } from '../../../actions/educations';
import { useSelector,useDispatch } from 'react-redux';
import moment from 'moment';
import { FaMapMarkerAlt, FaBook, FaUniversity } from "react-icons/fa";

const Educations = () => {

    const dispatch = useDispatch();
    const educations = useSelector((state) => state.educations);

    const [modal,setModal] = useState({ show : false, id : null ,diplome: null});

    const handleDelete = (id,diplome) =>{
        setModal({show : true, id : id,diplome : diplome})
    }
    
    const handleDeleteTrue = async () =>{
        await dispatch(deleteEducation(modal.id));
        handleClose(); 
    }

    const handleClose = () =>{ setModal({show : false, id : null,diplome :null}) }

    return (
        <>
         <div className="component_title">
                <Container fluid className="d-flex justify-content-between align-items-center"> <h2>Educations</h2> 
                <Button  className="d-flex align-items-center" variant="secondary" href={`/admin/add_education`}><FiPlusCircle className="me-2"/> Education</Button>
                </Container>
            </div>
        <div className="component_body"> 
            <Modal show={modal.show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Education</Modal.Title>
                </Modal.Header>
                <Modal.Body>Would you really delete <b>{modal.diplome}</b> education ? </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>No</Button>
                    <Button variant="danger" onClick={()=> handleDeleteTrue()}>Yes</Button>
                </Modal.Footer>
            </Modal>
            <Container fluid> 
                {educations &&
                    // educations.map((education,index)=>(
                        <VerticalTimeline lineColor="#f5f5f5">
                        {educations.map((education,index)=>( 
                            <VerticalTimelineElement key={'education'+index}
                            className="vertical-timeline-element--work"
                            contentStyle={{ background: 'rgb(245 245 245)', color: 'rgb(5 54 77)' }}
                            contentArrowStyle={{ borderRight: '7px solid  rgb(245 245 245)' }}
                            date={moment(Number(education.obtainedDate)).format('MMMM YYYY')}
                            iconStyle={{ background: 'rgb(245 245 245)', color: 'rgb(5 54 77)' }} 
                            icon={<FaBook />} 
                            > 
                            <div className="d-flex justify-content-end pb-3">
                                <Button className=" btn-sm m-1 d-flex align-items-center justify-content-center"  variant="outline-secondary" href={`/admin/up_education/${education._id}`}><FiEdit className="me-2" size={14}/> Edit</Button>
                                <Button className=" btn-sm m-1 d-flex align-items-center justify-content-center"variant="danger"onClick={() => handleDelete(education._id,education.diplome)}

                                ><FiTrash2 className="me-2" size={14}/> delete</Button>
                            </div>

                            <h3 className="vertical-timeline-element-title">{education.diplome}</h3>
                            <div className="d-flex row">

                            <small className="vertical-timeline-element-subtitle mb-2"><FaUniversity className="me-2"/>{education.university}
                            </small>
                            <small> <FaMapMarkerAlt className="me-2"/>{education.country}</small>
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: education.description}}/>
                           
                        </VerticalTimelineElement> 
                          
                        ))}
                        </VerticalTimeline>
                    // ))
                }
            </Container>    
        </div>
        </>
    )
}

export default Educations
