import React from 'react';
import logo from './logo.svg';
import './App.css';
import Task from './component/Task';
import {Route, Router , Routes } from 'react-router-dom'
import CaptionPage from './component/CaptionPage';
function App() {
  return (
    <div className="App">
      {/* <Router> */}
        <Routes>
          <Route path="/" element={<Task/>}/>
          <Route path="/caption/:name" element={<CaptionPage/>}/>
        </Routes>
      {/* </Router> */}
     {/* <Task/> */}
    </div>
  );
}

export default App;
