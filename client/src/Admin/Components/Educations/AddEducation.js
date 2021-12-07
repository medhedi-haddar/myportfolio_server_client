import React, { useState } from 'react'
import { Container, Row, Col, Form,Button } from 'react-bootstrap';
import { EditorState, convertToRaw, ContentState,convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { FiSave } from "react-icons/fi"; 
import { addEducation } from '../../../actions/educations';
import { FiPlusSquare } from "react-icons/fi";
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';


const AddEducation = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [data, setData] = useState({
        diplome : '',
        university : '',
        country : '',
        description :'',
        obtainedDate : ''
    });

    const onChangeValue = (e) => { 
        e.preventDefault();

        setData({
          ...data,
          [e.target.name]: e.target.value
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = {
            diplome : data.diplome,
            university : data.university,
            country : data.country,
            description : data.description.value,
            obtainedDate : Date.parse(data.obtainedDate),
        };
            
        dispatch(addEducation(formData,navigate));
    }
 
    return (
        <Form  className="form" onSubmit={handleSubmit} > 
            <div className="component_body"> 
                <div className="component_title">
                    <Container fluid> <h2>Add education</h2> </Container>
                </div>
                
            <Container> 
                <Row>       
                    <Col className="mb-4">
                        <div className="bloc"> 
                            <h3 className="bloc-title bg-light justify-content-start align-items-center"><FiPlusSquare className="me-2"/>Education</h3>
                            <div className="p-3"> 

                                    <Form.Group  className="mb-3" controlId="formBasicEmail">
                                        <Row> 
                                            <Form.Label column="md" lg={2}>Diplome *</Form.Label> 
                                            <Col>
                                                <Form.Control size="md"  name="diplome" type="text" placeholder="Diplome" value={data.diplome} onChange={onChangeValue} />
                                            </Col>    
                                        </Row>
                                    </Form.Group>
                                  
                                    <Form.Group  className="mb-3" controlId="formBasicEmail">
                                        <Row> 
                                            <Form.Label column="md" lg={2}>Univercity *</Form.Label> 
                                            <Col>
                                                <Form.Control size="md"  name="university" type="text" placeholder="Unversity" value={data.university} onChange={onChangeValue} />
                                            </Col>    
                                        </Row>
                                    </Form.Group>
                                    <Form.Group  className="mb-3" controlId="formBasicEmail">
                                        <Row> 
                                            <Form.Label column="md" lg={2}>country *</Form.Label> 
                                            <Col>
                                                <Form.Control size="md"  name="country" type="text" placeholder="Country" value={data.country} onChange={onChangeValue} />
                                            </Col>    
                                        </Row>
                                    </Form.Group>
                                    <Form.Group  className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Row> 
                                            <Form.Label column="md" lg={2}>Description *</Form.Label> 
                                            <Col>
                                                <Editor size="md"
                                                    editorState={description ? description : ''}
                                                    toolbarClassName="toolbarClassName"
                                                    wrapperClassName="wrapperClassName"
                                                    editorClassName="editorClassName"
                                                    onEditorStateChange={onEditorStateChange}
                                                    placeholder="Diplome description"
                                                    />
                                                <textarea style={{display:'none'}} ref={(val) => data.description = val } disabled  value={draftToHtml(convertToRaw(description.getCurrentContent()))} />
                                        </Col>    
                                        </Row>
                                    </Form.Group>  
                                    <Form.Group  className="mb-3" controlId="formBasicEmail">
                                        <Row>
                                            <Form.Label column="md" lg={2}>Obtained Date *</Form.Label>
                                            <Col lg={4} md={4} sm={4} xs={12}>
                                                <Form.Control size="md"  name="obtainedDate" type="date"  placeholder={data.obtainedDate} onChange={onChangeValue} />
                                            </Col>    
                                        </Row>
                                    </Form.Group>  
                                    <div className="mt-4  d-flex justify-content-end">
                                        <small className="text-secondary text-right"><i>* required fields</i></small>
                                    </div>
                            </div>
                        </div>      
                    </Col>
                </Row>
            </Container>
            
            </div>
            <div className="sticky-footer bg-light  ">
                <Container className="d-flex justify-content-end">
                    <Button type="submit" className="d-flex align-items-center" variant="secondary" >Save<FiSave className="ms-3"/></Button>
                </Container>
            </div>
        </Form> 
    )
}

export default AddEducation
