import React, { Component } from 'react';
import Navbar from './../Navbar/Navbar';
import Sidenav from '../sideNav/SideNav';

class StudentDashboard extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Sidenav />
        
      </div>
    )
  }
}

export default StudentDashboard
