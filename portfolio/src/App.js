import React, { Component } from 'react';
import { BrowserRouter as Router, Routes,Switch, Route} from "react-router-dom";
import Admin from './Admin/Admin';
import AboutMe from './Admin/Components/AboutMe/AboutMe';
import './App.css';


class App extends Component {

  render() {
    return (
      <Router>
        <Routes>
        {/* <Route path="/" element={<Admin/>}/>  */}
          <Route path="/admin" element={<Admin/>}/> 
          {/* <Route path="/login" element={<Login/>}/>  */}
          <Route path="/admin/about_me" element={<Admin requestedComponent="about_me"/>}/> 
          <Route path="/admin/about_me_up" element={<Admin requestedComponent="about_me_up"/>}/> 
          <Route path="/admin/skills" element={<Admin requestedComponent="skills"/>}/> 
          <Route path="/admin/projects" element={<Admin requestedComponent="projects"/>}/> 
          <Route path="/admin/gallery" element={<Admin requestedComponent="gallery"/>}/> 
          <Route path="/admin/messages" element={<Admin requestedComponent="messages"/>}/> 
          
        </Routes>

      </Router>
    )
  }
}

export default App;