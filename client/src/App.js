import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Admin from './Admin/Admin';
import './App.css';
import {createBrowserHistory} from "history";
import HomePage from './Client/Components/HomePage';


class App extends Component {

  
   
  render() {
    const history = createBrowserHistory();

    return (
      <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}/> 
          <Route path="/admin" history={history}  element={<Admin/>}/> 
          {/* <Route path="/login" history={history}  element={<Login/>}/>  */}
          <Route path="/admin/about_me"   history={history} element={<Admin requestedComponent="about_me"/>}/> 
          <Route path="/admin/skills"   history={history} element={<Admin requestedComponent="skills"/>}/> 
          <Route path="/admin/projects"   history={history} element={<Admin requestedComponent="projects"/>}/> 
          <Route path="/admin/add_project"   history={history} element={<Admin requestedComponent="add_project"/>}/> 
          <Route path="/admin/up_project/:id"   history={history} element={<Admin requestedComponent="up_project"/>}/> 
          <Route path="/admin/experience"   history={history} element={<Admin requestedComponent="experience"/>}/> 
          <Route path="/admin/add_experience"   history={history} element={<Admin requestedComponent="add_experience"/>}/> 
          <Route path="/admin/up_experience"   history={history} element={<Admin requestedComponent="up_experience"/>}/> 
          <Route path="/admin/gallery"   history={history} element={<Admin requestedComponent="gallery"/>}/> 
          <Route path="/admin/messages"   history={history} element={<Admin requestedComponent="messages"/>}/> 
        </Routes>
       
      </Router>
      </>
    )
  }
}

export default App;