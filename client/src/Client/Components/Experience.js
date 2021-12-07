import { Container, Row, Col } from 'react-bootstrap';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaBriefcase } from "react-icons/fa";
import { useSelector } from 'react-redux';
import moment from 'moment';
import { HiOutlineOfficeBuilding } from "react-icons/hi";

const Experience = () => {

    const experiences = useSelector((state) => state.experiences);

    return ( 
        <section id="Experience" className="section"> 
            <Container >
            {(!experiences.length) ? ''
            :
                <Row>
                    <h1 className="mb-3 text-uppercase"><span className="text-secondary"></span>Experience</h1>
                    <Col>
                    <VerticalTimeline lineColor="#f5f5f5">
                        {experiences.map((experience,index)=>( 
                            <VerticalTimelineElement key={'experience'+index}
                            className="vertical-timeline-element--work"
                            contentStyle={{ background: 'rgb(245 245 245)', color: 'rgb(5 54 77)' }}
                            contentArrowStyle={{ borderRight: '7px solid  rgb(245 245 245)' }}
                            date={moment(Number(experience.beginDate)).format('MMMM YYYY')+` - `+moment(Number(experience.endDate)).format('MMMM YYYY')}
                            iconStyle={{ background: 'rgb(245 245 245)', color: 'rgb(5 54 77)' }} 
                            icon={<FaBriefcase />} 
                            > 
                            <h3 className="vertical-timeline-element-title">{experience.title}</h3>
                            <small className="vertical-timeline-element-subtitle"><HiOutlineOfficeBuilding className="me-2"/>{experience.entreprise}</small>
                            <div className="timeline_description" dangerouslySetInnerHTML={{ __html: experience.description}}/>
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
            }
            </Container>
        </section>
    )
}

export default Experience
