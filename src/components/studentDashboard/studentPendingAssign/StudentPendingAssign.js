import React, {Component} from 'react';
import { Table, Dimmer, Loader } from 'semantic-ui-react'
import './StudentPendingAssign.css';
import StudentAssignmentDetail from './../StudentAssignmentDetail/StudentAssignmentDetail';
import PendingAssignmentTable from './PendingAssignmentTable/PendingAssignmentTable';
class PendingAssignCard extends Component {
    
    render() {
       const { courses, assignments } = this.props;
        // const assignments = [
        //     { 
        //         courseName:'Math', 
        //         assignmentName:'Shapes', 
        //         instructorName:'Voltron', 
        //         dueDate:'Sometime soon', 
        //         instructions:'Draw some shapes or something'
        //     },
        //     { 
        //         courseName:'English', 
        //         assignmentName:'Shakespear', 
        //         instructorName:'Voltron', 
        //         dueDate:'Eventually', 
        //         instructions:'Read Romeo and Juliet'
        //     },
        //     { 
        //         courseName:'Biology', 
        //         assignmentName:'Cells', 
        //         instructorName:'Voltron', 
        //         dueDate:'Someday', 
        //         instructions:'Look at cells or sumthin'
        //     },

        // ];
        
        const table = courses.map( course => {
            return(
                <PendingAssignmentTable
                    course = {course}
                    list = {assignments.filter( assignment => {
                        return assignment.course_name == course && !assignment.date_submitted
                    })}
                    key = {`pendingtable${course}`}
                    uploadFileFn = {this.props.uploadFileFn}
                />
            )
        })
        return (
            <div className='card'>
            {courses[0]
            ?
                <div>
                    <h2>Pending Assignments</h2>
                    <hr/>
                    {table}
                </div>
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