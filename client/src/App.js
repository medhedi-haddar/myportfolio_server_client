import React,{useEffect} from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Admin from './Admin/Admin';
import './App.css';
import {createBrowserHistory} from "history";
import HomePage from './Client/Components/HomePage';
import Login from './Admin/Components/Login/Login';
import AOS from 'aos';
import 'aos/dist/aos.css';
import useLogin from './Hooks/useLogin';
import AboutMe from './Admin/Components/AboutMe/AboutMe'
import Skills from './Admin/Components/Skills/Skills'
import Projects from './Admin/Components/Projects/Projects';
import AddProject from './Admin/Components/Projects/AddProject'
import UpdateProject from './Admin/Components/Projects/UpdateProject'
import Experiences from './Admin/Components/Experience/Experience'
import AddExperience from './Admin/Components/Experience/AddExperience';
import UpdateExperience from './Admin/Components/Experience/UpdateExperience'


const App =() => { 

  const history = createBrowserHistory();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/> 

          <Route path="admin/login"            element={<Login            history={history} />}/> 
          {/* <Route path="/admin"                 element={<Admin            history={history} />}/> 
          <Route path="/admin/about_me"        element={<AboutMe          history={history} />}/> 
          <Route path="/admin/skills"          element={<Skills           history={history} />}/> 
          <Route path="/admin/projects"        element={<Projects         history={history} />}/> 
          <Route path="/admin/add_project"     element={<AddProject       history={history} />}/> 
          <Route path="/admin/up_project/:id"  element={<UpdateProject    history={history} />}/>   
          <Route path="/admin/experience"      element={<Experiences      history={history} />}/> 
          <Route path="/admin/add_experience"  element={<AddExperience    history={history} />}/> 
          <Route path="/admin/up_experience"   element={<UpdateExperience history={history} />}/>   */}

       {/*    <Route path="admin/login"           history={history} element={<Login history={history} />}/> */}
          <Route path="/admin"                history={history} element={<Admin  requestedComponent=""  />}/> 
          <Route path="/admin/about_me"       history={history} element={<Admin  requestedComponent="about_me"/>}/> 
          <Route path="/admin/skills"         history={history} element={<Admin  requestedComponent="skills"/>}/> 
          <Route path="/admin/projects"       history={history} element={<Admin  requestedComponent="projects"/>}/> 
          <Route path="/admin/add_project"    history={history} element={<Admin  requestedComponent="add_project"/>}/> 
          <Route path="/admin/up_project/:id" history={history} element={<Admin  requestedComponent="up_project"/>}/> 
          <Route path="/admin/experience"     history={history} element={<Admin  requestedComponent="experience"/>}/> 
          <Route path="/admin/add_experience" history={history} element={<Admin  requestedComponent="add_experience"/>}/> 
          <Route path="/admin/up_experience"  history={history} element={<Admin  requestedComponent="up_experience"/>}/> 
          <Route path="/admin/messages"       history={history} element={<Admin  requestedComponent="messages"/>}/>  


        </Routes>
      </BrowserRouter>
    </>
  )
} 

export default App;