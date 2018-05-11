import React, { Component } from 'react';
import { Card, Icon, Image, Input, Button, TextArea, Form, Header, Modal } from 'semantic-ui-react'
import '../CurriculumBuilder.css'


class CBQuizzes extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            quizTitleInput: '',
            quizDescriptionInput: '',
            quizDueDateInput: '',
            quizQuestionInput: '',
            quizQuestionPtsInput: '',
            quizQuestions: [],
            modalOpen: true,
            quizQuestionOptionsInput: '',
            quizQuestionOptions: []
        }
    }
    
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    quizSave = () => {
        let { quizTitleInput, quizDescriptionInput, quizDueDateInput } = this.state ;
        let { resources, dayDesc, dayNum, dayTopic, quizzes, assignments } = this.props.selectedDay ;

        // if( assignmentTitleInput !== '' && assignmentDescriptionInput !== '' && assignmentPointsInput > 0 ) {

        //     let newassignment = {
        //         title: assignmentTitleInput,
        //         description: assignmentDescriptionInput,
        //         dueOffset: +assignmentDueDateInput,
        //         totalPts: +assignmentPointsInput,
        //         url: assignmentFileInput
        //     }

        //     let updatedassignments = [...assignments, newassignment ]
        //     let sendDay = {
        //         dayNum,
        //         resources,
        //         assignments,
        //         assignments: updatedassignments,
        //         quizzes,
        //         dayTopic,
        //         dayDesc
        //     }
        //     this.props.updateDay( sendDay )
        //     this.props.switch(0)
        // }
    }
    

    uploadedFile = (awsResponse) => {
        this.setState({
            assignmentFileInput: awsResponse.Location
        })
    }

    addOption = () => {
        let newOptions = [...this.state.quizQuestionOptions, this.state.quizQuestionOptionsInput]
        this.setState({
            quizQuestionOptions: newOptions
        })
    }

    render() { 

        let daySaveLabel = this.state.editingTopicDesc ? 'Save' : 'Edit'

        // let answerOptions = this.state.quizQuestionOptions ? 

        return ( 

         <Card style={{ margin: 10}}>
         <Card.Content>
             <Card.Header>
                 Build a Quiz
             </Card.Header>
            <Form>
                 <Input 
                    name='quizTitleInput' 
                    value={this.state.quizTitleInput} 
                    onChange={this.handleInput} 
                    placeholder='Title' 
                    fluid />

                <TextArea 
                    name='quizDescriptionInput' 
                    value={this.state.quizDescriptionInput} 
                    onChange={this.handleInput} 
                    placeholder='Description' 
                    fluid />
                     
            
                <Input 
                    name='quizDueDateInput' 
                    type='number'
                    value={ this.state.quizDueDateInput } 
                    onChange={ this.handleInput } 
                    placeholder='Days Allotted Before Due' 
                    fluid />
               
                    
            </Form>
             <Button
                primary={ true } 
                onClick={ this.quizSave } >
                Add Question
             </Button>
             <br />
             <Button 
                 primary={ true } 
                 style={{float: 'right'}}
                 onClick={ this.quizSave } >
                 Add quiz
             </Button>
         </Card.Content>
         <Modal
            open={ this.state.modalOpen }>
             <Header>Add a Question</Header>
             <Modal.Content>
                 <Input 
                    name='quizQuestionInput' 
                    value={ this.state.quizQuestionInput } 
                    placeholder="Question" 
                    onChange={ this.handleInput } />
                <br />
                 <Input 
                    name='quizQuestionPtsInput' 
                    type='number'
                    value={ this.state.quizQuestionPtsInput } 
                    placeholder='Points possible' 
                    onChange={ this.handleInput } />
                <br />
                {this.state.quizQuestions.length + 1}. {this.state.quizQuestionInput}?
                <br />
                <Input 
                    name='quizQuestionOptionsInput' 
                    value={ this.state.quizQuestionOptionsInput } 
                    placeholder='Add option' 
                    onChange={ this.handleInput } />
                <Button
                    onClick={ this.addOption }>Add</Button>
             </Modal.Content>
         </Modal>
         </Card> 
         )
    }
}
 
export default CBQuizzes;

