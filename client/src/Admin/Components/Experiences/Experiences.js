import React,{ useEffect, useState} from 'react';
import { Container,Button,Modal} from 'react-bootstrap';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FiTrash2,FiEdit,FiPlusCircle } from "react-icons/fi";
import { MdEngineering } from "react-icons/md";
import { deleteExperience } from '../../../actions/experiences';
import { useSelector} from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'

const Experiences = () => {

    const dispatch = useDispatch();
    const experiences = useSelector((state) => state.experiences);
    
    const [modal,setModal] = useState({ show : false, id : null ,name: null});

    const handleDelete = (id,name) =>{
        setModal({show : true, id : id,name : name})
    }
    
    const handleDeleteTrue = async () =>{
        await dispatch(deleteExperience(modal.id));
        handleClose();
    }
   
    const handleClose = () =>{ setModal({show : false, id : null,name :null}) }
    return (
        <>
         <div className="component_title">
            <Container fluid className="d-flex justify-content-between align-items-center"> <h2>Experience</h2> 
            <Button  className="d-flex align-items-center" variant="secondary" href="/admin/add_experience"><FiPlusCircle className="me-2"/> Experience</Button>
            </Container>
        </div>
        <div className="component_body"> 
            <Modal show={modal.show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Education</Modal.Title>
                </Modal.Header>
                <Modal.Body>Would you really delete <b>{modal.name}</b> Experience ? </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>No</Button>
                    <Button variant="danger" onClick={()=> handleDeleteTrue()}>Yes</Button>
                </Modal.Footer>
            </Modal>
            <Container fluid> 
                {experiences &&
                    // experiences.map((Experience,index)=>(
                        <VerticalTimeline lineColor="#f5f5f5">
                        {experiences.map((experience,index)=>(
                            
                            <VerticalTimelineElement key={'Experience'+index}
                            id={'Experience'+index}
                            className="vertical-timeline-element--work"
                            contentStyle={{ background: 'rgb(245 245 245)', color: 'rgb(5 54 77)' }}
                            contentArrowStyle={{ borderRight: '7px solid  rgb(245 245 245)' }}
                            date={moment(Number(experience.beginDate)).format('MMMM YYYY')+` - `+moment(Number(experience.endDate)).format('MMMM YYYY')}
                            iconStyle={{ background: 'rgb(245 245 245)', color: 'rgb(5 54 77)' }}
                            
                            icon={<MdEngineering />}
                          >
                            <div className="d-flex justify-content-end pb-3">
                                <Button className=" btn-sm m-1 d-flex align-items-center justify-content-center"  variant="outline-secondary" href={`/admin/up_experience/${experience._id}`}><FiEdit className="me-2" size={14}/> Edit</Button>
                                <Button className=" btn-sm m-1 d-flex align-items-center justify-content-center"variant="danger"onClick={() => handleDelete(experience._id,experience.title)}

                                ><FiTrash2 className="me-2" size={14}/> delete</Button>
                            </div>
                            <h3 className="vertical-timeline-element-title">{experience.title}</h3>
                            <h4 className="vertical-timeline-element-subtitle">{experience.entreprise}</h4>
                            <div dangerouslySetInnerHTML={{ __html: experience.description}}/>
                            {experience.tags &&  
                                <div className="pt-3 tags align-items-center">
                                    {experience.tags.map((tag,index2)=>(
                                        <span key={'tag'+index2} className="tag p-2 ps-3 pe-3"><span>{tag}</span></span>
                                    ))}
                                </div>
                            }
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

export default Experiences
