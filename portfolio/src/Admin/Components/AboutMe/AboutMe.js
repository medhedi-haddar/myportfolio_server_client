import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { MdOutlineEditNote } from "react-icons/md";
import { Link } from 'react-router-dom';

const AboutMe = () => {


    return (
        <div>
            <div className="component_title d-flex justify-content-between">
                <h2>About Me</h2>
                
                    <Link to={'/admin/about_me_up'} variant={"light"}><Button variant="light"><MdOutlineEditNote/></Button></Link>
                
            </div>

        </div>
    )
}

export default AboutMe
