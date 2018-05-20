import React from 'react';
import StudentAssignmentDetail from './../../StudentAssignmentDetail/StudentAssignmentDetail'
import { Table } from 'semantic-ui-react';
function PendingAssignmentTable (props){
    const {list, course} = props;
    const assignments = list.map( assignment => {
        return (
            <StudentAssignmentDetail
                courseName = {assignment.courseName}
                assignmentName = {assignment.assignmentName}
                instructorName = {assignment.instructorName}
                dueDate = {assignment.dueDate}
                instructions = {assignment.instructions}
            />
        )
    })
    return(
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>{course}</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {assignments}
            </Table.Body>
        </Table>
    )
}
export default PendingAssignmentTable