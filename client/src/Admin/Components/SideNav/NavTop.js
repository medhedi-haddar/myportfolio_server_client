import React,{useEffect, useState} from 'react'
import {MdOutlineMenu, MdOutlinePersonOutline, MdLogout} from  "react-icons/md";
import {Container, Navbar, Button, DropdownButton,Dropdown} from "react-bootstrap";
import { useNavigate,useLocation } from 'react-router-dom';
import { useDispatch} from 'react-redux'
import decode from 'jwt-decode';

const NavTop = ({toggleSideNav}) => {

    const navigate  = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const [user , setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    const handleLogOut = () => {

        dispatch({ type : 'LOGOUT'});
        navigate(`${process.env.REACT_APP_ADMIN_BASE_URL}/login`);
        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;
        if(!token){
            navigate(`${process.env.REACT_APP_ADMIN_BASE_URL}/login`) 
        }
        if(token){
            const decodeedToken = decode(token);
            if( decodeedToken.exp * 1000 < new Date().getTime()) handleLogOut();
        }
        setUser(JSON.parse(localStorage.getItem('profile')))

    }, [location])

    return (
        <Navbar bg="light" className="border-bottom">
            <Container fluid>
                    <Button variant={"light"} onClick={toggleSideNav}> <MdOutlineMenu/> </Button>
                    <DropdownButton  align="end" id="dropdown-basic-button-light" variant={"light"} 
                    title={(user?.token 
                        ? <><small className="p-1"><b>{user?.result?.lastName.charAt(0).toUpperCase()}.</b>{user?.result?.firstName}</small><MdOutlinePersonOutline/></> 
                        : <MdOutlinePersonOutline/>)}>
                        <Dropdown.Item className="d-flex justify-content-between" onClick={handleLogOut}>
                            <span> Log out </span>
                            <MdLogout/>
                        </Dropdown.Item>
                    </DropdownButton>
            </Container>
        </Navbar>  
        
    )
}

export default NavTop
