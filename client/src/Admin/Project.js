import React from 'react'

import { useDispatch } from 'react-redux';

const Project = ({project ,setCurrentId}) => {
    const dispatch = useDispatch();
    return (
        <div>
            <h1>{project.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: project.description}}/>
            <img src={project.cover.url}/>
        </div>
    )
}

export default Project
