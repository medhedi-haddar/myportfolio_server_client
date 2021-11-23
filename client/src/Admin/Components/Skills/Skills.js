import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { MdOutlineEditNote } from "react-icons/md";
import AddSkill from './AddSkill'
import { getSkills } from '../apis/Api';
import UpdateSkill from './UpdateSkill';
import Test from './Test';

const Skills = () => {

    const [isUpdateMode , setIsUpdateMode] = useState(false);

    const toggleUpdate = () =>{
        isUpdateMode ? setIsUpdateMode(false) : setIsUpdateMode(true); 
    }

    const [skill, setSkill] = useState({});

    const fetchSkill = async () =>{
        const data = await getSkills();
        if(data){
            setSkill({
                _id : data._id,
                title : data.title,
                description : data.description,
                skills : data.skills
            })
        }
    }
    useEffect(() => {
        if(isUpdateMode===false){
            fetchSkill();     }
    }, [isUpdateMode])
    return (
        
        <div>
            {isUpdateMode && 
                <>
                    <UpdateSkill toggleUpdate={toggleUpdate} skillData={skill} fetchSkill={fetchSkill}/>
                </>
            }{!isUpdateMode && 
                <>
                {!Object.keys(skill).length &&
                    <AddSkill/>
                }{Object.keys(skill).length && 
                    <>
                    <div className="component_title d-flex justify-content-between">
                        <h2>Skills</h2>             
                        <Button variant="light" onClick={toggleUpdate}><MdOutlineEditNote/></Button>
                    </div>
                    <Container>
                        <Row>
                            <Col lg={7} md={12} sm={12}>
                                <h2>{skill.title}</h2>
                                <div dangerouslySetInnerHTML={{ __html: skill.description}}/>
                            </Col>
                            <Col lg={5} md={8} sm={12}>
                                <Test skills={skill.skills}/>
    
                            </Col>
                        </Row>
                    </Container>
                    </>
                }
                </>
            }
            
            
        </div>
    )
}

export default Skills
