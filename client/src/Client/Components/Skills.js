import React,{ useState ,useEffect} from 'react'
import { getSkills } from '../../apis/Api'
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
        <div>
             <section className="section" style={{backgroundImage: `url()`}}>
                <div className="">
                    <Container>
                        <Row>

                        {Object.keys(skills).length  &&
                        <>
                        <h1 className="mb-3 text-uppercase"><span className="text-secondary"></span>{skills.title}</h1>
                        <Col lg={6}>
                            
                            <div class="col-lg skills_text text-start " data-aos="fade-right">
                                <div  dangerouslySetInnerHTML={{ __html: skills.description}}/>
                            </div>

                        </Col>
                        <Col lg={{span:5, offset : 1}}>
                            {skills.skills.map((skill,index)=>(
                                <>
                                <div className="text-start mb-4 position-relative" >   
                                    <h3>{skill.name}</h3>
                                    <div className="progress">
                                        <span className="progress-value text-secondary">{skill.level}%</span>
                                        <div className="progress-bar bg-success" role="progressbar" style={{width: `${skill.level}%`}} ariaValuenow={"80"} ariaValuemin={"0"} ariaValuemax={"100"}>
                                        </div>
                                    </div>
                                </div>
                                </>
                            ))}
                        </Col>

                        </>
                        
                    }
                    </Row>
                    </Container>
                </div>
            </section>
        </div>
    )
}

export default Skills
