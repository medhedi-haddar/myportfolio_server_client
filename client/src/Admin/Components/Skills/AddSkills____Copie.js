import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import {Container, Row, Col, Form,Button} from 'react-bootstrap';
import axios from 'axios';

import { EditorState, convertToRaw, ContentState,convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { DragDropContext, Droppable,ListGrid,List } from 'react-beautiful-dnd';

const AddSkill = ({dataParsed}) => {
    const navigate  = useNavigate();

    const [skills, setSkills] = useState([]);

    const [data, setData] = useState({
        title : '',
        description :'',
    });
    const [skillItem, setSkillItem] = useState({
        name : '',
        level :0,
        color : '#AAA'
    });
    const handleSkill = (e) =>{
        e.preventDefault();
        setSkillItem({
            ...skillItem,
            [e.target.name] : e.target.value
        });
    }
    const addSkill = (e) =>{
        e.preventDefault();
        setSkills(skills => [...skills, skillItem]);
    }


    // editDescription -------------------------------------------------
    let editorState = EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML('')
        ));
    const [description, setDescription] = useState(editorState);

    const onEditorStateChange = (editorState) => {
        setDescription(editorState);
      }
    // -----------------------------------------------------------------


    const onChangeValue = (e) => {
        e.preventDefault();
        setData({
          ...data,
          [e.target.name]:e.target.value
        });
      } 

    const handleSubmit = () => {

    }


    return (
        <div>
            <div className="component_title">
                <h2>Add skills</h2>
            </div>
            <Container>
                <Row>
                    <Col md={6}>
                    <h4>Skills Text</h4>
                    <Form onSubmit={handleSubmit}>
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
                            <textarea style={{display:'none'}} ref={(val) => data.description = val } disabled  value={draftToHtml(convertToRaw(description.getCurrentContent())) } />
                            </Form.Group>
                            
                    </Form>        
                    </Col>

                <Col md={6}>
                    <h4>Skills Items</h4>
                    <div>
                        <Form >  
                            <Row> 
                                <Col md={6}>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="texte" placeholder="skill" name="name" value={skillItem.name} onChange={handleSkill} />
                                </Col>
                                <Col md={2}>
                                    <Form.Label>Level</Form.Label>
                                    <Form.Control type="number" placeholder="0" name="level" value={skillItem.level} onChange={handleSkill} />
                                </Col>
                                <Col md={2}>
                                    <Form.Label>Color</Form.Label>
                                    <Form.Control type="color" id="exampleColorInput" name="color" defaultValue={skillItem.color} title="Choose your color" onChange={handleSkill} />
                                </Col>
                                <Col md={2} className="d-flex align-items-end">
                                    
                                    <Button variant="success" onClick={addSkill}>+</Button>
                                </Col>
                            </Row>
                        </Form>  
                    </div>
                    {DragList()}
                    <ul className="characters" ref={skills}>
                        {skills.map((item, index) =>{
                                <li>{item.name} {item.color}</li>
                                
                            })}
                    </ul>
                 
                </Col>
                </Row>
            </Container>
        </div>
    )
}

export default AddSkill
