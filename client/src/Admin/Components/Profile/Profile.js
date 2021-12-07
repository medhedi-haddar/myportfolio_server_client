import React from 'react'
import { Button,Container,Row,Col,ListGroup } from 'react-bootstrap'; 
import { FiEdit } from "react-icons/fi";

const Profile = () => {

    const {result} = JSON.parse(localStorage.getItem('profile'))
    
    return (

        <>
            <div className="component_title ">
                <Container fluid className="d-flex justify-content-between align-items-center"> 
                    <h2>Profile</h2>             
                    <Button className="d-flex align-items-center" variant="secondary" href={`${process.env.REACT_APP_ADMIN_BASE_URL}/edit_profile`}><FiEdit className="me-2"/> Edit profile</Button>
                </Container>
            </div>
            <div className="component_body"> 
            <Container fluid>
                <Row className="d-flex justify-content-center"> 
                    <Col sm={12} md={12} lg={6}>
                    <ListGroup>
                            <ListGroup.Item><b>First Name : </b><span>{result?.firstName}</span></ListGroup.Item>
                            <ListGroup.Item><b>Last Name : </b><span>{result?.lastName}</span></ListGroup.Item>
                            <ListGroup.Item><b>Email : </b><span>{result?.email}</span></ListGroup.Item>
                        </ListGroup>
                    </Col>  
                </Row>
            </Container>
            </div>
        </>  
    )
}

export default Profile
