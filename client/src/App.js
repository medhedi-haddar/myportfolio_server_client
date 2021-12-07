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
          <Route path="/"                                                      history={history} element={<Front />}/> 
          <Route path={`${process.env.REACT_APP_ADMIN_BASE_URL}/login`}                  history={history} element={<Login />}/> 
          <Route path={`${process.env.REACT_APP_ADMIN_BASE_URL}`}                        history={history} element={<Admin  requestedComponent=""/>}/> 
          <Route path={`${process.env.REACT_APP_ADMIN_BASE_URL}/edit_profile`}           history={history} element={<Admin  requestedComponent="edit_profile"  />}/> 
          <Route path={`${process.env.REACT_APP_ADMIN_BASE_URL}/about_me`}               history={history} element={<Admin  requestedComponent="about_me"/>}/> 
          <Route path={`${process.env.REACT_APP_ADMIN_BASE_URL}/up_aboutme`}             history={history} element={<Admin  requestedComponent="up_aboutme"/>}/> 
          <Route path={`${process.env.REACT_APP_ADMIN_BASE_URL}/skills`}                 history={history} element={<Admin  requestedComponent="skills"/>}/> 
          <Route path={`${process.env.REACT_APP_ADMIN_BASE_URL}/up_skills`}              history={history} element={<Admin  requestedComponent="up_skills"/>}/> 
          <Route path={`${process.env.REACT_APP_ADMIN_BASE_URL}/projects`}               history={history} element={<Admin  requestedComponent="projects"/>}/> 
          <Route path={`${process.env.REACT_APP_ADMIN_BASE_URL}/add_project`}            history={history} element={<Admin  requestedComponent="add_project"/>}/> 
          <Route path={`${process.env.REACT_APP_ADMIN_BASE_URL}/up_project/:id`}         history={history} element={<Admin  requestedComponent="up_project"/>}/> 
          <Route path={`${process.env.REACT_APP_ADMIN_BASE_URL}/experiences`}            history={history} element={<Admin  requestedComponent="experiences"/>}/> 
          <Route path={`${process.env.REACT_APP_ADMIN_BASE_URL}/add_experience`}         history={history} element={<Admin  requestedComponent="add_experience"/>}/> 
          <Route path={`${process.env.REACT_APP_ADMIN_BASE_URL}/up_experience/:id_exp`}  history={history} element={<Admin  requestedComponent="up_experience"/>}/> 
          <Route path={`${process.env.REACT_APP_ADMIN_BASE_URL}/educations`}             history={history} element={<Admin  requestedComponent="educations"/>}/> 
          <Route path={`${process.env.REACT_APP_ADMIN_BASE_URL}/add_education`}          history={history} element={<Admin  requestedComponent="add_education"/>}/> 
          <Route path={`${process.env.REACT_APP_ADMIN_BASE_URL}/up_education/:id_edu`}   history={history} element={<Admin  requestedComponent="up_education"/>}/> 
          <Route path={`${process.env.REACT_APP_ADMIN_BASE_URL}/messages`}               history={history} element={<Admin  requestedComponent="messages"/>}/>  
          <Route path="*"                                                      history={history} element={<Admin  requestedComponent="notFound"/>}/>
        </Routes>
      </BrowserRouter>
  )
} 

export default App;