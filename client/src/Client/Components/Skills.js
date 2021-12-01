import React,{ useState ,useEffect} from 'react'
import { getSkills } from '../../apis/PostApi'
import {Container,Col, Row} from 'react-bootstrap';

const Skills = () => {

    const [skills, setSkills] = useState({})

    const fetchSkills = async () =>{
        const resp  = await getSkills();
        console.log(resp);
        if(resp){
            setSkills(resp);
        }
    }

    useEffect(() => {
        fetchSkills();
    },[])
    return ( 
        <section id="Skills" className="section" style={{backgroundImage: `url()`}}> 
            {Object.keys(skills).length  &&
                <Container>
                    <Row>
                        <h1 className="mb-3 text-uppercase"><span className="text-secondary"></span>{skills.title}</h1>
                        <Col lg={6}> 
                            <div className="col-lg skills_text text-start " >
                                <div  dangerouslySetInnerHTML={{ __html: skills.description}}/>
                            </div> 
                        </Col>
                        <Col  className="skills"  lg={{span:5, offset : 1}}>
                            {skills.skills.map((skill,index)=>( 
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
                </Container>
            } 
        </section>  
    )
}

export default Skills
