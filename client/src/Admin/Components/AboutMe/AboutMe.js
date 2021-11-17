import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { MdOutlineEditNote } from "react-icons/md";
import moment from 'moment';
import { Link } from 'react-router-dom';
import {getAboutMe} from '../apis/Api';
import { DiGithubBadge } from "react-icons/di";

const AboutMe = () => {
    const [lastName , setLastName] = useState('');
    const [firstName , setFirstName] = useState('');
    const [description , setDescription] = useState('');
    const [updateDate , setUpdateDate] = useState('');
    const [gitHubLink , setGitHublink] = useState('');
    const [profileImage , setProfileImage] = useState('');
    const [id , setId] = useState('');
    const [data, setData] = useState({});

    const fetchAboutMeData = async ()=> {
        const response  = await getAboutMe();
        setId(response._id);
        setLastName(response.lastName);
        setFirstName(response.firstName);
        setDescription(response.description);
        setGitHublink(response.gitHublink);
        setUpdateDate(response.update_date);
        setProfileImage(response.profileImage);

    }
    useEffect(() => {
        fetchAboutMeData();
    }, [])
    return (
        <div>
            <div className="component_title d-flex justify-content-between">
                <h2>About Me</h2>             
                <Link to={'/admin/about_me_up'} variant={"light"}><Button variant="light"><MdOutlineEditNote/></Button></Link>
            </div>
            <div>
                <Container>
                    <Row>
                        <Col>
                            <h3>{lastName} {firstName}</h3>
                            <p>{description}</p>
                            <Button variant="success" className="me-3">Download CV</Button>
                            <Button variant="outline-secondary"><a href={gitHubLink} className="button" target="_blank"><DiGithubBadge/> Github</a></Button>
                        </Col>
                        <Col className="text-end">
                            <img src={profileImage} style={{ width: '70%'}}/>
                        </Col>
                    </Row>
                </Container>

            </div>

        </div>
    )
}

export default AboutMe
