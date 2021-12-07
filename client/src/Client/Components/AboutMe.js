import { useSelector } from 'react-redux';
import { Container, Row, Col,Button } from 'react-bootstrap'
import { FiFileText, FiGithub } from "react-icons/fi";

const AboutMe = () => {

    const aboutMe = useSelector((state) => state.aboutMe);

    return (
        <section id="AboutMe" className="about-me section" >
            <Container >
                {
                (!aboutMe.length) ? '' 
                :<Col  xxxl={8} xxl={8} xl={9} lg={7} md={12}>
                    <div className="about-me-text" >
                        <h1>{aboutMe[0]?.lastName} </h1>
                        <h3>{aboutMe[0]?.firstName}</h3>
                        <div className="pt-3" >
                            <div className="about-me-description text-justify" dangerouslySetInnerHTML={{ __html: aboutMe[0]?.description}}/> 
                            <div className="pt-4 about-me-buttons"> 
                            <Row>
                                <Col xs={12} md={6} lg={4} >
                                    <Button href={aboutMe[0]?.cv.url} target="_blank" className="width-100 mb-2 align-items-center me-md-3 pe-4 ps-4" variant="primary" ><FiFileText className="me-3" size={14}/>My Cv</Button>
                                    </Col>
                                <Col xs={12} md={6} lg={4}>
                                <Button href={aboutMe[0]?.git_link} target="_blank" className="width-100 mb-2 align-items-center me-md-3 pe-4 ps-4" variant="secondary" ><FiGithub className="me-3" size={14}/>Github</Button> 
                                </Col>
                            </Row>
                            </div> 
                        </div>
                    </div>
                    <div className="d-flex justify-content-end about-me-cover p-0" >
                        <img src={aboutMe[0]?.profileImage?.url}/>
                    </div>
                    <div className="left-design">
                        <img src="/left-bg.png"/>
                    </div>
                </Col>
                }   
            </Container>
        </section>
    )
}

export default AboutMe
