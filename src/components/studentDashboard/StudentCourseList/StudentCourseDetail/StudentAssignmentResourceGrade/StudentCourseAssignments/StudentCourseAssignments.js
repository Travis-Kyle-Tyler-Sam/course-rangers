import React from 'react';
import './StudentCourseAssignments.css';
import StudentAssignmentDetail from './../../../../StudentAssignmentDetail/StudentAssignmentDetail';
import {Header, Segment, List, Table} from 'semantic-ui-react';
import moment from 'moment';

function StudentCourseAssignments(props){
    const {assignments, course, uploadFileFn} = props
    
    const list = assignments.map( assignment => {
        return(
            <StudentAssignmentDetail
                courseName = {course.course_name}
                assignmentName = {assignment.name}
                instructorName = {course.user_name}
                dueDate = {moment(assignment.due_date).format('MM/DD')}
                instructions = {assignment.description}
                status = {assignment.point_scored ? 'Done': 'Incomplete'}
                uploadFileFn = {uploadFileFn}
                assignmentID = {assignment.id}
                studentID = {assignment.student_id}
                attachment = {assignment.attachment}
                dateSubmitted = {assignment.date_submitted}
            />
        )
    })
    return(
        //this view should give me assignments and quizzes in order of due date
        
        <div>
            <Header as='h2'>Upcoming Assignments/Quizzes</Header>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Due Date</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {list}
                </Table.Body>
            </Table>

        </div>
    )
}
export default StudentCourseAssignments