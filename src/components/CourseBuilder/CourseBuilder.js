import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import StudentSelector from './StudentSelector';
import CourseBuilderTool from './CourseBuilderTool';
import moment from 'moment';

import './CourseBuilder.css'

import { Input, Form, Dropdown, Button } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { getCurricula } from '../../dux/teacherReducer'

class CourseBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            days: [],
            selectedDays: [], 
            courseTemplates: [],
            startDateInput: '',
            endDateInput: '',
            templateInput: '',
            courseNameInput: ''
         }
    }

    componentDidMount(){
        // Change to get all curricula all over the place
        this.props.getCurricula()
    }

    handleDropdown = (e, data) => {
      this.setState({
          templateInput: data.value,
          selectedDays: [],
        })
    }


    
    render() {
          const curriculumTemplate = this.props.curricula.map( template => {
            return {
                text: template.curriculum_name,
                value: template.id
            }
        })

        let buttonsShowing = this.state.templateInput !== '' && this.state.startDateInput !== '';

        let curriculumOptions = this.props.curr

        return ( 
            <div className='cb-home-outer-container'>
                <h1> Course Builder</h1>
                <div className="cb-home-container">
                

                <div style={{marginRight: 20}}>
                    <div className='ui segment cb-home-input-group'>
                        <Form className='cb-home-input' >
                            <Form.Group widths='equal'>
                                <Form.Input 
                                    label='Course Name' 
                                    placeholder='Name of Course'
                                    onChange={ (e) => this.setState({courseNameInput: e.target.value})} 
                                    />
                                <Form.Dropdown 
                                    label='Select Curriculum'  
                                    selection 
                                    options={ curriculumTemplate } 
                                    onChange={ this.handleDropdown }/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Input 
                                    type='date' 
                                    label='Start Date' 
                                    placeholder='Start Date' 
                                    onChange={(e) => this.setState({startDateInput: e.target.value})} />
                            </Form.Group>
                        </Form>
                    </div>
                    
                    
                    { buttonsShowing &&
                    <CourseBuilderTool 
                    template={ this.state.templateInput }
                    startDate = {this.state.startDateInput} 
                    courseName={ this.state.courseNameInput } />
                }
                
                </div>
                        
                <div className='ui segment' style={{margin: 0}}>
                    <StudentSelector />
                </div>
            </div>
        </div>  
         )
    }
};

function mapStateToProps(state){
    return {
        curricula: state.teachers.curricula,
    }
}

export default connect(mapStateToProps, { getCurricula })(CourseBuilder);