import React, { Component } from 'react';
import { Card, Icon, Image, Input, Button } from 'semantic-ui-react'

import './CurriculumBuilder.css'

class CurriculumBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            editingName: true,
            curriculumNameInput: '',
            numDaysInput: 1,
            curriculumDays: []
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
            for(let i=0; i <= numOfDays; i++){
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

    render() { 
        let nameBtnLabel = this.state.editingName ? "Save Name" : "Edit Name"

        let displayDays = this.state.curriculumDays.map( (day, i) => {
            return <div className="cb-daysquare" key={ i } > Day {day.dayNum} </div>
        })

        return ( 
            <div>
                <Card style={{width: 340}}>
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
                            type="number" 
                            className='cb-num-days-input' 
                            name='numDaysInput'
                            placeholder='# of Days in Curriculum' 
                            onChange={this.handleInput} 
                            value={this.state.numDaysInput}/>
                        <Button>Set Days</Button>
                    </Card.Content>


                </Card>
            </div>
         )
    }
}
 
export default CurriculumBuilder;