import React, { Component } from 'react';
import StudentSelector from './StudentSelector';
import CourseBuilderTool from './CourseBuilderTool';
import moment from 'moment';

import './CourseBuilder.css'

import { Form } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { updateCourseStudents } from '../../dux/teacherReducer'

class CourseBuilder extends Component {

    constructor(props) {
        super(props);

        let routeParams = this.props.match ? this.props.match.params.courseid : null

        if( routeParams ){

            let filteredCourse = this.props.courses.filter( course => course.id === +routeParams)[0]

            this.props.updateCourseStudents( filteredCourse.students )

            let { days, selected_days: selectedDays, curriculum_id: curriculumId, start_date: startDate, course_name: courseName } = filteredCourse
            
            this.state = {
                days: days,
                selectedDays: selectedDays, 
                courseTemplates: this.props.curricula,
                startDateInput: moment(startDate).format('YYYY-MM-DD'),
                templateInput: curriculumId,
                courseNameInput: courseName,
            }

        } else {

            this.state = {
                days: [],
                selectedDays: [], 
                courseTemplates: [],
                startDateInput: '',
                endDateInput: '',
                templateInput: '',
                courseNameInput: '',
            }
        }
    }


    handleDropdown = (e, data) => {
      this.setState({
          templateInput: data.value,
          selectedDays: [],
        })
    }

    submitFn = () => {
        this.props.history.push('/teacherdashboard')
    }


    
    render() {
          const curriculumTemplate = this.props.curricula.map( template => {
            return {
                text: template.curriculum_name,
                value: template.id
            }
        })

        let buttonsShowing = this.state.templateInput !== '' && this.state.startDateInput !== '';

        let routeParams = this.props.match 
            ? this.props.match.params.courseid
            : null

        let courseStudentIds = null;

        let editingCourse = null;

        if( this.props.match ) {
            if( this.props.match.params.courseid ) {
                editingCourse = this.props.courses
                .filter( course => course.id === +routeParams)[0]
                
                courseStudentIds = editingCourse.students
                .map( student => student.id )
            }
        }

        return ( 
            <div className='cb-home-outer-container'>
                <h1> Course Builder</h1>
                <div className="cb-home-container">
                

                <div style={{marginRight: 20}}>
                    <div className='ui teal segment cb-home-input-group'>
                        <Form className='cb-home-input' >
                            { routeParams && <h3>Editing course #{ `${routeParams}: ${editingCourse.course_name}` }</h3> }
                            <Form.Group widths='equal'>
                                <Form.Input 
                                    label='Course Name' 
                                    placeholder='Name of Course'
                                    onChange={ (e) => this.setState({courseNameInput: e.target.value})}
                                    value={ this.state.courseNameInput } 
                                    />
                                <Form.Dropdown 
                                    label='Select Curriculum'  
                                    selection 
                                    options={ curriculumTemplate } 
                                    onChange={ this.handleDropdown }
                                    value={ this.state.templateInput }/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Input 
                                    type='date' 
                                    label='Start Date' 
                                    placeholder='Start Date' 
                                    onChange={(e) => this.setState({startDateInput: e.target.value})} 
                                    value={ this.state.startDateInput } />
                            </Form.Group>
                        </Form>
                    </div>
                    
                    
                    { buttonsShowing &&
                    <CourseBuilderTool 
                        template={ this.state.templateInput }
                        startDate = {this.state.startDateInput} 
                        courseName={ this.state.courseNameInput } 
                        submitFn={ this.submitFn } 
                        routeParams={ routeParams } 
                        selectedDays={ this.state.selectedDays }/>
                }
                
                </div>
                        
                <div className='ui orange segment' style={{margin: 0}}>
                    <StudentSelector 
                        studentIds={ courseStudentIds } />
                </div>
            </div>
        </div>  
         )
    }
};

function mapStateToProps(state){
    return {
        curricula: state.teachers.curricula,
        courses: state.teachers.courses
    }
}

export default connect(mapStateToProps, { updateCourseStudents })(CourseBuilder);