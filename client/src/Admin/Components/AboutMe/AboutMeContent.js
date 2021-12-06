import React from 'react'
import { Button, Row, Col } from 'react-bootstrap'
 
import { DiGithubBadge } from "react-icons/di"; 
import Loader from '../../../Loader/Loader';

const AboutMeContent = ({aboutMeData}) => {

    return ( 
        !Object.keys(aboutMeData).length  ?  <Loader/> :
            <Row>
                <Col>
                    <h3>{aboutMeData.lastName} {aboutMeData.firstName}</h3>
                    <p><small className="text-secondary">Last Update: {aboutMeData.updateDate}</small></p>
                    <div className="h6" className="post__description" dangerouslySetInnerHTML={{ __html: aboutMeData.description}}/>
                    <Button href={aboutMeData.cv.url} variant="secondary"  className="me-3">Download CV</Button>
                    <Button variant="outline-primary"><a href={`${aboutMeData.git_link}`} className="button" target="_blank"><DiGithubBadge/> Github</a></Button>
                </Col>
                <Col md={4} className="text-end">
                    <img src={`${aboutMeData.profileImage.url}`} style={{ width: '100%', borderRadius: "0 24px 0 0"}}/>
                </Col>
            </Row>
    )
}

export default AboutMeContent
