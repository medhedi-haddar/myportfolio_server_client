import React,{useState,useEffect} from 'react'
import { Form,Button } from 'react-bootstrap';
import { login } from '../../../apis/PostApi'
import { useNavigate, Navigate} from 'react-router-dom';
import { getFromStorage } from '../../../Utils/Storage'
import { useDispatch } from 'react-redux';
import {signin} from '../../actions/auth'


const Login = () => {

    const dispatch = useDispatch();
    const navigate  = useNavigate();
    const [loginData, setLoginData] = useState({
        emaill: '',
        password : ''
    })
    const onChangeHanndle = (e)=>{
        e.preventDefault()
        setLoginData({
            ...loginData,
            [e.target.name] : e.target.value
        })
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        dispatch(signin(loginData, navigate));
    }

    useEffect(() => {  
       const result =  getFromStorage("profile"); 
        if(result?.token){
            navigate('/admin/about_me')
        }
    }, [])

    return (
        <div className="login">
            <h2>Login admin</h2>
            <Form className="login-form" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="email" value={loginData.email} onChange={onChangeHanndle} />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password"  placeholder="Email" name="password" value={loginData.password} onChange={onChangeHanndle} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
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
