import React, { useState, useEffect, useRef } from 'react'
import { FiMenu,FiX } from "react-icons/fi";
import { Container,Row,Col,Button } from 'react-bootstrap';
import {Link} from 'react-scroll'
import { StickyNav } from 'react-js-stickynav'
import 'react-js-stickynav/dist/index.css'

const NavBarMenu = () => {
    
    const  [menuIsActive,setMenuIsActive] = useState('');
    
    const handleMenu = (e)=>{
        e.preventDefault(); 
        (menuIsActive === '') ? setMenuIsActive('active') : setMenuIsActive(''); 
    }

    let ref = useRef(null);
    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setMenuIsActive('');
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
        document.removeEventListener('click', handleClickOutside, true);
        };
    });

    return (
        
        <div>
            <StickyNav length='89'> 
                <div className="wolf-navbar">
                    <Container className="  align-items-center">
                        <Row>
                            <div  className="d-flex justify-content-between align-items-center col-xxl-3 col-xl-2 col-lg-2 col-md-12 col-sm-12 ps-0">
                                <div className="wolf-navbar-brand">
                                    <img src="/brand-icon.svg" width="50px"/> <span>My Portfolio</span>
                                </div>
                                <div className="sanduich-menu-button">
                                    <Button className="button-sanduich" onClick={handleMenu}>
                                        {menuIsActive === ''&&
                                        
                                        <FiMenu size={20}/> 
                                        }{menuIsActive === 'active' && 
                                        
                                        <FiX size={20}/> 
                                        }

                                    </Button>
                                </div> 
                            </div>
                            <div  className="d-flex align-items-center justify-content-center col-xxl-6 col-xl-6 col-md-6 col-lg-7 col-sm-6" ref={ref}>
                                <div className={`wolf-navbar-menu-div ${menuIsActive}`} style={{background : 'url(/color-bg.jpg)'}}>
                                    <div className="wolf-navbar-menu-head"><a href="#" ><img src="/brand-icon.svg" width="50px"/>       <span>My Portfolio</span></a></div>
                                    <div className="wolf-navbar-menu"> 
                                        <ul className="wolf-navbar-menu-ul" onClick={handleMenu}> 
                                            <li className="wolf-navbar-item hovered" ><Link to="Aboutme" spy={true} smooth={true} duration={500} onClick={handleMenu} >About me</Link></li>
                                            <li className="wolf-navbar-item hovered" ><Link  to="Skills" spy={true} smooth={true} duration={500} onClick={handleMenu} >Skills</Link></li>
                                            <li className="wolf-navbar-item hovered" ><Link  to="Projects" spy={true} smooth={true} duration={500} onClick={handleMenu} >Projects</Link></li>
                                            <li className="wolf-navbar-item hovered" ><Link  to="Experience" spy={true} smooth={true} duration={500} onClick={handleMenu} >Experience</Link></li>
                                        </ul>    
                                    </div>
                                </div>  
                            </div>
                            <Col>
                                
                            </Col>         
                        </Row>
                    </Container>
                </div>
            </StickyNav>
        </div>
    )
}

export default NavBarMenu
