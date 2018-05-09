import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FileUpload from './components/FileUpload';
import CurriculumBuilder from './components/CurriculumBuilder/CurriculumBuilder'

class App extends Component {
  render() {
    return (
      <div className="App">
        <CurriculumBuilder />
        {/* <FileUpload/> */}
      </div>
    );
  }
}

export default App;
