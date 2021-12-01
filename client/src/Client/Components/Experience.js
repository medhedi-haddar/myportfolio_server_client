import React,{ useEffect, useState } from 'react';
import { getExperiences } from '../../apis/PostApi';
import { Container, Row, Col } from 'react-bootstrap';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FiBriefcase } from "react-icons/fi";
const Experience = () => {

    const [experiences, setExperiences] = useState({});  

    const fetchExperiences = async () =>{
        const resp = await getExperiences();
        console.log(resp)
        setExperiences(resp);
    }

    useEffect(() => {
        fetchExperiences();
    }, [])

    return ( 
        <section id="Experience" className="section" style={{backgroundImage: `url()`}}> 
            {Object.keys(experiences).length  &&
                <Container>
                    <h1 className="mb-3 text-uppercase"><span className="text-secondary"></span>Experience</h1>
                    <Row>
                        <Col>
                        <VerticalTimeline lineColor="#f5f5f5">
                            {experiences.map((experience,index)=>( 
                                <VerticalTimelineElement key={'experience'+index}
                                className="vertical-timeline-element--work"
                                contentStyle={{ background: 'rgb(245 245 245)', color: 'rgb(5 54 77)' }}
                                contentArrowStyle={{ borderRight: '7px solid  rgb(245 245 245)' }}
                                date={experience.beginDate+` - `+experience.endDate}
                                iconStyle={{ background: 'rgb(245 245 245)', color: 'rgb(5 54 77)' }} 
                                icon={<FiBriefcase />} 
                                > 
                                <h3 className="vertical-timeline-element-title">{experience.title}</h3>
                                <h4 className="vertical-timeline-element-subtitle">{experience.entreprise}</h4>
                                <div dangerouslySetInnerHTML={{ __html: experience.description}}/>
                                <div className="pt-3 tags align-items-center">
                                    {experience.tags.map((tag,index2)=>(
                                        <span key={'tag'+index2} className="tag p-2 ps-3 pe-3"><span>{tag}</span></span>
                                    ))}
                                </div>
                            </VerticalTimelineElement> 
                            ))}
                            </VerticalTimeline>
                        </Col>
                    </Row>
                </Container>
            }
        </section>
    )
}

export default Experience