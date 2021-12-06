import React, { useState } from 'react'
import { Container, Row, Col, Form,Button } from 'react-bootstrap';
import { EditorState, convertToRaw, ContentState,convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { FiSave } from "react-icons/fi"; 
import { updateExperience } from '../../../../actions/experiences';
import { FiTag,FiPlusSquare,FiX } from "react-icons/fi";
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import moment from 'moment';


const UpdateExperienceForm = ({experience}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [tag, setTag] = useState('');
    const [data, setData] = useState({
        _id : experience._id,
        title : experience.title,
        entreprise : experience.entreprise,
        description :experience.description,
        beginDate : moment(Number(experience.beginDate)).format('YYYY-MM-DD'),
        endDate: moment(Number(experience.endDate)).format('YYYY-MM-DD'),
        tags: experience.tags
    });
    const onChangeValue = (e) => { 
        console.log(data)
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
          convertFromHTML(experience?.description ? experience.description : '')
        ));
    const [description, setDescription] = useState(editorState);

    const onEditorStateChange = (editorState) => {
        setDescription(editorState);
      }
    // -----------------------------------------------------------------

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const nativeData = {
            _id : data._id,
            title : data.title,
            entreprise : data.entreprise,
            description : data.description.value,
            beginDate : Date.parse(data.beginDate),
            endDate : Date.parse(data.endDate),
            tags : data.tags
        };
            
        dispatch(updateExperience(nativeData,navigate));
    }
 
    return (
            <Form className="form" onSubmit={handleSubmit} > 
                <div className="component_title">
                    <Container fluid> <h2>Add experience</h2> </Container>
                </div> 
            <div className="component_body"> 
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
                                                    <Form.Control size="md"  name="beginDate" type="date" value={data.beginDate}  placeholder={data.beginDate} onChange={onChangeValue} />
                                                </Col>    
                                            </Row>
                                        </Form.Group>  
                                        <Form.Group  className="mb-3" controlId="formBasicEmail">
                                            <Row>
                                                <Form.Label column="md" lg={2}>Until</Form.Label>
                                                <Col lg={4} md={4} sm={4} xs={12}>
                                                    <Form.Control size="md"  name="endDate" type="date" value={data.endDate} placeholder={data.endDate} onChange={onChangeValue}/>
                                                </Col>    
                                            </Row>
                                        </Form.Group>  
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Row>
                                                    <Form.Label column="md" lg={2}>Tags <FiTag/></Form.Label>
                                                    <Col> 
                                                        <Form.Control size="md" name="beginDate" type="text"  value={tag} onChange={onChangeTags}  onKeyPress={(e) => e.key === "Enter" && onChangeTags(e)} />
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
            </div>
            <div className="sticky-footer bg-light  ">
                <Container className="d-flex justify-content-end">
                    <Button type="submit" className="d-flex align-items-center" variant="secondary" >Save<FiSave className="ms-3"/></Button>
                </Container>
            </div>
        </Form> 
    )
}


export default UpdateExperienceForm




