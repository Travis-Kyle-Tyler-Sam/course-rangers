import React, { Component } from 'react';
import axios from 'axios'
import QList from './QList'
import moment from 'moment'
import { Segment, Button, Icon, Modal, Header } from 'semantic-ui-react'
import fns from './utils/functions'

import './QuizTaker.css'


class QuizTaker extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            quiz: {},
            index: 0,
            questions: [],
            selected: null,
            ptsPossible: 0,
            message: ''
         }
         fns.selectQuestion = fns.selectQuestion.bind(this);
         fns.cycleRight = fns.cycleRight.bind(this);
         fns.cycleLeft = fns.cycleLeft.bind(this);
    }

    componentDidMount() {
        axios.get(`/api/student/quiz/${this.props.match.params.quizid}`)
        .then( response =>  {
            this.setState({
            quiz: response.data,
            questions: response.data.questions,
            ptsPossible: +response.data.points_possible
        })})
        .catch( err => console.log(err))
    }

    

  



    selectOption = (i) => {

        let freshQuestions = [...this.state.questions]
        freshQuestions[this.state.index].option_selected = freshQuestions[this.state.index].options[i].option_text

        this.setState({
            questions: freshQuestions
        })
    }

    submitQuiz = () => {
        let freshQuiz = {...this.state.quiz}
        let freshQuestions = [...this.state.questions]

        freshQuestions.forEach( (current, i, questionArray) => {
            if( current.option_selected === current.correct_answer ) {
                current.points_awarded = +current.points_possible
            } else {
                current.points_awarded = 0
            }
        })

        let totalPoints = freshQuestions.reduce( (total, current) => {
            return total + current.points_awarded
        },0)

        let percent = ((totalPoints/this.state.ptsPossible)*100).toFixed(2)

        
        let letterGrade

        if( percent > 90 ) {
            letterGrade = 'A'
        } else if (percent > 80) {
            letterGrade = 'B'
        } else if (percent > 70 ) {
            letterGrade = 'C'
        } else if ( percent > 60 ) {
            letterGrade = 'D'
        } else {
            letterGrade = 'F'
        }

        let message = `You scored ${totalPoints} out of ${this.state.ptsPossible} which is ${percent}% which is an ${letterGrade}`

        let quizBody = {
            ptsScored: totalPoints,
            percent: percent,
            date: moment().format('YYYY-MM-DD'),
            letterGrade: letterGrade
        }
        
        axios.patch(`/api/student/quiz/${this.props.match.params.quizid}`, quizBody)
        .then(  
            this.setState({
                message: message
            })
        )


    }

    modalComplete = () => {
        this.props.history.push('/studentdashboard')
    }

    render() {
        
        let questions = []
        let question = null
        let options = null
        
        if (this.state.quiz.questions) {
            
            question = this.state.index + 1 + ".  " + this.state.quiz.questions[this.state.index].question + "?";
            options = this.state.questions[this.state.index].options.map( (option, i) => {

                let optionText = option.option_text
                let corAns = this.state.questions[this.state.index].correct_answer

                let liClass = option.option_text === this.state.questions[this.state.index].option_selected ? 'qt-option-selected qt-option' : 'qt-option-notselected qt-option'

                return (
                    <li 
                        onClick={ () => this.selectOption(i) }
                        className={ liClass }
                        key={ option.id }> 
                        { option.option_text } 
                    </li>
                )
            })
        }

        function qsComplete(questionArray) {
            for( let i=0; i<questionArray.length; i++ ) {
                if( questionArray[i].option_selected === null ) {
                    return false
                }
            }
            return true
        }


        return ( 
            <div className='quiz-taker-container'>
                <QList
                    questions={ this.state.questions } 
                    index={ this.state.index }
                    changeQ={ fns.selectQuestion }/>

                <div className='quiz-taker-question-guide'>
                <Segment 
                    className='quiz-taker-question-container'
                    style={{margin: 0}}>
                    <h1> { question } </h1>
                    <ol type='a'> { options } </ol>
                </Segment>
                    <div className="quiz-taker-btn-container">

                    {this.state.index !==0 && <Button
                        className='qt-btn-left' 
                        icon 
                        style={{margin:0}} 
                        labelPosition='left'
                        onClick={ ()=>fns.cycleLeft(this.state.index) }
                        size='huge'>
                        <Icon name='left arrow' />
                        Last
                    </Button> }

                    {this.state.index !== (this.state.questions.length -1) && <Button 
                        icon
                        onClick= {()=>fns.cycleRight(this.state.index, this.state.questions) }
                        className='qt-btn-right'
                        style={{margin:0}} 
                        size='huge'
                        labelPosition='right'>
                        <Icon name='right arrow' />
                        Next
                    </Button> }
                    </div>
    
                    <div className='qt-submit-btn'>
                        { qsComplete(this.state.questions) && <Button 
                            primary 
                            onClick={ this.submitQuiz }
                            size='massive' >
                            Submit
                            </Button>}
                    </div>
                </div>
                <Modal
                    open={ this.state.message }>
                    <Modal.Header>Quiz Completed</Modal.Header>
                    <Modal.Content>
                    <Modal.Description>
                        <Header>Your Score</Header>
                        <p> { this.state.message } </p>
                    </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                    <Button color='green'
                        onClick={ this.modalComplete } >
                        <Icon name='checkmark' /> Ok
                    </Button>
                    </Modal.Actions>
                </Modal>

            </div>
         )
    }
}
 
export default QuizTaker;