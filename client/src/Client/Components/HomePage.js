import React,{ useEffect ,useState} from 'react'
import { Container, Row, Col,Button } from 'react-bootstrap'
import '../Styles/Style.css'
import NavBarMenu from './NavBarMenu'
import {getAboutMe} from '../../apis/PostApi'
import { FiFileText, FiGithub } from "react-icons/fi";
import Skills from './Skills';
import Experience from './Experience';
import Projects from './Projects';
import Footer from './Footer';


const HomePage = () => {

    const [aboutMe , setAboutMe] = useState({});

    const fetchAboutMe = async () =>{
        const resp = await getAboutMe();
        console.log(resp)
        if(resp){
            setAboutMe(resp);
        }
    }
    useEffect(() => {
        fetchAboutMe()
    },[])
    return (
        <div className="front-body">
            <NavBarMenu/>
             <section id="Aboutme" className="about-me " style={{backgroundImage: `url()`}}>
                <div className="about-me-content"  >
                    <Container>
                        {/* <Row > */}
                            <Col  xxxl={8} xxl={8} xl={9} lg={12} md={11}>
                                <div className="about-me-text" > 
                                    {aboutMe && 
                                        <div >
                                        <h1>{aboutMe.lastName} </h1>
                                        <h3>{aboutMe.firstName}</h3>
                                        <div className="pt-4 p-relative" >
                                            <div className="about-me-description" dangerouslySetInnerHTML={{ __html: aboutMe.description}}/> 
                                            <div className="pt-4 about-me-buttons"> 
                                            <Row>
                                                <Col xs={12} md={6} lg={3} >
                                                 <Button href={aboutMe.cv} target="_blank" className="width-100 mb-2 align-items-center me-3 pe-4 ps-4" variant="primary" ><FiFileText className="me-3" size={14}/>My Cv</Button>
                                                 </Col>
                                                <Col xs={12} md={6} lg={3}>
                                                <Button href={aboutMe.git_link} target="_blank" className="width-100 mb-2 align-items-center me-3 pe-4 ps-4" variant="secondary" ><FiGithub className="me-3" size={14}/>Github</Button> 
                                                </Col>
                                            </Row>
                                            </div> 
                                        </div> 
                                        </div>
                                    }
                                </div>
                            </Col>
                        {/* </Row> */}
                    </Container>
                </div>
                <div className="about-me-cover p-0" >
                    <img src="/uploads/f0728213-bfd4-4ca9-a5c5-c97f3b273b3a-avatar-icon-images-5.png"/>
                </div>
             </section>
             <Skills/>
             <Projects/>
             <Experience/>
             <Footer/>
             <div className="left-design">
                 <img src="/left-bg.png"/>
             </div>
        </div>
    )
}

export default HomePage
