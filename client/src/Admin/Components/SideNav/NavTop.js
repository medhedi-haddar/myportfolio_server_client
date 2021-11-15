import React from 'react'
import {MdOutlineMenu, MdOutlinePersonOutline, MdLogout} from  "react-icons/md";
import {Container, Navbar, Button, DropdownButton,Dropdown} from "react-bootstrap";

const NavTop = () => {
    return (
        
        <Navbar bg="light" className="border-bottom">
            <Container fluid>
                    <Button variant={"light"} > <MdOutlineMenu/> </Button>
                    <DropdownButton  align="end" id="dropdown-basic-button-light" variant={"light"} title={<MdOutlinePersonOutline/>}>
                        <Dropdown.Item className="d-flex justify-content-between" onClick={() => {console.log("hello there i'm going out Bye !")}}>
                            <span> Log out </span>
                            <MdLogout/>
                        </Dropdown.Item>
                    </DropdownButton>
            </Container>
        </Navbar>  
        
    )
}

export default NavTop
