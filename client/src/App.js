import React from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Admin from './Admin/Admin';
import './App.css';
import {createBrowserHistory} from "history";
import Front from './Client/Front';
import Login from './Admin/Components/Login/Login';

const App =() => { 

  const history = createBrowserHistory();
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/"                               history={history} element={<Front />}/> 
          <Route path={`/admin/login`}                  history={history} element={<Login />}/> 
          <Route path={`/admin`}                        history={history} element={<Admin  requestedComponent=""/>}/> 
          <Route path={`/admin/edit_profile`}           history={history} element={<Admin  requestedComponent="edit_profile"  />}/> 
          <Route path={`/admin/about_me`}               history={history} element={<Admin  requestedComponent="about_me"/>}/> 
          <Route path={`/admin/up_aboutme`}             history={history} element={<Admin  requestedComponent="up_aboutme"/>}/> 
          <Route path={`/admin/skills`}                 history={history} element={<Admin  requestedComponent="skills"/>}/> 
          <Route path={`/admin/up_skills`}              history={history} element={<Admin  requestedComponent="up_skills"/>}/> 
          <Route path={`/admin/projects`}               history={history} element={<Admin  requestedComponent="projects"/>}/> 
          <Route path={`/admin/add_project`}            history={history} element={<Admin  requestedComponent="add_project"/>}/> 
          <Route path={`/admin/up_project/:id`}         history={history} element={<Admin  requestedComponent="up_project"/>}/> 
          <Route path={`/admin/experiences`}            history={history} element={<Admin  requestedComponent="experiences"/>}/> 
          <Route path={`/admin/add_experience`}         history={history} element={<Admin  requestedComponent="add_experience"/>}/> 
          <Route path={`/admin/up_experience/:id_exp`}  history={history} element={<Admin  requestedComponent="up_experience"/>}/> 
          <Route path={`/admin/educations`}             history={history} element={<Admin  requestedComponent="educations"/>}/> 
          <Route path={`/admin/add_education`}          history={history} element={<Admin  requestedComponent="add_education"/>}/> 
          <Route path={`/admin/up_education/:id_edu`}   history={history} element={<Admin  requestedComponent="up_education"/>}/> 
          <Route path={`/admin/medias`}                 history={history} element={<Admin  requestedComponent="medias"/>}/>  
          <Route path="*"                               history={history} element={<Admin  requestedComponent="notFound"/>}/>
        </Routes>
      </BrowserRouter>
  )
} 

export default App;