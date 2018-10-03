import React, {Component} from 'react';
import { Table, Dimmer, Loader, Segment, Header } from 'semantic-ui-react'
import './../../studentDashboard/StudentDashboard.css'
import StudentAssignmentDetail from './../StudentAssignmentDetail/StudentAssignmentDetail';
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
                    list = {courseAssignments}
                    key = {`pendingtable${course}`}
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