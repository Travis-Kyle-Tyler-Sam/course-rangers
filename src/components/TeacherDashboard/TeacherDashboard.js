import React, { Component } from 'react';
import TeacherCurrentCourses from './TeacherCurrentCourses';
import TeacherCourseTemplates from './TeacherCourseTemplates';
import Navbar from './../Navbar/Navbar';
import { Segment } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { getCurricula } from '../../dux/teacherReducer'

import './TeacherDashboard.css'

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
<div className='td-container'>
    <h1>Teacher Dashboard</h1>
    <div className='td-segment-container'>
    

        {/* <div style={{margin: 0}} className='ui segment' ><TeacherCourseTemplates/></div>

        <div style={{margin: 0}} className='ui segment'><TeacherCurrentCourses/></div> */}

        <Segment
            color='pink'>
            <TeacherCourseTemplates/>
        </Segment>
        
        <Segment
            style={{margin: 0}}
            color='yellow'>
            <TeacherCurrentCourses/>
        </Segment>
    
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