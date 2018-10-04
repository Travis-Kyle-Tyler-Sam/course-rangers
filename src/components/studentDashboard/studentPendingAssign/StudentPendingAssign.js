import React, {Component} from 'react';
import { Dimmer, Loader, Segment, Header } from 'semantic-ui-react'
import './../../studentDashboard/StudentDashboard.css'
import PendingAssignmentTable from './PendingAssignmentTable/PendingAssignmentTable';
class PendingAssignCard extends Component {
    
    render() {
       const { courses, assignments } = this.props;
        
        const table = courses.map( course => {
            let courseAssignments = assignments.filter( assignment => {
                return assignment.course_id === course.course_id && !assignment.date_submitted
            })

            return(
                assignments.length !== 0
                && <PendingAssignmentTable
                    course = {course}
                    list={courseAssignments}
                    key={course.course_id}
                    uploadFileFn = {this.props.uploadFileFn}
                />
            )
        })
        return (
            <div className='pending-assignments'>
            {courses[0]
            ?
                <Segment
                    color='brown'>
                    <Header as='h1'>Pending Assignments</Header>
                    
                    {table}
                </Segment>
            :
                <Dimmer active>
                    <Loader/>
                </Dimmer>
                
            }
            </div>
        )
    }
}
export default PendingAssignCard