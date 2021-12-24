import { useState, useEffect, useRef } from 'react'
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
    });

    return (
        <StickyNav length='89'> 
            <div className="wolf-navbar">
                <Container className="overflow-hidden  align-items-center">
                    <Row className="navbar navbar-client">
                        <Col className="d-flex justify-content-between align-items-center" sm={12} md={12} lg={3} xl={2} xxl={3}>
                            <div className="wolf-navbar-brand">
                                <img src="/brand-icon.svg" width="50px"/> <span>My Portfolio</span>
                            </div>
                            <div className="sanduich-menu-button">
                                <Button className="button-sanduich" onClick={handleMenu}>
                                    {menuIsActive === '' && <FiMenu size={20}/> }
                                    {menuIsActive === 'active' &&   <FiX size={20}/> }
                                </Button>
                            </div> 
                        </Col>
                        <Col  className="d-flex align-items-center justify-content-between" lg={9} xl={10} xxl={9} ref={ref}>
                            <div className={`wolf-navbar-menu-div ${menuIsActive}`} 
                            // style={{background : 'url(/color-bg.jpg)'}}
                            >
                                <div className="wolf-navbar-menu-head"><a href="#" ><img src="/brand-icon.svg" width="50px"/>       
                                <span>My Portfolio</span></a></div>
                                <div className="wolf-navbar-menu"> 
                                    <ul className="wolf-navbar-menu-ul" onClick={handleMenu} > 
                                        <li className="wolf-navbar-item hovered" ><Link to="AboutMe" title="About Me" spy={true} smooth={true} duration={500} onClick={handleMenu} >About Me</Link></li>
                                        <li className="wolf-navbar-item hovered" ><Link to="Skills" title="Skills" spy={true} smooth={true} duration={500} onClick={handleMenu} >Skills</Link></li>
                                        <li className="wolf-navbar-item hovered" ><Link to="Projects" title="Projects" spy={true} smooth={true} duration={500} onClick={handleMenu} >Projects</Link></li>
                                        <li className="wolf-navbar-item hovered" ><Link to="Experience" title="Experience" spy={true} smooth={true} duration={500} onClick={handleMenu} >Experience</Link></li>
                                        <li className="wolf-navbar-item hovered" ><Link to="Education" title="Education" spy={true} smooth={true} duration={500} onClick={handleMenu} >Education</Link></li>
                                        <li className="wolf-navbar-item hovered" ><Link to="HireMe" title="Hire Me" spy={true} smooth={true} duration={500} onClick={handleMenu} >Hire Me</Link></li>
                                    </ul>    
                                </div>
                            </div>  
                        </Col>
       
                    </Row>
                </Container>
            </div>
        </StickyNav>
    )
}

export default NavBarMenu
