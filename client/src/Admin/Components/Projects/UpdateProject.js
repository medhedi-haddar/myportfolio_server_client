import React, { useState,useEffect } from 'react'
import { Container, Row, Col, Form,Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { EditorState, convertToRaw, ContentState,convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import useProject from '../Hooks/useProject'
// import TexEditor from '../TextEditor/TextEditor'

const UpdateProject = ({params,project}) => {
    
    const projectId = params.id; 
    // const {project,isLoading} = useProject(projectId);
    
    const navigate  = useNavigate();
    const [alert,setAlert] = useState('');

    const [data, setData] = useState({
        id : project.id,
        title : project.title,
        description :project.description,
        weblink : project.weblink,
        gitlink: project.gitlink,
        cover: project.cover
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
        if(e.target.files[0]){
        setData({
            ...data,
            [e.target.name] : e.target.files[0]
        });
            setPreviewCover(URL.createObjectURL(e.target.files[0]));
        }else{
            setData({...data, cover : project.coverc})
            setPreviewCover(project.cover)
        }
    }


    // editDescription -------------------------------------------------
        let editorState = EditorState.createWithContent(
            ContentState.createFromBlockArray(
                convertFromHTML(project.description)
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

        axios.post(
            '/api/add_project',
            formData,
            {
            contentType: 'multipart/form-data'
        }).then(()=> {
            navigate('/admin/projects');
            console.log("data has send to the server");
        })
        .catch((error)=>{
            console.log( "data not sent ", error);
        });
    }
    const fetchProject =()=>{
        if(project){
            setPreviewCover(project.cover);
        }
    }
    useEffect(() => {
        fetchProject();
    },[project])

    return (
        <div>
            <Form onSubmit={handleSubmit}> 
                <div className="component_title d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <h2 className="me-2">Update Project </h2> <small className="text-secondary"> [ id : {project.id} ]</small>
                    </div>

                    <Button variant="primary" type="submit">Save</Button>
                </div>
           
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
            </Form> 

        </div>
    )
}

export default UpdateProject
