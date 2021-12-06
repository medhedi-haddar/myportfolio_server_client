import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FaGithub ,FaRegCopyright, FaRegEnvelope} from "react-icons/fa";
import {Fw700, Fw900, Textinfo, Small, TextBlueGray, LightButton} from '../../StyledComponents/StyledComponents'
import { DiReact,DiSass, DiJavascript,DiHtml5,DiCss3,DiMongodb,DiNodejsSmall, DiPhp, DiGit ,DiMysql, DiStackoverflow,DiVisualstudio,DiSublime,DiIntellij,DiIllustrator, DiAptana,DiPhotoshop} from "react-icons/di";
import { SiRedux, SiLinkedin } from "react-icons/si";


const Footer = () => {

    return (
        <section className="footer" id="hireMe">
            <Container className="footer-head">
                <div className=" inner-footer-head p-4 d-flex justify-content-between align-items-center">
                <h4 className="text-light text-uppercase fw-100">Looking for a new collaborater ?</h4>
                <div className="d-flex">
                    <TextBlueGray className="me-2"><Small><LightButton href="https://www.linkedin.com/in/med-hedi-haddar/" target="_blank">  <SiLinkedin/></LightButton></Small></TextBlueGray>
                    <TextBlueGray><Small><LightButton href="mailto:medhedi.haddar@gmail.com?subject=Contact%20from%20HADDAR%20Med%20Elhedi%20's%20portfolio" target="_blank"> Hire Me <FaRegEnvelope/></LightButton></Small></TextBlueGray>
                </div>
                </div>
                </Container>
            <Container>
                <Row>
                    <Col md={12} lg={6} className="mb-5">
                    <Fw900>So, What do you think ?... </Fw900>
                        <p>My portfolio was created on <Fw700>React.js </Fw700> using <Fw700>React Redux CRUD </Fw700>
                        for the front side and <Fw700>Node.js <small> [ express.js ] </small> </Fw700> for the back side . </p>
                        <Textinfo >
                            <Fw700>./</Fw700> For more details i'll soon make the <FaGithub/> GitHub link of the whole project.
                        </Textinfo>
                        <p> Meanwhile, you can contact me for questions or future projects, i'm looking for a new job as a frontEnd or a fullStack .js developer. </p>
                       
                       
                    </Col>
                    <Col md={12} lg={6} className="mb-5 ">
                        <div className="footer-dev-list d-flex wrap justify-content-xs-center justify-content-sm-center justify-content-md-center justify-content-lg-end">
                            <div><DiReact           size={27}/> React.js</div>
                            <div><SiRedux           size={27}/> Redux</div>
                            <div><DiJavascript      size={27}/> JavaScript</div>
                            <div><DiHtml5           size={27}/> HTML5</div>
                            <div><DiCss3            size={27}/> Css3</div>
                            <div><DiSass            size={27}/> Sass</div>
                            <div><DiNodejsSmall     size={27}/> Node.js</div>
                            <div><DiPhp             size={27}/> Php</div>
                            <div><DiGit             size={27}/> Git</div>
                            <div><DiMongodb         size={27}/> MongoDB</div>
                            <div><DiMysql           size={27}/> Mysql</div>
                            <div><DiStackoverflow   size={27}/> Stack overflow</div>
                            <div><DiVisualstudio    size={27}/> VSCode</div>
                            <div><DiSublime         size={27}/> Sublime Text</div>
                            <div><DiIntellij        size={27}/> Intellij idea</div>
                            <div><DiPhotoshop       size={27}/> Photoshop</div>
                            <div><DiIllustrator     size={27}/> Illustrator</div>
                        </div>
                    </Col>

                </Row>
            </Container>    
            <div className=" bottom-footer d-flex p-4 justify-content-center">
            <TextBlueGray><Small>Copyright <FaRegCopyright className="mx-1"/> v1.0 </Small></TextBlueGray>
            </div>
        </section>
    )
}

export default Footer
