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
            templateInput: ''
         }
    }

    componentDidMount(){
        this.props.getCurricula(1)
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
                                    />
                                <Form.Dropdown 
                                    label='Select Curriculum'  
                                    selection 
                                    options={ curriculumTemplate } 
                                    onChange={(e, data) => this.setState({templateInput: data.value})}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Input 
                                    type='date' 
                                    label='Start Date' 
                                    placeholder='Start Date' 
                                    onChange={(e) => this.setState({startDateInput: e.target.value})} />
                            </Form.Group>
                            <Button primary >Submit Course</Button>
                            <Button>Cancel</Button>
                        </Form>
                    </div>
                    
                    
                    { buttonsShowing &&
                    <CourseBuilderTool 
                        courseInfo = {'course info goes here? how the hell do i get this?'} 
                        template={ this.state.templateInput }
                        startDate = {this.state.startDateInput} 
                        endDate = {this.state.endDateInput} />
                    }

                </div>
                        
                    <div className='ui segment' style={{margin: 0}}>
                    <StudentSelector />
                    </div>
                    <div>

    </div>
    </div>
</div>  
         )
    }
};

function mapStateToProps(state){
    return {
        curricula: state.teachers.curricula
    }
}
 
export default connect(mapStateToProps, { getCurricula })(CourseBuilder);