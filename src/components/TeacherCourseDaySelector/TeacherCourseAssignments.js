import React, { Component } from 'react';
import {Header, Segment, List, Table} from 'semantic-ui-react';
import _ from 'lodash';
import {connect} from 'react-redux';
import moment from 'moment';
class TeacherCourseAssignments extends Component {
    constructor(props) {
        super(props);
        let filteredCourse = this.props.courses.filter( course => course.id === this.props.course)[0]
        this.state = { 
            currentCourse: filteredCourse,
            assignments: []
         }
    }




    render() { 
        const tempAssignments = []    
        if(!this.props.days){
            return ''
        }
        if(this.props.days){
            let assignment = this.props.days.map(day =>{
                return day.assignments
            })
            tempAssignments.push(assignment)
        }
        const assignmentsToMap = _.flattenDeep(tempAssignments)
        console.log(assignmentsToMap)
        /////////need to find a way to only map over assignments that aren't duplicates
        const list = assignmentsToMap.map( assignment => {
        return(
        <Table.Row key={assignment.id + assignment.description}>
           <Table.Cell> {assignment.name}</Table.Cell>
            <Table.Cell>{moment(assignment.due_date).format('MM/DD')}</Table.Cell>
        </Table.Row>
        )})
        return ( 
        
            <div>
            <Header as='h2'>Upcoming Assignments/Quizzes</Header>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Due Date</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
              {list}
                </Table.Body>
            </Table>

        </div>

         )
    }
}
function mapStateToProps(state) {
    return {
      courses: state.teachers.courses
    }
  }
  
  export default connect(mapStateToProps)(TeacherCourseAssignments);