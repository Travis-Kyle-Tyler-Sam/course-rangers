import React, { Component } from 'react';
import { Card, Icon, Image, Input, Button, TextArea, Form, Header, Checkbox } from 'semantic-ui-react'
import FileUpload from '../FileUpload'
import './CurriculumBuilder.css'
import CBDaySelect from './CBDaySelect/CBDaySelect'
import CBResources from './CBResources/CBResources'
import CBAssignments from './CBAssignments/CBAssignments'
import CBQuizzes from './CBQuizzes/CBQuizzes'

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
        if(this.state.numDaysInput > 0 && this.state.numDaysInput <= 100){
            let numOfDays = this.state.numDaysInput
            let daysArray = [];
            for(let i=0; i < numOfDays; i++){
                daysArray.push({
                    dayNum: i + 1,
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
                {day.dayTopic} 
            </div>
        })

        let topicDescFlag =  this.state.dayTopicInput && this.state.dayDescriptionInput


        return ( 
            <div className='cb-container'>
                <Card style={{ width: 340, margin: 10 }}>
                    <Card.Content>
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
                    </Card.Content>
                </Card>
                
                {/* { this.state.selectedDay &&  */}
                <CBDaySelect 
                    selectedDay={ this.state.curriculumDays[this.state.selectedDay] } 
                    updateDay={ this.updateDay } 
                    switch={ this.switchWindows } /> 
                {/* } */}
                
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

                <CBQuizzes 
                    selectedDay={ this.state.curriculumDays[this.state.selectedDay] } 
                    updateDay={ this.updateDay} 
                    switch={ this.switchWindows } />
                
            </div>
         )
    }
}
 
export default CurriculumBuilder;