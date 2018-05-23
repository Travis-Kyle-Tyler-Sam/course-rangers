import React from 'react';
import StudentAssignmentDetail from './../../StudentAssignmentDetail/StudentAssignmentDetail'
import { Table } from 'semantic-ui-react';
import moment from 'moment';
function PendingAssignmentTable (props){
    const {list, course} = props;
    const assignments = list.map( assignment => {
        
        return (
            <StudentAssignmentDetail
                courseName = {assignment.course_name}
                assignmentName = {assignment.name}
                instructorName = {assignment.teacher_name}
                dueDate = {moment(assignment.due_date).format('MM/DD')}
                instructions = {assignment.description}
                key = {`pend-assignment-detail${assignment.id}`}
                uploadFileFn = {props.uploadFileFn}
                assignmentID = {assignment.id}
                studentID = {assignment.studentID}
                attachment = {assignment.attachment}
                dateSubmitted = {assignment.date_submitted}
            />
        )
    })
    return(
        <Table striped color='brown' >
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>{course}</Table.HeaderCell>
                    <Table.HeaderCell>Due Date</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {assignments}
            </Table.Body>
        </Table>
    )
}
export default PendingAssignmentTable