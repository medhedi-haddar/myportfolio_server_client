import React, { useState,useCallback} from 'react'
import axios from 'axios';
import { Container, Row, Col, Form,Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { EditorState, convertToRaw, ContentState,convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { DragDropContext, Droppable,Draggable } from 'react-beautiful-dnd';
import { MdOutlineArrowBackIosNew } from "react-icons/md";

const UpdateSkill = ({toggleUpdate, skillData, fetchSkill}) => {

    const navigate  = useNavigate();
    const [alert,setAlert] = useState('');
    const [, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);
   
    const [data, setData] = useState({
        _id : skillData._id,
        title : skillData.title,
        description : skillData.description,
    });

    const onChangeValue = (e) => {
        e.preventDefault();
        setData({
          ...data,
          [e.target.name]:e.target.value
        });
      } 

    // SKILLS 
    const [skillItem, setSkillItem] = useState({order : 0,name : '',level : 0,color : '#222f3e'});

    const [skills, setSkills] = useState(skillData.skills);


    const onChangeSkillValue = (e) =>{
        e.preventDefault();
        setSkillItem({
            ...skillItem,
            [e.target.name] : e.target.value
        });
    }

    const addSkill = (e) =>{
        e.preventDefault();
        if(skillItem.name != ''){
            setSkills(skills => [...skills, skillItem]);
            setSkillItem({
                name : '',
                level : 0,
                color : '#222f3e'
            })
            console.log(skillItem);
            forceUpdate();
            console.log(skills);
        }else{
            setAlert(
                <Alert  className="alert" variant="danger" onClick={() => setAlert('')} dismissible>
                    <Alert.Heading>Oops! You got an error!</Alert.Heading>
                    <p> Name Field is  </p>
                </Alert>)
        }
    }
    const remove = (index) =>{
        const new_list = skills.slice();
        new_list.splice(index,1)
        setSkills(new_list);
        forceUpdate();
    }

    const onDragEnd = (params) => {

       const srcI = params.source.index;
       const destI = params.destination?.index;

        if(destI >= 0){
            skills.splice(destI,0,skills.splice(srcI,1)[0]);
        }
    };
    // editDescription -------------------------------------------------
    let editorState = EditorState.createWithContent(
        ContentState.createFromBlockArray(
            convertFromHTML(skillData.description)
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
            skills : skills
        }
        console.log(requestData);
       
        await axios.post('/api/update_skills', requestData ).then((data)=> {
            fetchSkill();
            toggleUpdate(false);
            navigate('/admin/skills');
        }).catch((error)=>{
            console.log( "data not sent ", error);
        });
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}> 
                <div className="component_title d-flex justify-content-between align-items-center">
                    <h2><Button variant="light" className="me-2" onClick={toggleUpdate}><MdOutlineArrowBackIosNew/></Button>Update Skill</h2>
                    <Button variant="primary" type="submit">Save</Button>
                </div>
                {alert}
                <Container className="">
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
                                            <Form.Control type="texte" placeholder="skill" name="name"  value={skillItem.name} onChange={onChangeSkillValue} />
                                        </div>
                                        <div className="me-2" >
                                            <Form.Label>Level</Form.Label>
                                            <Form.Control type="number" placeholder="0" min="0" max="100" name="level" value={skillItem.level} onChange={onChangeSkillValue} />
                                        </div>
                                        <div className="me-2" >
                                            <Form.Label>Color</Form.Label>
                                            <Form.Control type="color" id="exampleColorInput" name="color" value={skillItem.color} title="Choose your color" onChange={onChangeSkillValue} />
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
                                                {skills.map((item,index) => (
                                                    <Draggable key={`skill`+index} draggableId={"draggable-2"+index} index={index}>
                                                        {(provided, snapshot) => (
                                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={{...provided.draggableProps.style, boxShadow : snapshot.isDragging ? "0 0 2rem #ccc" : "none" ,margin:'5px 0',borderRadius : '5px'}} > 
                                                                <div className="text-start mb-4 p-2 position-relative d-flex justify-content-between skill-card">  
                                                                    <span className="order">{index}</span>
                                                                    <div className="skill-bloc">
                                                                        <span className="skill-title">{item.name}</span>
                                                                        <div className="skill">
                                                                            <span className="skill-value text-secondary">{item.level}%</span>
                                                                            <div className="skill-bar " style={{ width: `${item.level}%`, background: `${item.color}` }} 
                                                                            aria-valuenow={`${item.level}`} aria-valuemin={"0"} aria-valuemax={"100"}></div>
                                                                        </div>
                                                                    </div>
                                                                    <Button variant="danger" name={index} onClick={(e)=> remove(e.target.name)}> x </Button>
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
            </Form> 
        </div>
    )
}

export default UpdateSkill
