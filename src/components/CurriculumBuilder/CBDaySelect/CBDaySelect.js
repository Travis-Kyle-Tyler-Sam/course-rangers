
import React, { Component } from 'react';
import { Card, Icon, Image, Input, Button, TextArea, Form, Header, Checkbox } from 'semantic-ui-react'
import '../CurriculumBuilder.css'

class CBDaySelect extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            dayTopicInput: this.props.selectedDay.dayTopic || '',
            editingTopicDesc: true,
            dayDescriptionInput: this.props.selectedDay.dayDesc || '',

         }
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    topicDescSave = () => {
        let { dayTopicInput, dayDescriptionInput } = this.state
        
        if( dayTopicInput !== '' && dayDescriptionInput !== '' ){
            this.setState({
                editingTopicDesc: !this.state.editingTopicDesc
            })

            if(this.state.editingTopicDesc){
                let { dayNum, assignments, resources, quizzes } = this.props.selectedDay
                let sendDay = {
                    dayNum,
                    assignments,
                    resources,
                    quizzes,
                    dayTopic: dayTopicInput,
                    dayDesc: dayDescriptionInput,
                }
                this.props.updateDay( sendDay )
            }
        }
    }

    componentDidUpdate( prevProps, prevState, snapshot ) {
        if(prevProps.selectedDay.dayNum !== this.props.selectedDay.dayNum){
            this.setState({
                dayTopicInput: this.props.selectedDay.dayTopic || '',
                editingTopicDesc: true,
                dayDescriptionInput: this.props.selectedDay.dayDesc || '',
            })
        }
    }

    render() {
         // Button label switches between save and edit in the day 
         let daySaveLabel = this.state.editingTopicDesc ? 'Save' : 'Edit'

         let { resources, assignments, quizzes } = this.props.selectedDay

         let resourceList = resources ? resources.map( resource => <div> { resource.title } </div> ) : null;
         let assignmentList = assignments ? assignments.map( assignment => <div> { assignment.title } </div> ) : null;
         let quizList = quizzes ? quizzes.map( quiz => <div> { quiz.title } </div> ) : null;

        return ( 
            <div className="ui segment cb-pane" style={ { margin: 10 } }>
                <Header>
                    Day { this.props.selectedDay.dayNum }
                </Header>

                { !this.state.editingTopicDesc && 
                <div>
                    <Header> { this.state.dayTopicInput } </Header> 
                    <p> { this.state.dayDescriptionInput } </p> 
                </div> }
                { this.state.editingTopicDesc &&
                <div>
                    <Input name='dayTopicInput' value={this.state.dayTopicInput} onChange={this.handleInput} placeholder='Topic' fluid />
                    <Form>
                        <TextArea name='dayDescriptionInput' value={this.state.dayDescriptionInput} onChange={this.handleInput} placeholder='Description' fluid />
                    </Form>
                </div> }

                <Button 
                    primary={ true } 
                    style={{float: 'right'}}
                    onClick={ this.topicDescSave }>
                    { daySaveLabel }
                </Button>

                <Button 
                    icon
                    onClick={ ()=>this.props.switch(1) } 
                    labelPosition='right' 
                    fluid > 
                    Add Resource 
                    <Icon name='plus'/>
                </Button>
                    { resourceList }

                <Button 
                    icon
                    onClick={ ()=>this.props.switch(2) } 
                    labelPosition='right' 
                    fluid > 
                    Add Assignment 
                    <Icon name='plus'/>
                </Button>
                { assignmentList }

                <Button 
                    icon
                    onClick={ ()=>this.props.switch(3) } 
                    labelPosition='right' 
                    fluid > 
                    Add Quiz 
                    <Icon name='plus'/>
                </Button>
                { quizList }

            </div>
        )
    }
}

export default CBDaySelect;


