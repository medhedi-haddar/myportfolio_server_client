import React,{useState,useEffect} from 'react'
import { Form,Button, InputGroup } from 'react-bootstrap';
import { useNavigate, Navigate} from 'react-router-dom';
import { FiEye, FiEyeOff  } from "react-icons/fi";
import { getFromStorage } from '../../../Utils/Storage'
import { useDispatch } from 'react-redux';
import {signin} from '../../../actions/auth'


const Login = () => {

    const dispatch = useDispatch();
    const navigate  = useNavigate();

    const [loginData, setLoginData] = useState({
        emaill: '',
        password : ''
    })
    const [passwordShown, setPasswordShown] = useState(false);

    const onChangeHanndle = (e)=>{
        e.preventDefault()
        setLoginData({
            ...loginData,
            [e.target.name] : e.target.value
        })
    }
    const togglePassword = () => { setPasswordShown(!passwordShown);};

    const handleSubmit = async(e)=>{
        e.preventDefault();
        dispatch(signin(loginData, navigate));
    }

    useEffect(() => {  
       const result =  getFromStorage("profile"); 
        if(result?.token){
            navigate(`${process.env.REACT_APP_ADMIN_BASE_URL}`)
        }
    }, [])

    return (
        <div className="login">
            <h2>Login admin</h2>
            <Form className="login-form" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="email" value={loginData?.email ? loginData.email : ''} onChange={onChangeHanndle} />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <InputGroup className="mb-3">
                    <Form.Control type={passwordShown ? "text" : "password"}  placeholder="Email" name="password" value={loginData?.password ? loginData.password : ''} onChange={onChangeHanndle} />
                    <Button variant="outline-secondary" id="button-addon1" onClick={togglePassword} >
                    {passwordShown ? <FiEyeOff/> : <FiEye/>}
                    </Button>
                    </InputGroup>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Signin
                </Button>
            </Form>   
            <div className="left-bg"><img src="/left-bg.png"/> </div>         
            <div className="right-bg">
                <img src="/left-bg.png"/>    
            </div>         

        </div>
    )
}

export default Login
