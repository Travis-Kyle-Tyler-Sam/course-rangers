import React, { Component } from 'react';
import { Card, Icon, Image, Input, Button, TextArea, Form, Header, Modal, Checkbox, Label, Message } from 'semantic-ui-react'
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
            quizQuestionOptions: [],
            quizQuestionAnswer: '',
            errors: []
        }
    }
    
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleOptionChange = (e, { value }) => this.setState({ quizQuestionAnswer: value })

    addQuestion = () => {
        let { quizQuestionInput, quizQuestionPtsInput, quizQuestionOptions, quizQuestionAnswer } = this.state
        let errors = [];
        // Error if:
        // - No correct answer is selected
        // - Only one answer option is present
        // - The question input is blank
        // - Points possible is blank
        if( quizQuestionInput === '' ) {
            errors.push("The question cannot be blank.")
        }
        if( quizQuestionPtsInput === '' ) {
            errors.push("The points possible cannot be blank.")
        }
        if( quizQuestionOptions.length < 2 ) {
            errors.push("You need at least two answer options for this question")
        }
        if( quizQuestionAnswer === '' ) {
            errors.push("You must select an answer to the question")
        }

        if( errors.length > 0 ){
            this.setState({
                errors
            })
        } else {
            let questionToAdd = {
                questionText: quizQuestionInput,
                ptsPossible: quizQuestionPtsInput,
                correctAnswer: quizQuestionAnswer,
                answerOptions: quizQuestionOptions
            }

            let newQuizQuestions = [...this.state.quizQuestions, questionToAdd ]

            // YOU LEFT OFF HERE PREPARING TO CALL THE PROPS CALLBACK TO SUBMIT THE QUESTION TO THE PARENT
        }


    }


    quizSave = () => {
        let { quizTitleInput, quizDescriptionInput, quizDueDateInput } = this.state ;
        let { resources, dayDesc, dayNum, dayTopic, quizzes, assignments } = this.props.selectedDay ;

        // ============================================================================================ //
        // === MAKE SURE TO ADD QUESTION IDS TO EACH QUESTION BEFORE SUBMITTING TO PARENT COMPONENT === //
        // ============================================================================================ //

        // if( assignmentTitleInput !== '' && assignmentDescriptionInput !== '' && assignmentPointsInput > 0 ) {

        //     let newQuestion = {
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
        if( !this.state.quizQuestionOptions.includes( this.state.quizQuestionOptionsInput ) ){
            let newOptions = [...this.state.quizQuestionOptions, this.state.quizQuestionOptionsInput]
            this.setState({
                quizQuestionOptionsInput: '',
                quizQuestionOptions: newOptions
            })
        }
    }

    killOption = (i) => {
        let newOptions = [...this.state.quizQuestionOptions]
        newOptions.splice(i, 1)
        this.setState({
            quizQuestionOptions: newOptions
        })
    }

    render() { 

        let daySaveLabel = this.state.editingTopicDesc ? 'Save' : 'Edit'

        let answerOptions = this.state.quizQuestionOptions 
            ? this.state.quizQuestionOptions.map( (option, i) => {
                return (

                <Form.Field key={option + i}>
                    <Icon 
                        color='red' 
                        name='close' 
                        onClick={ ()=>this.killOption(i) } />
                    <Checkbox
                        radio
                        label={ option }
                        name='quizAnswerOptions'
                        value={ option }
                        checked={this.state.quizQuestionAnswer === option}
                        onChange={this.handleOptionChange}
                        />
                </Form.Field>
            )
            })
        
            : null;

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
                <Header> {this.state.quizQuestions.length + 1}. {this.state.quizQuestionInput}? </Header>
                <br />
                <Input 
                    name='quizQuestionOptionsInput' 
                    value={ this.state.quizQuestionOptionsInput } 
                    placeholder='Add option' 
                    onChange={ this.handleInput } />
                <Button
                    onClick={ this.addOption }>Add</Button>
                
                <Form>
                    <Form.Field>
                    Answer Options:
                    </Form.Field>
                  
                    { answerOptions }
                   
                </Form>
                <Message
                    error
                    header='Error:'
                    hidden={ this.state.errors.length === 0 }
                    list={ this.state.errors }
                />
             </Modal.Content>
             <Modal.Actions>
                 <Button>
                     Cancel
                 </Button>
                 <Button
                    primary 
                    onClick={ this.addQuestion}>
                    Save
                 </Button>
             </Modal.Actions>
         </Modal>
         </Card> 
         )
    }
}
 
export default CBQuizzes;

