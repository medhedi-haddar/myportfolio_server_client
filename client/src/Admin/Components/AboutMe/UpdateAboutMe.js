import React, { useState,useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import axios from 'axios';
const UpdateAboutMe = () => {

    const [lastName , setLastName] = useState('');
    const [firstName , setFirstName] = useState('');
    const [description , setDescription] = useState('');
    const [gitHubLink , setGitHublink] = useState('');
    const [id , setId] = useState('');
    const [data, setData] = useState({});

    const getAboutMe = async ()=> {
        const response  = await axios.get('/api/about_me');
        const datares = response.data[0];
        // setData(response.data);
        setId(datares._id);
        setLastName(datares.lastName);
        setFirstName(datares.firstName);
        setDescription(datares.description);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setData({
            lastName : lastName,
            firstName : firstName,
            description : description
        });

        const payload = {
            _id : id,
            lastName : lastName,
            firstName : firstName,
            description : description
        };
        const response = axios ({
            url : '/api/update_about_me',
            method : 'POST',
            data : payload,
        }).then(()=> {
            console.log("data has send to the server");
        })
        .catch((error)=>{
            console.log( "data not sent ", error);
        });

        console.log( response);

    }

    useEffect(() => {
        getAboutMe()
        
    }, [])
    return (
        <div>
            <div className="component_title">
                <h2><Link to={'/admin/about_me'} variant={"light"}><Button variant="light" className="me-2"><MdOutlineArrowBackIosNew/></Button></Link>About me update</h2>
            </div>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control name="lastName" type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control name="firstName" type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control name="description" as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Github </Form.Label>
                    <Form.Control name="gitHubLink" type="text" placeholder="Title" value={gitHubLink} onChange={(e) => setGitHublink(e.target.value)} />
                </Form.Group>
              
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Photo de profile</Form.Label>
                    <Form.Control type="file" name="photo"  />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Cv</Form.Label>
                    <Form.Control type="file" name="cv"  />
                </Form.Group>

                <Button variant="success" type="submit">
                    Enregistrer
                </Button>
            </Form>
        </div>
    )
}

export default UpdateAboutMe
