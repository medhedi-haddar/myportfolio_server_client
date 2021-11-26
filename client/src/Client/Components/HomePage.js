import React,{ useEffect ,useState} from 'react'
import { Container, Row, Col,Button } from 'react-bootstrap'
import '../Styles/Style.css'
import NavBarMenu from './NavBarMenu'
import {getAboutMe} from '../../apis/Api'

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
             <section className="about-me" style={{backgroundImage: `url()`}}>
                <div className="about-me-content">
                    <Container>
                        {/* <Row > */}
                            <Col md={12}>
                                <div className="about-me-text"> 
                                    {aboutMe && 
                                        <>
                                        <h1>{aboutMe.lastName} </h1>
                                        <h3>{aboutMe.firstName}</h3>
                                        <div className="about-me-text p-relative" >
                                            <div className="about-me-description" dangerouslySetInnerHTML={{ __html: aboutMe.description}}/> 
                                            <div className="about-me-buttons">
                                                <Button variant="success">CV</Button>
                                                <Button variant="secondary">Github</Button>
                                            </div> 
                                        </div> 
                                        </>
                                    }
                                </div>
                            </Col>
                        {/* </Row> */}
                    </Container>
                </div>
                <div className="about-me-cover p-0">
                    <img src="/uploads/f0728213-bfd4-4ca9-a5c5-c97f3b273b3a-avatar-icon-images-5.png"/>
                </div>
             </section>
        </div>
    )
}

export default HomePage
