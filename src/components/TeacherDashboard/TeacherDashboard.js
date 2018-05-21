import React, { Component } from 'react';
import TeacherCurrentCourses from './TeacherCurrentCourses';
import TeacherCourseTemplates from './TeacherCourseTemplates';
import Navbar from './../Navbar/Navbar';

import { connect } from 'react-redux'
import { getCurricula } from '../../dux/teacherReducer'

class TeacherDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }


    componentDidMount(){
        this.props.getCurricula()
    }
    render() { 
        return ( 
<div>
    <Navbar/>
    <h1>Teacher Dashboard</h1>
    <div className='ui container'>


    <div style={{margin: 0}} className='ui segment left floated' ><TeacherCourseTemplates/></div>



 <div style={{margin: 0}} className='ui segment right floated'><TeacherCurrentCourses/></div>
    
    </div>
    
    
</div>

         )
    }
}

function mapStateToProps(state) {
    return {
        curricula: state.teachers.curricula
    }
}
 
export default connect( mapStateToProps, {getCurricula} ) (TeacherDashboard);