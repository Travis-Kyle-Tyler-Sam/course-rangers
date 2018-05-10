import React, { Component } from 'react';
import TeacherCurrentCourses from './TeacherCurrentCourses';
import TeacherCourseTemplates from './TeacherCourseTemplates';

class TeacherDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
<div>
    <h1>Teacher Dashboard</h1>
    <div className='ui container'>


    <div className='ui segment left floated' ><TeacherCourseTemplates/></div>



 <div className='ui segment right floated'><TeacherCurrentCourses/></div>
    
    </div>
    
    
</div>

         )
    }
}
 
export default TeacherDashboard;