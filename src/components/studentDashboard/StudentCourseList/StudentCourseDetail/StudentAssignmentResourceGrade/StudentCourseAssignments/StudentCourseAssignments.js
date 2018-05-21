import React from 'react';
import './StudentCourseAssignments.css';
import StudentAssignmentDetail from './../../../../StudentAssignmentDetail/StudentAssignmentDetail';
import {Header, Segment, List, Table} from 'semantic-ui-react';

function StudentCourseAssignments(props){
    //assignments will come from props eventually
    const assignments = [
        {
            assignmentName:'assignment1',
            dueDate:'Friday',
            status:'incomplete',
            type:'assignment',
            courseName:'Math',
            instructorName:'hank',
            instructions:'do the thing'
        },
        {
            assignmentName:'assignment1',
            dueDate:'Friday',
            status:'incomplete',
            type:'quiz',
            courseName:'Math',
            instructorName:'hank',
            instructions:'do the other thing'
        }
    ]
    const list = assignments.map( assignment => {
        return(
            <StudentAssignmentDetail
            courseName = {assignment.courseName}
                assignmentName = {assignment.assignmentName}
                instructorName = {assignment.instructorName}
                dueDate = {assignment.dueDate}
                instructions = {assignment.instructions}
                status = {assignment.status}
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