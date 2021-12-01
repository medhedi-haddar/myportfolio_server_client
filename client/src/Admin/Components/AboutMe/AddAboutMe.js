import React, { useState,useEffect } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import axios from 'axios';

import { EditorState, convertToRaw, ContentState,convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const AddAboutMe = ({fetchAboutMeData}) => {

    const navigate  = useNavigate();

    const [data, setData] = useState({
        lastName : '',
        firstName : '',
        description :'',
        updateDate : '',
        git_link : '',
        profileImage : '',
        cv : ''
    });

    const handleFileChange = (e) => {
        e.preventDefault();
        setData({
            ...data,
            [e.target.name] : e.target.files[0]});
    }
    const onChangeValue = (e) => {
        e.preventDefault();
        setData({
          ...data,
          [e.target.name]:e.target.value
        });
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
        formData.append('lastName' , data.lastName);
        formData.append('firstName' , data.firstName);
        formData.append('description' , data.description.value);
        formData.append('git_link' , data.git_link);
        formData.append('profileImage' , data.profileImage);
        formData.append('cv' , data.cv);
        axios.post(
            '/api/add_about_me',
            formData,
            {
            contentType: 'multipart/form-data'
        }).then(()=> {
            console.log("data has send to the server");
            fetchAboutMeData();
            navigate('/admin/about_me');

        })
        .catch((error)=>{
            console.log( "data not sent ", error);
        });
    }

    return (
        <div>
            
            <div className="component_title">
                <h2>Add About Me</h2>
            </div>
            <Container fluid>
                <Row>
                    <Col md={8}>
                    
                        <Form onSubmit={handleSubmit}>
                            <small className="last_update">Last update : {data.updateDate}</small>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control name="lastName" type="text" placeholder="Last Name" value={data.lastName} onChange={onChangeValue} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control name="firstName" type="text" placeholder="First Name" value={data.firstName} onChange={onChangeValue} />
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
                            <textarea style={{display:'block'}} ref={(val) => data.description = val } disabled  value={draftToHtml(convertToRaw(description.getCurrentContent())) } />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Github </Form.Label>
                                <Form.Control name="gitHubLink" type="text" placeholder="Title" value={data.git_link} onChange={onChangeValue} />
                            </Form.Group>
                        
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Photo de profile</Form.Label>
                                <Form.Control type="file" name="profileImage" onChange={handleFileChange} />
                            </Form.Group>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Cv</Form.Label>
                                <Form.Control type="file" name="cv" onChange={handleFileChange} />
                            </Form.Group>
                            <Button variant="success" type="submit">
                                Enregistrer
                            </Button>
                        </Form>
                    </Col>

                    <Col md={4} className="text-center">
                        {data.profileImage &&
                        <img src={data.profileImage} style={{minWidth :"150px" , width: "100%"}} />
                        }
                        {!data.profileImage &&
                            <div className="bg-light p-5 text-center">
                                <h5 className="text-secondary">No Photo</h5>
                            </div>
                        }
                    </Col>
                </Row>
            </Container> 
        </div>
    )
}

export default AddAboutMe
