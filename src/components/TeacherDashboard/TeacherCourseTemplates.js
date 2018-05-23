import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { Card, Icon, Image, Input, Button, TextArea, Form, Header, Checkbox, Message, Table } from 'semantic-ui-react'

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

       let currentTemplates = this.props.curricula.map( template => {
        return (
            <Table.Row key={template.id}>

                <Table.Cell>
                    { template.id }
                </Table.Cell>

                <Table.Cell>
                    { template.curriculum_name }
                </Table.Cell>
                <Table.Cell>
                    <Button 
                        basic 
                        icon 
                        circular
                        href={ `/curriculumbuilder/${template.id}` }>
                        <Icon name="edit"/>
                    </Button>
                </Table.Cell>

                <Table.Cell>
                    <Button 
                        basic 
                        icon 
                        circular 
                        onClick={()=>{ this.deleteCourseTemplate(template.id)}}>
                        <Icon name='trash'/>
                    </Button>
                </Table.Cell>
            </Table.Row>
        )})
  
        return ( 
            <div className='tct-template-container'>
                
                <Link to= '/curriculumbuilder'>
                    <Button icon labelPosition='right'>Add New Course Template<Icon name='plus'/></Button>
                </Link>


                <Table 
                    className='tct-tables'
                    striped>
                    <Table.Header>
                        <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Curriculum</Table.HeaderCell>
                        <Table.HeaderCell>Edit</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {currentTemplates}
                    </Table.Body>
                </Table>    

            </div> )
    }
}

function mapStateToProps(state) {
    return {
        curricula: state.teachers.curricula
    }
}
 
export default connect( mapStateToProps, { getCurricula } )(TeacherCourseTemplates);