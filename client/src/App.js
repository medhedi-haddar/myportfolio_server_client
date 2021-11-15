import React, { Component } from 'react';
import { BrowserRouter as Router, Routes,Switch, Route, Link} from "react-router-dom";
import Admin from './Admin/Admin';
import AboutMe from './Admin/Components/AboutMe/AboutMe';
import './App.css';
import {createBrowserHistory} from "history";

class App extends Component {

  
  render() {
    const history = createBrowserHistory();
    return (
      <>
      {/* <Router> */}
        <Routes>
        {/* <Route path="/" element={<Admin/>}/>  */}
          <Route path="/admin" element={<Admin/>}/> 
          {/* <Route path="/login" element={<Login/>}/>  */}
          <Route path="/admin/about_me"   history={history} element={<Admin requestedComponent="about_me"/>}/> 
          <Route path="/admin/about_me_up"   history={history} element={<Admin requestedComponent="about_me_up"/>}/> 
          <Route path="/admin/skills"   history={history} element={<Admin requestedComponent="skills"/>}/> 
          <Route path="/admin/projects"   history={history} element={<Admin requestedComponent="projects"/>}/> 
          <Route path="/admin/gallery"   history={history} element={<Admin requestedComponent="gallery"/>}/> 
          <Route path="/admin/messages"   history={history} element={<Admin requestedComponent="messages"/>}/> 
          
        </Routes>
        <Link to={'/admin'}>go to admin</Link>
        <h1>client</h1>
      {/* </Router> */}
      </>
    )
  }
}

export default App;