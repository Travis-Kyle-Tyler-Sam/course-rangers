import React, { Component } from 'react';
import axios from 'axios'
import FileUpload from '../FileUpload'
import CBDaySelect from './CBDaySelect/CBDaySelect'
import CBResources from './CBResources/CBResources'
import CBAssignments from './CBAssignments/CBAssignments'
import CBQuizzes from './CBQuizzes/CBQuizzes'

import './CurriculumBuilder.css'

import { Card, Icon, Image, Input, Button, TextArea, Form, Header, Checkbox, Message } from 'semantic-ui-react'

class CurriculumBuilder extends Component {
    constructor(props) {
        super(props);

        let initialDays = [
            {
                dayNum: 1,
                dayTopic: '',
                dayDesc: '',
                assignments: [],
                resources: [],
                quizzes: [] 
            }
        ]

        this.state = { 
            editingName: true,
            editingTopicDesc: true,
            curriculumNameInput: '',
            numDaysInput: 1,
            curriculumDays: initialDays,
            curriculumErrors: [],
            selectedDay: 0,
            dayTopicInput: '',
            dayDescriptionInput: '',
            contentSelector: 0,
            resourceTitleInput: '',
            resourceDescriptionInput: '',
            resourceTypeLink: true,
            upload: '',
            resourceLink: '',
            windowIndex: 0
         }
         this.populateDays = this.populateDays.bind(this)
    }

    

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    saveName = () => {
        if(this.state.curriculumNameInput !== ''){
            this.setState({
                editingName: !this.state.editingName
            })
        }
    }

    populateDays = () => {
        let numDaysInput = +this.state.numDaysInput

        if(numDaysInput > 0 && numDaysInput <= 100){
            if(numDaysInput > this.state.curriculumDays.length) {
                let numOfDays = numDaysInput - this.state.curriculumDays.length 
                let daysArray = [...this.state.curriculumDays];
                for(let i=0; i < numOfDays; i++){
                    daysArray.push({
                        dayNum: daysArray.length + 1,
                        dayTopic: '',
                        dayDesc: '',
                        assignments: [],
                        resources: [],
                        quizzes: []
                    })
                } 
                this.setState({
                    curriculumDays: daysArray
                })
            } else {

                let daysArray = this.state.curriculumDays.filter( element => element.dayNum <= numDaysInput )
                this.setState({
                    curriculumDays: daysArray
                }) 
            }
        }
    }

    selectDay = (index) => {
        this.setState({
            selectedDay: index
        })
    }

    updateDay = (day) => {
        let freshCurriculumDays = [...this.state.curriculumDays]
        let updatedDays = freshCurriculumDays.map( curriculumDay => {
            if(day.dayNum === curriculumDay.dayNum) {
                return day
            }
            return curriculumDay
        })

        this.setState({
            curriculumDays: updatedDays
        })
    }

    switchWindows = (index) => {
        this.setState({
            windowIndex: index
        })
    }

    submitCurriculum = () => {
        let curriculumErrors = [];
        let { curriculumNameInput, curriculumDays } = this.state
        if( curriculumNameInput === '' ){
            curriculumErrors.push( 'The curriculum name cannot be blank' )
        }

        curriculumDays.forEach( el => {
            if( el.dayTopic === '' && el.dayDesc === '' ) {
                curriculumErrors.push(`Day ${el.dayNum} needs both a topic and a description`)
            } else if( el.dayTopic === '' ) {
                curriculumErrors.push(`Day ${el.dayNum} topic cannot be blank`)
            } else if( el.dayDesc === '' ) {
                curriculumErrors.push(`Day ${el.dayNum} description cannot be blank`)
            }
        })

        if( curriculumErrors.length > 0 ) {
            this.setState({
                curriculumErrors
            })
        } else {
            let curriculumBody = {
                name: this.state.curriculumNameInput,
                days: this.state.curriculumDays
            }

            axios.post('/api/curriculum/new', curriculumBody)
            .then( response => console.log(response.data) )
        }
    }

    
    render() { 
        // ================ //
        
        // Switches between save name and edit name depending on whether the inputs ar showing or just the text
        let nameBtnLabel = this.state.editingName ? 'Save Name' : 'Edit Name'

       

        let displayDays = this.state.curriculumDays.map( (day, i) => {
            return <div 
                className='cb-daysquare' 
                key={ i } 
                onClick={ () => this.selectDay(i) }> 
                Day {day.dayNum}
                <br />
                <strong> {day.dayTopic} </strong>
                <div className='cb-day-counters'>
                    <div className="cb-day-counters-q">
                        Q:{ day.quizzes.length }
                    </div>
                    <div className="cb-day-counters-r">
                        R:{ day.resources.length }
                    </div>
                    <div className="cb-day-counters-a">
                        A:{ day.assignments.length }
                    </div>
                </div> 
            </div>
        })

        let topicDescFlag =  this.state.dayTopicInput && this.state.dayDescriptionInput


        return ( 
            <div className='cb-container'>
                <div className="ui segment cb-pane" style={ { margin: 10, width: 462 } }>
                    {!this.state.editingName && <Card.Header>
                            {this.state.curriculumNameInput}
                    </Card.Header> }

                    {this.state.editingName &&
                         
                         <Input 
                         placeholder='Curriculum Name' 
                         name='curriculumNameInput'
                         value={this.state.curriculumNameInput} 
                         onChange={this.handleInput}/> }
                        <Button
                            onClick={this.saveName}> 
                        { nameBtnLabel } 
                        </Button>
                        <br />
                        
                        <Input
                            type='number' 
                            className='cb-num-days-input' 
                            name='numDaysInput'
                            placeholder='# of Days in Curriculum' 
                            onChange={this.handleInput} 
                            value={this.state.numDaysInput} />
                            
                        <Button
                            onClick={ this.populateDays }>Set Days</Button>

                        <div className='cb-days-container'> { displayDays } </div>
                    </div>
                
                <CBDaySelect 
                selectedDay={ this.state.curriculumDays[this.state.selectedDay] } 
                updateDay={ this.updateDay } 
                switch={ this.switchWindows } /> 
                
                { this.state.windowIndex === 1 && 
                    <CBResources 
                    selectedDay={ this.state.curriculumDays[this.state.selectedDay] } 
                    updateDay={ this.updateDay} 
                    switch={ this.switchWindows } /> }
                    
                { this.state.windowIndex === 2 &&
                    <CBAssignments 
                    selectedDay={ this.state.curriculumDays[this.state.selectedDay] } 
                    updateDay={ this.updateDay} 
                    switch={ this.switchWindows } /> }
                    
                { this.state.windowIndex === 3 &&
                    <CBQuizzes 
                    selectedDay={ this.state.curriculumDays[this.state.selectedDay] } 
                    updateDay={ this.updateDay} 
                    switch={ this.switchWindows } /> }
                <div>

                <Button
                    onClick={ this.submitCurriculum }
                    primary>
                Submit Curriculum
                </Button>
                
                    <br />
                
                <Button>
                Cancel
                </Button>

                <Message
                    error
                    header='Error:'
                    hidden={ this.state.curriculumErrors.length === 0 }
                    list={ this.state.curriculumErrors }
                />
                            
                    </div>
                    </div>
                        )
                    }
                }
                
                export default CurriculumBuilder;