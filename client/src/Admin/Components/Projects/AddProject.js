import React, { useState,useCallback } from 'react'
import { Container, Row, Col, Form,Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { EditorState, convertToRaw, ContentState,convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { FiSave } from "react-icons/fi";
import { addProject} from '../../actions/projects'
import { useDispatch } from 'react-redux'

const AddProject = () => {
    
    const navigate  = useNavigate();
    const dispatch = useDispatch();
    const [alert,setAlert] = useState('');
    const [data, setData] = useState({
        title : '',
        description :'',
        weblink : '',
        gitlink: '',
        cover: ''
    });
    const [previewCover,setPreviewCover] = useState('');
    const onChangeValue = (e) => {
        e.preventDefault();
        setData({
          ...data,
          [e.target.name]: e.target.value
        });
      } 

    const handleFileChange = (e) => {
        e.preventDefault();
        setData({
            ...data,
            [e.target.name] : e.target.files[0]
        });
        if(e.target.files[0]){
            setPreviewCover(URL.createObjectURL(e.target.files[0]));
        }else{
            setPreviewCover('')
        }
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

      const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title' , data.title);
        formData.append('description' , data.description.value);
        formData.append('weblink' , data.weblink);
        formData.append('gitlink' , data.gitlink);
        formData.append('cover' , data.cover);

        const config =  { 
            header: {
                "Content-Type": "multipart/form-data"
                }
            }
        dispatch(addProject(formData,config,navigate));
    }

    return (
        <Form  onSubmit={handleSubmit}> 
            <div className="contentBody"> 
                <div className="component_title">
                    <Container> <h2>Add Project</h2> </Container>
                </div>
                {alert}
            <Container> 
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

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Web Link</Form.Label>
                                    <Form.Control name="weblink" type="text" placeholder="https://web_link..." value={data.weblink} onChange={onChangeValue} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Git Link</Form.Label>
                                    <Form.Control name="gitlink" type="text" placeholder="https://git_link..." value={data.gitlink} onChange={onChangeValue} />
                                </Form.Group>
                            </div>
                        </div>      
                    </Col>
                    <Col lg={5} md={12} sm={12}>
                        <div className="bloc"> 
                            <h4 className="bloc-title">Cover Image</h4>
                            <div className="p-3">
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Image <small>(.png/.jpeg/.jpg)</small></Form.Label>
                                <Form.Control type="file" name="cover" onChange={handleFileChange} 
                                accept=".png, .jpg, .jpeg"
                                />
                            </Form.Group>
                            {previewCover && 
                                <img src={previewCover} style={{width : "100%"}}/>
                            }
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            </div>
            <div className="sticky-footer bg-light  ">
                <Container className="d-flex justify-content-end">
                    <Button className="d-flex align-items-center" variant="primary" type="submit" >Save<FiSave className="ms-3"/></Button>
                </Container>
            </div>
        </Form> 
       
    )
}

export default AddProject
