import React, { useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { updateAboutMe } from '../../../../actions/aboutMe'
import { FiSave } from "react-icons/fi";
import { FiWatch } from "react-icons/fi";
// WYSIWYG DEPEDENCIES
import { EditorState, convertToRaw, ContentState,convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const UpdateAboutMe = ({aboutMe}) => {

    const navigate  = useNavigate();
    const dispatch = useDispatch();

    const [data, setData] = useState({
            _id :           aboutMe?._id ?  aboutMe._id : '',
            lastName :      aboutMe?.lastName ? aboutMe.lastName : '',
            firstName :     aboutMe?.firstName ? aboutMe.firstName : '',
            description :   aboutMe?.description ? aboutMe.description : '',
            updateDate :    aboutMe?.update_date ? moment(Number(aboutMe.update_date)).format(`DD MMMM YYYY  HH:ss`): '',
            git_link :      aboutMe?.git_link ? aboutMe.git_link : '',
            profileImage :  aboutMe?.profileImage.url ? aboutMe.profileImage.url : '',
            cv :            aboutMe?.cv.url ? aboutMe.cv.url : ''
    });
    const [previewProfileImage,setPreviewProfileImage] = useState(data?.profileImage);

    const handleProfileImage = (e) => {
        e.preventDefault();
        if(e.target.files[0]){
        setData({
            ...data,
            [e.target.name] : e.target.files[0]
        });
        setPreviewProfileImage(URL.createObjectURL(e.target.files[0]));
        }else{
            setData({...data, profileImage : aboutMe?.profileImage.url })
            setPreviewProfileImage(aboutMe?.profileImage.url)
        }
    }

    const handleFileChange = (e) => {
        e.preventDefault();
        setData({
            ...data,
            [e.target.name] : e.target.files[0]
        });
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
          convertFromHTML(aboutMe?.description ? aboutMe?.description : '')
        ));
    const [description, setDescription] = useState(editorState);

    const onEditorStateChange = (editorState) => {
        setDescription(editorState);
      }
    // ----------------------------------------------------------------
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('_id' ,             data._id);
        formData.append('lastName' ,        data.lastName);
        formData.append('firstName' ,       data.firstName);
        formData.append('git_link' ,        data.git_link);
        formData.append('description' ,     data.description.value);
        formData.append('profileImage' ,    data.profileImage);
        formData.append('cv' ,              data.cv);

        const config = { header: { "Content-Type": "multipart/form-data" } };
        dispatch(updateAboutMe(formData,config,navigate))
    }
    return (
            <Form onSubmit={handleSubmit}>
            <div className="component_title">
                <Container fluid>
                    <h2 className="d-flex align-items-center">Update About Me</h2>
                </Container>
            </div>
            <div className="component_body"> 
                <Container >
                    <Row>
                        <Col md={8}>
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
                            <textarea style={{display:'none'}} ref={(val) => data.description = val } disabled  value={draftToHtml(convertToRaw(description.getCurrentContent())) } />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Github </Form.Label>
                                <Form.Control name="git_link" type="text" placeholder="Title" value={data.git_link} onChange={onChangeValue} />
                            </Form.Group>
                        
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Profile Picture</Form.Label>
                                <Form.Control type="file" name="profileImage" onChange={handleProfileImage} accept=".png, .jpg, .jpeg, .svg, .gif"/>
                            </Form.Group>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Cv</Form.Label>
                                <Form.Control type="file" name="cv" onChange={handleFileChange} accept=".docx, .doc, .pdf"/>
                            </Form.Group>
                        </Col> 
                        <Col md={4} className="text-center">
                           {previewProfileImage && 
                                <img src={previewProfileImage} style={{width : "100%"}}/>
                            }
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="sticky-footer bg-light  ">
                <Container className="d-flex justify-content-end">
                    <Button className="d-flex align-items-center" variant="secondary" type="submit" >Save<FiSave className="ms-3"/></Button>
                </Container>
            </div>
        </Form>
        
    )
}

export default UpdateAboutMe
