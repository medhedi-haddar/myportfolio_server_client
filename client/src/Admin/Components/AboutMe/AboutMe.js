import React, { useState, useEffect } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { MdOutlineEditNote } from "react-icons/md";
import {getAboutMe} from '../apis/Api';
import { DiGithubBadge } from "react-icons/di";
import UpdateAboutMe from './UpdateAboutMe';
import AddAboutMe from './AddAboutMe';

const AboutMe = () => {

    const [updateActive , setUpdateActive] = useState(false);
    const [data, setData] = useState({
        id : '',
        lastName : '',
        firstName : '',
        description :'',
        updateDate : '',
        git_link : '',
        profileImage : '',
        cv : ''
    });

    const handlecontent = () =>{
        updateActive ? setUpdateActive(false) : setUpdateActive(true); 
    }

    const fetchAboutMeData = async ()=> {
        const response  = await getAboutMe();
        console.log(response);
        if(response){
            setData({
                id : response.id,
                lastName : response.lastName,
                firstName : response.firstName,
                description : response.description,
                git_link : response.git_link,
                updateDate : response.updateDate,
                profileImage : response.profileImage,
                cv : response.cv
            })
        }
    }
    useEffect(() => {
        fetchAboutMeData();
    }, [])
    return (
        <div>
            {updateActive && 
                <>
                <UpdateAboutMe aboutMeData={data} handlecontent={handlecontent} fetchAboutMeData={fetchAboutMeData}/>
                </>
            }
            {!updateActive && 
                <> 
                    {Object.keys(data).length <= 0 && 
                        <AddAboutMe fetchAboutMeData={fetchAboutMeData}/>
                    }{Object.keys(data).length > 0 &&
                        <>
                            <div className="component_title d-flex justify-content-between">
                            <h2>About Me</h2>             
                            <Button variant="light" onClick={handlecontent}><MdOutlineEditNote/></Button>
                            </div>
                            <div>
                                <Container>
                                    <Row>
                                        <Col>
                                            <h3>{data.lastName} {data.firstName}</h3>
                                            <p><small className="text-secondary">Last Update: {data.updateDate}</small></p>
                                            <div className="post__description" dangerouslySetInnerHTML={{ __html: data.description}}/>
                                            <Button href={data.cv} variant="success"  className="me-3">Download CV</Button>
                                            <Button variant="outline-secondary"><a href={`${data.git_link}`} className="button" target="_blank"><DiGithubBadge/> Github</a></Button>
                                        </Col>
                                        <Col md={4} className="text-end">
                                            <img src={`${data.profileImage}`} style={{ width: '100%'}}/>
                                        </Col>
                                    </Row>
                                </Container> 
                            </div>
                        </>
                    }
                </>
            }
           

        </div>
    )
}

export default AboutMe
