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
            modalOpen: false,
            quizQuestionOptionsInput: '',
            quizQuestionOptions: [],
            quizQuestionAnswer: '',
            questionErrors: [], 
            quizErrors: []
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
        let questionErrors = [];
        // Error if:
        // - No correct answer is selected
        // - Only one answer option is present
        // - The question input is blank
        // - Points possible is blank
        if( quizQuestionInput === '' ) {
            questionErrors.push("The question cannot be blank.")
        }
        if( quizQuestionPtsInput === '' ) {
            questionErrors.push("The points possible cannot be blank.")
        }
        if( quizQuestionOptions.length < 2 ) {
            questionErrors.push("You need at least two answer options for this question")
        }
        if( quizQuestionAnswer === '' ) {
            questionErrors.push("You must select an answer to the question")
        }

        if( questionErrors.length > 0 ){
            this.setState({
                questionErrors
            })
        } else {
            let questionToAdd = {
                questionText: quizQuestionInput,
                ptsPossible: +quizQuestionPtsInput,
                correctAnswer: quizQuestionAnswer,
                answerOptions: quizQuestionOptions
            }

            let newQuizQuestions = [...this.state.quizQuestions, questionToAdd ]

            this.setState({
                quizTitleInput: '',
                quizDescriptionInput: '',
                quizDueDateInput: '',
                quizQuestions: newQuizQuestions,
                quizQuestionInput: '',
                quizQuestionPtsInput: '',
                modalOpen: false,
                quizQuestionOptionsInput: '',
                quizQuestionOptions: [],
                quizQuestionAnswer: '',
                questionErrors: []
            })
        }
    }

    quizSave = () => {
        let { quizTitleInput, quizDescriptionInput, quizDueDateInput, quizQuestions } = this.state ;
        let { resources, dayDesc, dayNum, dayTopic, quizzes, assignments } = this.props.selectedDay ;
        let quizErrors = []

        if( quizTitleInput === '' ){
            quizErrors.push('You must give your quiz a title')
        }
        if( quizDescriptionInput === '' ){
            quizErrors.push('You must give your quiz a description')
        }
        if( quizDueDateInput === '' ){
            quizErrors.push('You must specify how many days will be allotted before the quiz is due')
        }
        if( quizQuestions.length < 1 ){
            quizErrors.push('Your quiz must have at least one question')
        }

        if( quizErrors.length > 0) {
            this.setState({ quizErrors })
        } else {
            let newQuiz = {
                title: quizTitleInput,
                description: quizDescriptionInput,
                dueDate: +quizDueDateInput,
                questions: quizQuestions
            }
            
            let updatedQuizzes = [...quizzes, newQuiz ]
            let sendDay = {
                dayNum,
                resources,
                assignments,
                assignments,
                quizzes: updatedQuizzes,
                dayTopic,
                dayDesc
            }

            this.setState({
                quizQuestions: [],
                quizQuestionInput: '',
                quizQuestionPtsInput: '',
                modalOpen: false,
                quizQuestionOptionsInput: '',
                quizQuestionOptions: [],
                quizQuestionAnswer: '',
                questionErrors: []
            })
            
            this.props.updateDay( sendDay )
            this.props.switch(0)
        }
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

    killQuestion = (i) => {
        let newQuestions = [...this.state.quizQuestions]
        newQuestions.splice(i, 1)
        this.setState({
            quizQuestions: newQuestions
        })
    }

    openModal = () => {
        this.setState({
            modalOpen: true
        })
    }

    cancelModal = () => {
        this.setState({
            quizQuestionInput: '',
            quizQuestionPtsInput: '',
            modalOpen: false,
            quizQuestionOptionsInput: '',
            quizQuestionOptions: [],
            quizQuestionAnswer: '',
            questionErrors: []
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

            let questionsDisplay = this.state.quizQuestions.length > 0 
                ? <ol> 
                    { this.state.quizQuestions.map( (question, i) => {
                        return (

                            <li key={i} >
                                <Icon 
                                    color='red' 
                                    name='close' 
                                    onClick={ ()=>this.killQuestion(i) } /> 
                                { question.questionText } - { question.ptsPossible } 
                            </li>
                        )
                    }) } 
                </ol>
                : null

        return ( 
        <div>
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
            <Header
                style={{display: "inline-block"}}>Questions</Header>
             <Button
                style={{float: "right", marginTop: 20}}
                primary={ true } 
                onClick={ this.openModal } >
                +
             </Button>
             <br />
             { questionsDisplay }
             <br />
             <Button 
                 primary={ true } 
                 style={{float: 'right'}}
                 onClick={ this.quizSave } >
                 Add quiz
             </Button>
         </Card.Content>
         </Card> 
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
                    hidden={ this.state.questionErrors.length === 0 }
                    list={ this.state.questionErrors }
                />
             </Modal.Content>
             <Modal.Actions>
                 <Button
                    onClick={this.cancelModal }>
                     Cancel
                 </Button>
                 <Button
                    primary 
                    onClick={ this.addQuestion} >
                    Save
                 </Button>
             </Modal.Actions>
         </Modal>
         </div>
         )
    }
}
 
export default CBQuizzes;