import React, { Component } from 'react';
import { Card, Icon, Image, Input, Button, TextArea, Form, Header, Checkbox } from 'semantic-ui-react'
import FileUpload from '../../FileUpload'
import '../CurriculumBuilder.css'


class CBassignments extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            assignmentTitleInput: '',
            assignmentDescriptionInput: '',
            assignmentDueDateInput: '',
            assignmentFileInput: '',
            assignmentPointsInput: ''
        }
    }
    
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    assignmentSave = () => {
        let { assignmentTitleInput, assignmentDescriptionInput, assignmentDueDateInput, assignmentFileInput, assignmentPointsInput } = this.state ;
        let { resources, dayDesc, dayNum, dayTopic, quizzes, assignments } = this.props.selectedDay ;

        if( assignmentTitleInput !== '' && assignmentDescriptionInput !== '' && assignmentPointsInput > 0 ) {

            let newassignment = {
                title: assignmentTitleInput,
                description: assignmentDescriptionInput,
                dueOffset: +assignmentDueDateInput,
                totalPts: +assignmentPointsInput,
                url: assignmentFileInput
            }

            let updatedassignments = [...assignments, newassignment ]
            let sendDay = {
                dayNum,
                resources,
                assignments,
                assignments: updatedassignments,
                quizzes,
                dayTopic,
                dayDesc
            }
            this.props.updateDay( sendDay )
            this.props.switch(0)
        }
    }
    

    uploadedFile = (awsResponse) => {
        this.setState({
            assignmentFileInput: awsResponse.Location
        })
    }

    render() { 

        let daySaveLabel = this.state.editingTopicDesc ? 'Save' : 'Edit'

        return ( 

        <div className="ui segment cb-pane" style={ { margin: 10 } }>
             <Header>
                 Add an Assignment
             </Header>
            <Form>
                 <Input 
                    name='assignmentTitleInput' 
                    value={this.state.assignmentTitleInput} 
                    onChange={this.handleInput} 
                    placeholder='Title' 
                    fluid />

                <TextArea 
                    name='assignmentDescriptionInput' 
                    value={this.state.assignmentDescriptionInput} 
                    onChange={this.handleInput} 
                    placeholder='Description' 
                    fluid />
                     
            
                <Input 
                    name='assignmentDueDateInput' 
                    type='number'
                    value={ this.state.assignmentDueDateInput } 
                    onChange={ this.handleInput } 
                    placeholder='Days Allotted Before Due' 
                    fluid />

                <Input 
                    name='assignmentPointsInput'
                    type='number' 
                    value={ this.state.assignmentPointsInput } 
                    onChange={ this.handleInput } 
                    placeholder='Total Points' 
                    fluid />
                  
                <FileUpload 
                    cb={ this.uploadedFile } />
                { this.state.assignmentFileInput !== '' && <img src={ this.state.assignmentFileInput } width='50px' />  }
                    
            </Form>
             <Button 
                 primary={ true } 
                 style={{float: 'right'}}
                 onClick={ this.assignmentSave } >
                 Add assignment
             </Button>
        </div>
        )
    }
}

export default CBassignments;

