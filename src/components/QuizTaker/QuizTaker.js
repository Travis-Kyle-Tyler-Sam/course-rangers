import React, { Component } from 'react';
import axios from 'axios'
import QList from './QList'
import { Segment, Button, Icon } from 'semantic-ui-react'

import './QuizTaker.css'

class QuizTaker extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            quiz: {},
            index: 0,
         }
    }

    componentDidMount(){
        axios.get(`/api/student/quiz/${this.props.match.params.quizid}`)
        .then( response => this.setState({
            quiz: response.data,
        }))
    }

    render() {
        
        let questions = []
        let question = null
        let options = null
        
        if (this.state.quiz.questions) {
            questions = this.state.quiz.questions.map( question => <div key={ question.id } > {question.question}? </div>)
            question = this.state.quiz.questions[1].question
            options = this.state.quiz.questions[1].options.map( option => <li key={ option.id }> { option.option_text } </li> )
        }


        return ( 
            <div className='quiz-taker-container'>
                <QList
                    questions={ questions } />

                <div className='quiz-taker-question-guide'>
                <Segment 
                    className='quiz-taker-question-container'
                    style={{margin: 0}}>
                    <h1> { question } </h1>
                    <ol type='a'> { options } </ol>
                </Segment>
                    <div className="quiz-taker-btn-container">
                    <Button 
                        icon 
                        style={{margin:0}} 
                        labelPosition='left'
                        size='massive'>
                        <Icon name='left arrow' />
                        Last
                    </Button>
                    <Button 
                        icon
                        style={{margin:0}} 
                        size='massive'
                        labelPosition='right'>
                        <Icon name='right arrow' />
                        Next
                    </Button>
                    </div>
                </div>

            </div>
         )
    }
}
 
export default QuizTaker;