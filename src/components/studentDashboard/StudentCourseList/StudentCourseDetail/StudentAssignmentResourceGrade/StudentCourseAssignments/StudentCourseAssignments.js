import React from 'react';
import './StudentCourseAssignments.css';
import {Header, Segment, List, Table} from 'semantic-ui-react';

function StudentCourseAssignments(props){
    //assignments will come from props eventually
    const assignments = [
        {
            name:'assignment1',
            dueDate:'Friday',
            status:'incomplete',
            type:'assignment'
        },
        {
            name:'quiz1',
            dueDate:'Friday',
            status:'incomplete',
            type:'quiz'
        }
    ]
    const list = assignments.map( assignment => {
        return(
            <Table.Row>
                <Table.Cell>{assignment.name}</Table.Cell>
                <Table.Cell>{assignment.dueDate}</Table.Cell>
                <Table.Cell>{assignment.status}</Table.Cell>
            </Table.Row>
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