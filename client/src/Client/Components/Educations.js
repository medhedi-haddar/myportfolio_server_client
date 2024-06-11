import { Container, Row, Col } from 'react-bootstrap';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { useSelector } from 'react-redux';
import { FaMapMarkerAlt, FaBook, FaUniversity } from "react-icons/fa";
import moment from 'moment';

const Educations = () => {

    const educations = useSelector((state) => state.educations);
    return ( 
        <section id="Education" className="section"> 
            <Container >
            {(!educations.length) ? ''
            :
                <Row>
                    <h1 className="mb-3 text-uppercase"><span className="text-secondary"></span>Education</h1>
                    <Col>
                    <VerticalTimeline lineColor="#dddddd">
                        {educations.map((education,index)=>( 
                            <VerticalTimelineElement key={'education'+index}
                            className="vertical-timeline-element--work"
                            contentStyle={{ background: 'rgb(221 221 221)', color: 'rgb(5 54 77)' }}
                            contentArrowStyle={{ borderRight: '7px solid  rgb(221 221 221)' }}
                            date={moment(Number(education.obtainedDate)).format('MMMM YYYY')}
                            iconStyle={{ background: 'rgb(221 221 221)', color: 'rgb(5 54 77)' }} 
                            icon={<FaBook />} 
                            > 
                            <h3 className="vertical-timeline-element-title">{education.diplome}</h3>
                            <div className="d-flex row">

                            <small className="vertical-timeline-element-subtitle mb-2"><FaUniversity className="me-2"/>{education.university}
                            </small>
                            <small> <FaMapMarkerAlt className="me-2"/>{education.country}</small>
                            </div>
                            <div  className="timeline_description" dangerouslySetInnerHTML={{ __html: education.description}}/>
                           
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

export default Educations
