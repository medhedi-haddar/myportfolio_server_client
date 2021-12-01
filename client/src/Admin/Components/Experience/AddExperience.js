import React, { useState,useEffect } from 'react'
import { Container, Row, Col, Form,Button } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { EditorState, convertToRaw, ContentState,convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { FiSave } from "react-icons/fi"; 
import {addExperience, getExperiences} from '../../../apis/PostApi';
import { FiTag,FiTrash2,FiEdit,FiPlusSquare,FiX } from "react-icons/fi";

const AddExperience = () => {

    const [tag, setTag] = useState('');
    const [experiences, setExperiences] = useState([]);
    const [data, setData] = useState({
        title : '',
        entreprise : '',
        description :'',
        begin_date : '',
        end_date: '',
        tags: []
    });

    const onChangeValue = (e) => { 
        e.preventDefault();

        setData({
          ...data,
          [e.target.name]: e.target.value
        });
        console.log(data)
    } 


    const onChangeTags = (e) => {
        e.preventDefault();
        setTag(e.target.value);
        if(e.target.value.trimStart().includes(' ')){
            if(tag.replaceAll(' ', '').length){

                setData({
                    ...data,
                    tags: [...data.tags, tag.trim()]
                  });
                
                setTag('');
                  console.log(data);
            }
        }
      } 
      const deleteTag = (e)=>{
          e.preventDefault();
            const index = e.target.value;
            const new_tags = data.tags.slice();
            new_tags.splice(index,1);
            setData({
                ...data,
                tags: new_tags
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
        console.log('submit')
        const requestData = {
            title  : data.title,
            entreprise  : data.entreprise,
            description : data.description.value,
            beginDate : Date.parse(data.begin_date),
            endDate : Date.parse(data.end_date),
            tags : data.tags
        }

        if(requestData.title.length && requestData.description && requestData.beginDate ){
           await  addExperience(requestData)
            fetchExperiences();
            console.log(requestData.description)
        }
    }
    const fetchExperiences = async () =>{
        const data = await getExperiences();
        console.log(data)
                setExperiences(data);
    }
    useEffect(() => {
        fetchExperiences();
    }, [])
    return (
        <Form  > 
            <div className="contentBody"> 
                <div className="component_title">
                    <Container fluid> <h2>Add experience</h2> </Container>
                </div>
                
            <Container> 
                <Row>       
                    <Col className="mb-4">
                        <div className="bloc"> 
                            <h3 className="bloc-title bg-light justify-content-start align-items-center"><FiPlusSquare className="me-2"/>Experience</h3>
                            <div className="p-3"> 
                                    <Form.Group  className="mb-3" controlId="formBasicEmail">
                                    <Row> 
                                        <Form.Label column="md" lg={2}>Title *</Form.Label> 
                                        <Col>
                                            <Form.Control size="md"  name="title" type="text" placeholder="Title" value={data.title} onChange={onChangeValue} />
                                        </Col>    
                                    </Row>
                                    </Form.Group>
                                    <Form.Group  className="mb-3" controlId="formBasicEmail">
                                    <Row> 
                                        <Form.Label column="md" lg={2}>Entreprise</Form.Label> 
                                        <Col>
                                            <Form.Control size="md"  name="entreprise" type="text" placeholder="Entreprise" value={data.entreprise} onChange={onChangeValue} />
                                        </Col>    
                                    </Row>
                                    </Form.Group>

                                    <Form.Group  className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Row> 
                                            <Form.Label column="md" lg={2}>Description *</Form.Label> 
                                            <Col>
                                                <Editor size="md"
                                                    editorState={description}
                                                    toolbarClassName="toolbarClassName"
                                                    wrapperClassName="wrapperClassName"
                                                    editorClassName="editorClassName"
                                                    onEditorStateChange={onEditorStateChange}
                                                    />
                                                <textarea style={{display:'none'}} ref={(val) => data.description = val } disabled  value={draftToHtml(convertToRaw(description.getCurrentContent()))} />
                                        </Col>    
                                        </Row>
                                    </Form.Group> 
                                
                                        <Form.Group  className="mb-3" controlId="formBasicEmail">
                                            <Row>
                                                <Form.Label column="md" lg={2}>Since *</Form.Label>
                                                <Col lg={4} md={4} sm={4} xs={12}>
                                                    <Form.Control size="md"  name="begin_date" type="date"  placeholder={data.begin_date} onChange={onChangeValue} />
                                                </Col>    
                                            </Row>
                                        </Form.Group> 
                                   
                                        <Form.Group  className="mb-3" controlId="formBasicEmail">
                                            <Row>
                                                <Form.Label column="md" lg={2}>Until</Form.Label>
                                                <Col lg={4} md={4} sm={4} xs={12}>
                                                    <Form.Control size="md"  name="end_date" type="date" placeholder={data.end_date} onChange={onChangeValue}/>
                                                </Col>    
                                            </Row>
                                        </Form.Group> 
                                
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Row>
                                                <Form.Label column="md" lg={2}>Tags <FiTag/></Form.Label>
                                                <Col> 
                                                    <Form.Control size="md" name="begin_date" type="text"  value={tag} onChange={onChangeTags}  onKeyPress={(e) => e.key === "Enter" && onChangeTags(e)} />
                                                    <div className="pt-2 tags">
                                                        
                                                        {data.tags.map((item,index)=>(
                                                            <span key={index} className="tag"><span>{item}</span><button value={index} onClick={deleteTag} className="tags-button"><FiX/></button></span>
                                                        ))
                                                        }
                                                    </div>
                                                </Col>    
                                            </Row>
                                           
                                        </Form.Group> 
                                    </Col>
                                   
                                </Row>
                               
                            </div>
                        </div>      
                    </Col>
                </Row>
            </Container>
            <div>
                <Container>
                    { experiences &&
                        experiences.map((experience,index)=>(
                            <>
                            <div className="bloc mb-4">
                                <div className="bloc-title bg-light">
                                    <h4 className="">{experience.title}</h4>
                                    <div> 
                                        <Button className="me-3 align-items-center" size="sm" variant="secondary" ><span>Edit</span><FiEdit className="ms-2"/></Button>
                                        <Button className="" size="sm" variant="danger" ><FiTrash2/></Button>
                                    </div>
                                </div>
                                <Row className="pb-4">
                                    <Col lg={8}>
                                        <div className="p-3">
                                            <div className="text-secondary mb-3">With <b>{experience.entreprise}</b> Since {experience.beginDate} to {experience.endDate}</div>
                                            <div dangerouslySetInnerHTML={{ __html: experience.description}}/> 
                                            
                                        </div>
                                    </Col>
                                    <Col lg={4}>
                                        <div className="ps-2 pt-2 tags align-items-center">
                                            <span key={index} className=" bg-secondary tag ps-3 pe-3 p-2 text-light"> Tags <FiTag className="ms-2" size={18}/></span>
                                            {experience.tags.map((item,index)=>(
                                                <span key={index} className="tag p-2 ps-3 pe-3"><span>{item}</span></span>
                                                ))
                                            }
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            </>
                        ))
                        }
                </Container>
            </div>
            </div>
            <div className="sticky-footer bg-light  ">
                <Container className="d-flex justify-content-end">
                    <Button onClick={handleSubmit} className="d-flex align-items-center" variant="primary" >Save<FiSave className="ms-3"/></Button>
                </Container>
            </div>
        </Form> 
    )
}

export default AddExperience