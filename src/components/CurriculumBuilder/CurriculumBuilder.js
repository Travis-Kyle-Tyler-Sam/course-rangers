import React, { Component } from 'react';
import { Card, Icon, Image, Input, Button, TextArea, Form, Header, Checkbox } from 'semantic-ui-react'
import FileUpload from '../FileUpload'
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
            contentSelector: 0,
            resourceTitleInput: '',
            resourceDescriptionInput: '',
            resourceTypeLink: true,
            upload: '',
            resourceLink: ''
         }
    }

    handleResourceType = (e, { value }) => this.setState({ resourceTypeLink: value })

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

    uploadedFile = (awsResponse) => {
        this.setState({
            upload: awsResponse.Location
        })
    }

    

    render() { 
        // Switches between save name and edit name depending on whether the inputs ar showing or just the text
        let nameBtnLabel = this.state.editingName ? 'Save Name' : 'Edit Name'

        // Button label switches between save and edit in the day 
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
                            <Form>
                            <Input name='resourceTitleInput' value={this.state.resourceTitleInput} onChange={this.handleInput} placeholder='Title' fluid={true}/>
                                <TextArea name='resourceDescriptionInput' value={this.state.resourceDescriptionInput} onChange={this.handleInput} placeholder='Description' fluid={true}/>
                                <div className='cb-resource-radios'>

                                <Form.Field>
                                <Checkbox
                                    radio
                                    label='Link'
                                    name='resourceTypeLink'
                                    value={ true }
                                    checked={ this.state.resourceTypeLink }
                                    onChange={ this.handleResourceType }
                                    />
                                </Form.Field>
                                <Form.Field>
                                <Checkbox
                                    radio
                                    label='Upload'
                                    name='resourceTypeUpload'
                                    value={ false }
                                    checked={ !this.state.resourceTypeLink }
                                    onChange={ this.handleResourceType }
                                    />
                                </Form.Field>
                                </div>
                                <FileUpload 
                                    cb={ this.uploadedFile } />
                                { this.state.upload !== '' && <img src={ this.state.upload } width='50px' />  }
                               
                            </Form>
                        <Button 
                            primary={ true } 
                            style={{float: 'right'}}
                            onClick={ this.resourceSave }>
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