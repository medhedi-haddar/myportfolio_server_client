import React from 'react'
import {Container,Col, Row} from 'react-bootstrap';

import { useSelector } from 'react-redux';


const Skills = () => {

    const skills = useSelector((state) => state.skills);

    return ( 
        <section id="Skills" className="section"  > 
                <Container >
                {(!skills.length) ? ''
                    : <Row>
                       
                        <Col lg={6} md={12}> 
                        <h1 className="mb-3 text-uppercase"><span className="text-secondary"></span>{skills[0].title}</h1>
                            <div className="col-lg skills_text text-start " >
                                <div  dangerouslySetInnerHTML={{ __html: skills[0].description}}/>
                            </div> 
                        </Col>
                        <Col  className="mt-3 skills"  lg={{span:5, offset : 1}}>
                            {skills[0].skills.map((skill,index)=>( 
                                <div key={`skill`+index} className="text-start mb-4 position-relative" >   
                                    <h3>{skill.name}</h3>
                                    <div className="progress">
                                        <span className="progress-value text-secondary">{skill.level}%</span>
                                        <div className="progress-bar bg-secondary" role="progressbar" style={{width: `${skill.level}%`}} aria-valuenow={skill.level} aria-valuemin={"0"} aria-valuemax={"100"}>
                                        </div>
                                    </div>
                                </div> 
                            ))}
                        </Col> 
                    </Row>
                }
            </Container>
        </section>  
    )
}

export default Skills
