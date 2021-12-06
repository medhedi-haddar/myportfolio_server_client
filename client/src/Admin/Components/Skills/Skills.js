import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FiEdit } from "react-icons/fi";
import { useSelector } from 'react-redux';

const Skills = () => {

    const skills = useSelector((state) => state.skills);

    return (
        <>
            <div className="component_title ">
                <Container fluid className="d-flex justify-content-between"> 
                    <h2 className="d-flex align-items-center">Skills</h2>             
                    <Button className="d-flex align-items-center" variant="secondary" href="/admin/up_skills"><FiEdit className="me-2"/>Edit Skills</Button>
                </Container>
            </div>
        
            <div className="component_body"> 
                {Object.keys(skills).length && 
                    <>
                        <Container fluid>
                            <Row>
                                <Col lg={7} md={12} sm={12}>
                                    <h2>{skills[0].title}</h2>
                                    <div dangerouslySetInnerHTML={{ __html: skills[0].description}}/>
                                </Col>
                                <Col lg={5} md={8} sm={12}>
                                <div>
                                    {skills[0].skills.map((skill_item,index)=>(
                                            <div key={'skill_item_'+index} className="text-start mb-4 p-2 position-relative d-flex justify-content-between">  
                                            <div className="skill-bloc-visual">
                                                <span className="skill-title">{skill_item.name}</span>
                                                <div className="skill">
                                                    <span className="skill-value text-secondary">{skill_item.level}%</span>
                                                    <div className="skill-bar " style={{ width: `${skill_item.level}%`, background: `${skill_item.color}` }} 
                                                    aria-valuenow={`${skill_item.level}`} aria-valuemin={"0"} aria-valuemax={"100"}></div>
                                                </div>
                                            </div>
                                        </div> 
                                    ))}
                                </div>
                                </Col>
                            </Row>
                        </Container> 
                    </>
                }
            </div>   
        
        </>
    )
}

export default Skills
