import React, {Component} from 'react';
import { Table } from 'semantic-ui-react'
import './StudentPendingAssign.css';
import StudentAssignmentDetail from './../StudentAssignmentDetail/StudentAssignmentDetail';
import PendingAssignmentTable from './PendingAssignmentTable/PendingAssignmentTable';
class PendingAssignCard extends Component {
    
    render() {
        const assignments = [
            { 
                courseName:'Math', 
                assignmentName:'Shapes', 
                instructorName:'Voltron', 
                dueDate:'Sometime soon', 
                instructions:'Draw some shapes or something'
            },
            { 
                courseName:'English', 
                assignmentName:'Shakespear', 
                instructorName:'Voltron', 
                dueDate:'Eventually', 
                instructions:'Read Romeo and Juliet'
            },
            { 
                courseName:'Biology', 
                assignmentName:'Cells', 
                instructorName:'Voltron', 
                dueDate:'Someday', 
                instructions:'Look at cells or sumthin'
            },

        ];
        const courses = ['Math','English','Biology'];
        const table = courses.map( course => {
            return(
                <PendingAssignmentTable
                    course = {course}
                    list = {assignments.filter( assignment => assignment.courseName == course)}
                />
            )
        })
        return (
            <div className='card'>
                <h2>Pending Assignments</h2>
                <hr/>
                {table}
                
            </div>
        )
    }
}
export default PendingAssignCard