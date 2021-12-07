import React, { useState } from 'react'
import { Button,Container,Row,Col,Form,InputGroup } from 'react-bootstrap'; 
import { FiSave, FiEye, FiEyeOff  } from "react-icons/fi";
import { updateProfile } from '../../../actions/profile'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
 
const EditProfile = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {result} = JSON.parse(localStorage.getItem('profile'));
    
    const [data, setData] = useState({...result, newpassword : ''});
    const [errors, setErrors] = useState({
        password : ""
    });
    const [pwdButtonIcon, setPwdButtonIcon] = useState(<FiEye/>)
    const [pwdInputType, setPwdInputType] = useState('password');

    const onChangehandle = (e) => {
        e.preventDefault();
        setData({
            ...data,
            [e.target.name] : e.target.value
        });
    }

    const toggleShowPwd = (e) => {
        e.preventDefault();
        if(pwdInputType === 'password') {
            setPwdInputType('text');
            setPwdButtonIcon(<FiEyeOff/>);
        }else{
            setPwdInputType('password');
            setPwdButtonIcon(<FiEye/>);
        }
    }

    const handleSubmit = async (e)=> {
        e.preventDefault();
        if(!data.newpassword.includes(' ')){
            setErrors({...errors, password : "" });
            await dispatch(updateProfile(data));
            if(data.newpassword != ''){
                dispatch({ type : 'LOGOUT'});
            }
            navigate(`${process.env.REACT_APP_ADMIN_BASE_URL}/login`);
        }else{
            alert('error');
            setErrors({...errors, password : " Not valid " });
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <div className="component_title ">
            <Container fluid className="d-flex justify-content-between align-items-start"> 
                <h2>Profile</h2>             
            </Container>
                </div>
            <div className="component_body"> 
                <Container fluid>
                    <Row className=" d-flex justify-content-center"> 
                        <Col sm={12} md={12} lg={6}> 
                            <Form.Group className="mb-3" controlId="formBasicText" >
                                <Form.Label>Last name</Form.Label>
                                <Form.Control type="text" placeholder="last name" name="lastName" value={data.lastName} onChange={onChangehandle}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicText">
                                <Form.Label>First name</Form.Label>
                                <Form.Control type="text" placeholder="First name" name="firstName" value={data.firstName} onChange={onChangehandle}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" name="email" value={data.email} onChange={onChangehandle}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>New password</Form.Label>
                                <InputGroup className="mb-3">
                                <Form.Control autoComplete="new-password" type={pwdInputType} placeholder="Password" name="newpassword" value={data.newpassword} onChange={onChangehandle}/>
                                <Button variant="outline-secondary" id="button-addon1" onClick={toggleShowPwd} >
                                {pwdButtonIcon}
                                </Button>
                                </InputGroup>
                                {errors.password && 
                                    <small className="text-danger">{errors.password}</small>
                                }
                            </Form.Group>
                        </Col>  
                    </Row>
                </Container>
             </div>
            <div className="sticky-footer bg-light  ">
                <Container fluid>
                    <Row className="d-flex justify-content-center">
                        <Col sm={12} md={12} lg={6} className="d-flex justify-content-end">
                            <Button className="d-flex align-items-center" variant="primary" type="submit" >Save<FiSave className="ms-3"/></Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Form>
    )
}

export default EditProfile
