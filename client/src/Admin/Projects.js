
import React from 'react';
import { useSelector } from 'react-redux';
import Project from './Project';

const Projects = ({ setCurrentId }) => {
  const projects = useSelector((state) => state.projects);


  return (
    // !projects.length ? <h1>loading...</h1> : (
      <div >
        {projects.map((project,index) => (
          <div key={index} item xs={12} sm={6} md={6}>
            <Project project={project} setCurrentId={setCurrentId} />
          </div>
        ))}
      </div>
    // )
  );
};

export default Projects