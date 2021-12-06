import React from 'react'
import { Container, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import UpdateSkillsForm from './Form/UpdateSkillsForm';
import Loader from '../../../Loader/Loader'
import { FiEdit } from "react-icons/fi";

const UpdateSkills = () => {
    
    const skills = useSelector((state) => state.skills);
    // useSelector((state) => {console.log(state)});
    return ( 
        <div className="component_body"> 
            <div className="component_title ">
                <Container fluid className="d-flex justify-content-start"> 
                    <h2 className="d-flex align-items-center">Update Skills</h2>             
                </Container>
            </div>
            {!skills.length ? <Loader/> :  
                <UpdateSkillsForm skills={skills[0]}/> 
            }
        </div>
    )
}

export default UpdateSkills
