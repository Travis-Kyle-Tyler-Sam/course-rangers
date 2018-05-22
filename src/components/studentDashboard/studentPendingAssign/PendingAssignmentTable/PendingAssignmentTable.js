import React from 'react';
import StudentAssignmentDetail from './../../StudentAssignmentDetail/StudentAssignmentDetail'
import { Table } from 'semantic-ui-react';
function PendingAssignmentTable (props){
    const {list, course} = props;
    const assignments = list.map( assignment => {
        
        return (
            <StudentAssignmentDetail
                courseName = {assignment.course_name}
                assignmentName = {assignment.name}
                instructorName = {assignment.teacher_name}
                dueDate = {assignment.due_date}
                instructions = {assignment.description}
                key = {`pend-assignment-detail${assignment.id}`}
            />
        )
    })
    return(
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>{course}</Table.HeaderCell>
                    <Table.HeaderCell>Due Date</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {assignments}
            </Table.Body>
        </Table>
    )
}
export default PendingAssignmentTable