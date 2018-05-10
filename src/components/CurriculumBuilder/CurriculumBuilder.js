import React, { Component } from 'react';
import { Card, Icon, Image, Input, Button, TextArea, Form, Header } from 'semantic-ui-react'

import './CurriculumBuilder.css'

class CurriculumBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            editingName: true,
            editingTopicDesc: true,
            curriculumNameInput: '',
            numDaysInput: 1,
            curriculumDays: [],
            selectedDay: null,
            dayTopicInput: '',
            dayDescriptionInput: '',
            contentSelector: 0

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
            selectedDay: this.state.curriculumDays[index]
        })
    }

    topicDescSave = () => {
        let { dayTopicInput, dayDescriptionInput } = this.state
        
        if( dayTopicInput !== '' && dayDescriptionInput !== '' ){
            this.setState({
                editingTopicDesc: !this.state.editingTopicDesc
            })
        }

    }

    render() { 
        let nameBtnLabel = this.state.editingName ? 'Save Name' : 'Edit Name'

        let daySaveLabel = this.state.editingTopicDesc ? 'Save' : 'Edit'

        let displayDays = this.state.curriculumDays.map( (day, i) => {
            return <div 
                className='cb-daysquare' 
                key={ i } 
                onClick={ () => this.selectDay(i) }> 
                Day {day.dayNum} 
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
                            value={this.state.numDaysInput}/>
                        <Button
                            onClick={ this.populateDays }>Set Days</Button>

                        <div className='cb-days-container'> { displayDays } </div>
                    </Card.Content>
                </Card>
                
                { this.state.selectedDay && 
                <Card style={{ margin: 10}}>
                    <Card.Content>
                        <Card.Header>
                            Day { this.state.selectedDay.dayNum }
                        </Card.Header>

                        { !this.state.editingTopicDesc && 
                        <div>
                            <Header> { this.state.dayTopicInput } </Header> 
                            <p> { this.state.dayDescriptionInput } </p> 
                        </div> }
                        { this.state.editingTopicDesc &&
                        <div>
                            <Input name='dayTopicInput' value={this.state.dayTopicInput} onChange={this.handleInput} placeholder='Topic' fluid={true}/>
                            <Form>
                                <TextArea name='dayDescriptionInput' value={this.state.dayDescriptionInput} onChange={this.handleInput} placeholder='Description' fluid={true}/>
                            </Form>
                        </div> }
                        <Button 
                            primary={ true } 
                            style={{float: 'right'}}
                            onClick={ this.topicDescSave }>
                            { daySaveLabel }
                        </Button>
                        <Button icon labelPosition='right' fluid={ true }> Add Resource <Icon name='plus'/></Button>
                        <Button icon labelPosition='right' fluid={ true }> Add Assignment <Icon name='plus'/></Button>
                        <Button icon labelPosition='right' fluid={ true }> Add Quiz <Icon name='plus'/></Button>
                    </Card.Content>
                </Card> 
                }
                 <Card style={{ margin: 10}}>
                    <Card.Content>
                        <Card.Header>
                            Add a Resource
                        </Card.Header>
                            <Input name='dayTopicInput' value={this.state.dayTopicInput} onChange={this.handleInput} placeholder='Topic' fluid={true}/>
                            <Form>
                                <TextArea name='dayDescriptionInput' value={this.state.dayDescriptionInput} onChange={this.handleInput} placeholder='Description' fluid={true}/>
                            </Form>
                        <Button 
                            primary={ true } 
                            style={{float: 'right'}}
                            onClick={ this.topicDescSave }>
                            { daySaveLabel }
                        </Button>
                    </Card.Content>
                </Card> 

                <Card style={{ margin: 10}}>
                    
                    
                </Card>
                
            </div>
         )
    }
}
 
export default CurriculumBuilder;