import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { Card, Icon, Image, Input, Button, TextArea, Form, Header, Checkbox, Message } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { getCurricula } from '../../dux/teacherReducer'


import './TeacherCourseTemplates.css'

class TeacherCourseTemplates extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            courseTemplates: []
         }
    }

deleteCourseTemplate(id){
        
    axios.delete(`/api/curriculum/${id}`).then(response =>{
     return this.props.getCurricula()
    })
}

    render() { 
       let currentTemplates = this.props.curricula.map(template=>{
        return <div className='ct-list' key={template.id}><span>{template.curriculum_name}</span>
        <span><Link to={ `/curriculumbuilder/${template.id}` }  >
            <Button basic icon circular><Icon name="edit"/></Button>
             </Link></span>
        <span><Button basic icon circular onClick={()=>{
            this.deleteCourseTemplate(template.id)
        }}><Icon name='trash'/></Button></span>
        </div>
        })
        return ( <div>
            
             <Link to= '/curriculumbuilder'>
            <Button icon labelPosition='right'>Add New Course Template<Icon name='plus'/></Button>
             </Link>
            {currentTemplates}

        </div> )
    }
}

function mapStateToProps(state) {
    return {
        curricula: state.teachers.curricula
    }
}
 
export default connect( mapStateToProps, { getCurricula } )(TeacherCourseTemplates);