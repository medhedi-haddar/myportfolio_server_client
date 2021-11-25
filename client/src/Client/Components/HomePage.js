import React,{ useEffect ,useState} from 'react'
import { Container, Row, Col } from 'react-bootstrap'
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
             <section className="about-me" style={{backgroundImage: `url(/uploads/f0728213-bfd4-4ca9-a5c5-c97f3b273b3a-avatar-icon-images-5.png)`}}>
                
                <Container>
                    <Row>
                        <Col md={7}>
                        <div className="aboutme-content"> 
                            {aboutMe && 
                                <>
                                <h1>{aboutMe.lastName} </h1>
                                <h3>{aboutMe.firstName}</h3>
                                <div className="aboutme-description" dangerouslySetInnerHTML={{ __html: aboutMe.description}}>
                                    
                                </div>
                                </>
                            }
                        </div>
                        </Col>
                    </Row>
                </Container>

             </section>
        </div>
    )
}

export default HomePage
