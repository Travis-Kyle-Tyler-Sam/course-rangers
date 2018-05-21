import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { Card, Icon, Image, Input, Button, TextArea, Form, Header, Checkbox, Message } from 'semantic-ui-react'

import './TeacherCourseTemplates.css'

class TeacherCourseTemplates extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            courseTemplates: []
         }
    }

componentDidMount(){
this.getTeachersCourseTemplates()
}

 getTeachersCourseTemplates() {
    axios.get('/api/curriculum/').then(response => {
      this.setState({courseTemplates: response.data})
    });
 }

deleteCourseTemplate(id){
    axios.delete(`/api/curriculum/${id}`).then(response =>{
     return this.getTeachersCourseTemplates()
    })
}

    render() { 
       let currentTemplates = this.state.courseTemplates.map(template=>{
        return <div className='ct-list' key={template.id}><span>{template.curriculum_name}</span>
        <span><Link to='/curriculumbuilder'>
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
 
export default TeacherCourseTemplates;