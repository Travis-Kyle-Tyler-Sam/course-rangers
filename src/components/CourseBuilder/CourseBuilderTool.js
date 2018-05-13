import React, { Component } from 'react';
import moment from 'moment';
import { Table } from 'semantic-ui-react';


///// will need to delete days_of_week from state and use actual data once we are receiving correctly formated data from the DB

class CourseBuilderTool extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            courseInfo: [],
            numberOfDays: 0,
            days_of_week: [{

                name: 'Curriculum Name',
                desc: 'Curriculum Description',
                curriculumDays: [
                    {
                        dayNum: 1,
                        dayTopic: 'Topic of the day',
                        assignments: [
                            {
                                title: 'assignment title',
                                description: 'Description of assignment',
                                totalPts: 15,
                                url: 'path of file might be blank if its just instructions',
                                dueOffset: 10,
                            }
                        ],
                        quizzes: [
                            {
                                title: 'Quiz title',
                                description: 'Quiz description',
                                dueDate: 15,
                                questions: [
                                    {
                                        questionText: 'How do you ask a question?',
                                        ptsPossible: 10,
                                        correctAnswer: 'The answer in the form of a string, always one of the answer options',
                                        answerOptions: [
                                            'answer option 1',
                                            'answer option 1',
                                            'answer option 3'
                                        ]
                                    }
                                ]
            
                            }
            
                        ],
                        resources: [
                            {
                                title: 'resource title',
                                description: 'resource description',
                                type: 'link or file',
                                url: 'url of resource'
                            }
                        ]
                    }
                ]
                
            }]
         }
    }
    componentDidMount(){
        this.setState({courseInfo: this.props.courseInfo})
        this.calculateNumberOfCourseDays()
    }

    calculateNumberOfCourseDays(){
        this.setState({numberOfDays: this.state.days_of_week.length})
    }

    render() { 
       const {days_of_week} = this.state.courseInfo
       const mappedDays = days_of_week.curriculumDays.map(day=>{
        return day
       })
        return ( <div>
              
                <div>
                <Table striped>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Sunday</Table.HeaderCell>
        <Table.HeaderCell>Monday</Table.HeaderCell>
        <Table.HeaderCell>Tuesday</Table.HeaderCell>
        <Table.HeaderCell>Wednesday</Table.HeaderCell>
        <Table.HeaderCell>Thursday</Table.HeaderCell>
        <Table.HeaderCell>Friday</Table.HeaderCell>
        <Table.HeaderCell>Saturday</Table.HeaderCell>
        </Table.Row>
        </Table.Header>
                </Table>
                </div>


        </div> )
    }
}
 
export default CourseBuilderTool;