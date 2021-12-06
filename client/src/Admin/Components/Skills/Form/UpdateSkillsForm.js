import React, { useState } from 'react'
import { Container, Row, Col, Form,Button, Alert, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { EditorState, convertToRaw, ContentState,convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { DragDropContext, Droppable,Draggable } from 'react-beautiful-dnd';
import { updateSkills } from '../../../../actions/skills';
import { useDispatch } from 'react-redux'
import { FiSave, FiEdit2, FiX } from "react-icons/fi";

const UpdateSkillsForm = ({skills}) => {

    const navigate  = useNavigate();
    const dispatch = useDispatch();
    const [alert,setAlert] = useState('');
    const [data, setData] = useState({
        _id : skills._id,
        title : skills.title,
        description : skills.description,
    });
    // SKILLS 
    const [skillItemForm, setSkillItemForm] = useState({order : 0,name : '',level : 0,color : '#222f3e'});
    const [skillsItems, setskillsItems] = useState(skills.skills);
    const [modal,setModal] = useState({ show : false, index: null, name : null ,level: null, color: null});

    const onChangeValue = (e) => {
        e.preventDefault();
        setData({
          ...data,
          [e.target.name]:e.target.value
        });
    } 

    const onChangeSkillValue = (e) =>{
        e.preventDefault();
        setSkillItemForm({
            ...skillItemForm,
            [e.target.name] : e.target.value
        });
    }

    const addSkill = (e) =>{
        e.preventDefault();
        if(skillItemForm.name != ''){
            setskillsItems(skillsItems => [...skillsItems, skillItemForm]);
            setSkillItemForm({
                name : '',
                level : 0,
                color : '#222f3e'
            })
            
            // forceUpdate();
        }else{
            setAlert(
                <Alert  className="alert" variant="danger" onClick={() => setAlert('')} dismissible>
                    <Alert.Heading>Oops! You got an error!</Alert.Heading>
                    <p> Name Field is  </p>
                </Alert>)
        }
    }

    const remove = (index) =>{
        const new_list = skillsItems.slice();
        new_list.splice(index,1)
        setskillsItems(new_list);
        // forceUpdate();
    }

    const handleClose = () =>{ setModal({show : false, index: null, name : null,level :null, color : null}) }
    const handleEdit = (index) =>{
        console.log(skillsItems)
       
        setModal({show : true, 
            index : index,
            name : skillsItems[index].name,
            level : skillsItems[index].level,
            color : skillsItems[index].color
        })
    }

    const onChangeModalValue = (e)=>{ 
        e.preventDefault();
        setModal({
            ...modal,
            [e.target.name] : e.target.value
        })
    }

    const applyChanges = (e) => { 
        e.preventDefault();
        const skillsInstance = skillsItems.map((skill,i) => (i != modal.index ? skill : {
            name : modal.name ,
            level: modal.level, 
            color: modal.color
        }));
        setskillsItems(
            skillsInstance
        )
        handleClose();
    }

    const onDragEnd = (params) => {

       const srcI = params.source.index;
       const destI = params.destination?.index;

        if(destI >= 0){
            skillsItems.splice(destI,0,skillsItems.splice(srcI,1)[0]);
        }
    };
    // editDescription -------------------------------------------------
    let editorState = EditorState.createWithContent(
        ContentState.createFromBlockArray(
            convertFromHTML(skills?.description ? skills.description : "")
        ));
    const [description, setDescription] = useState(editorState);

    const onEditorStateChange = (editorState) => {
        setDescription(editorState);
        }
    // -----------------------------------------------------------------

    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestData = {
            _id : data._id,
            title  : data.title,
            description : data.description.value,
            skills : skillsItems
        }
        console.log(requestData);
         await dispatch(updateSkills(requestData,navigate));
    }

    return ( 
        <>
            <Modal show={modal.show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit skill</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex"> 
                        <div className="me-2" >
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="texte" placeholder="skill" name="name"  value={modal.name} onChange={onChangeModalValue} />
                        </div>
                        <div className="me-2" >
                            <Form.Label>Level</Form.Label>
                            <Form.Control type="number" placeholder="0" min="0" max="100" name="level" value={modal.level} onChange={onChangeModalValue} />
                        </div>
                        <div className="me-2" >
                            <Form.Label>Color</Form.Label>
                            <Form.Control type="color" id="exampleColorInput" name="color" value={modal.color} title="Choose your color" onChange={onChangeModalValue} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={applyChanges}>
                    Save
                    </Button>
                </Modal.Footer>
            </Modal>

            <Form className="form" onSubmit={handleSubmit}> 
                <div className="component_body"> 
                    {alert}
                    <Container fluid >
                        <Row>
                            <Col lg={7} md={12} sm={12} className="mb-4">
                                <div className="bloc"> 
                                    <h4 className="bloc-title">Skills Text</h4>
                                    <div className="p-3"> 
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control name="title" type="text" placeholder="Title" value={data.title} onChange={onChangeValue} />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Description</Form.Label> 
                                            <Editor
                                                editorState={description}
                                                toolbarClassName="toolbarClassName"
                                                wrapperClassName="wrapperClassName"
                                                editorClassName="editorClassName"
                                                onEditorStateChange={onEditorStateChange}
                                                />
                                            <textarea style={{display:'none'}} ref={(val) => data.description = val } disabled  value={draftToHtml(convertToRaw(description.getCurrentContent()))} />
                                        </Form.Group> 
                                    </div>
                                </div>      
                            </Col>

                            <Col lg={5} md={12} sm={12}>
                            <div className="bloc"> 
                                <h4 className="bloc-title">Skills Items</h4>
                                <div className="p-3">
                                        
                                        <div className="d-flex"> 
                                            <div className="me-2" >
                                                <Form.Label>Name</Form.Label>
                                                <Form.Control type="texte" placeholder="skill" name="name"  value={skillItemForm.name} onChange={onChangeSkillValue} />
                                            </div>
                                            <div className="me-2" >
                                                <Form.Label>Level</Form.Label>
                                                <Form.Control type="number" placeholder="0" min="0" max="100" name="level" value={skillItemForm.level} onChange={onChangeSkillValue} />
                                            </div>
                                            <div className="me-2" >
                                                <Form.Label>Color</Form.Label>
                                                <Form.Control type="color" id="exampleColorInput" name="color" value={skillItemForm.color} title="Choose your color" onChange={onChangeSkillValue} />
                                            </div>
                                            <div  className="d-flex align-items-end">
                                                
                                                <Button variant="outline-success" onClick={addSkill} style={{lineHeight : "26px"}}>+</Button>
                                            </div>
                                        </div>
                                    
                                </div>
                                <div className="p-3 pt-0">
                                    <DragDropContext onDragEnd={onDragEnd} >
                                        <Droppable  droppableId="droppable-1" type="PERSON">
                                            {(provided, snapshot) => (
                                                <div className="skills-content" ref={provided.innerRef} {...provided.droppableProps} >
                                                    {skillsItems.map((item,index) => (
                                                        <Draggable key={`skill`+index} draggableId={"draggable-2"+index} index={index}>
                                                            {(provided, snapshot) => (
                                                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={{...provided.draggableProps.style, boxShadow : snapshot.isDragging ? "0 0 2rem #ccc" : "none" ,margin:'5px 0',borderRadius : '5px'}} > 
                                                                    <div className="text-start mb-4 p-2 position-relative d-flex justify-content-between align-items-center skill-card">  
                                                                        <div className="skill-bloc">
                                                                            <span className="skill-title">{item.name}</span>
                                                                            <div className="skill">
                                                                                <span className="skill-value text-secondary">{item.level}%</span>
                                                                                <div className="skill-bar " style={{ width: `${item.level}%`, background: `${item.color}` }} 
                                                                                aria-valuenow={`${item.level}`} aria-valuemin={"0"} aria-valuemax={"100"}></div>
                                                                            </div>
                                                                        </div>
                                                                        <Button className="btn-sm" variant="secondary" name={index} onClick={(e)=> handleEdit(index)}> <FiEdit2/> </Button>
                                                                        <Button className="btn-sm" variant="danger" name={index} onClick={(e)=> remove(e.target.name)}> <FiX/> </Button>
                                                                    </div> 
                                                                </div>
                                                            )}
                                                        </Draggable> 
                                                    ))} 
                                                    {provided.placeholder}
                                                </div>
                                            )} 
                                        </Droppable>
                                    </DragDropContext>
                                </div>
                            </div>
                        </Col>
                        </Row>
                    </Container> 
                </div>
                <div className="sticky-footer bg-light  ">
                    <Container fluid className="d-flex justify-content-end">
                        <Button type="submit" className="d-flex align-items-center" variant="primary">Save<FiSave className="ms-3"/></Button>
                    </Container>
                </div>
            </Form>  
        </>
    )
}

export default UpdateSkillsForm
