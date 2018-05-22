import React, {Component} from 'react';
import StudentCourseAssignments from './StudentCourseAssignments/StudentCourseAssignments';
import StudentCourseGrade from './StudentCourseGrades/StudentCourseGrades';
import StudentCourseResources from './StudentCourseResources/StudentCourseResources';
import {Segment, Tab, Dimmer, Loader} from 'semantic-ui-react';

function StudentAssignmentResourceGrade(props) {
    const panes = [
        {menuItem:'Assignments', render: () => <Tab.Pane>
            <StudentCourseAssignments
            assignments = {props.assignments.filter( assignment => {
                return (
                    assignment.point_scored === null
                    
            )
            })}
            course = {props.course}
            />
            </Tab.Pane>},
        {menuItem:'Resources', render: () => <Tab.Pane>
            <StudentCourseResources
            resources = {props.resources}
            />
            </Tab.Pane>},
        {menuItem:'Grade', render: () => <Tab.Pane>
            <StudentCourseGrade
            grades = {props.assignments}
            />
            </Tab.Pane>}
    ]
    return(
        <div>
            
            <Tab panes={panes}/>
            
        </div>
    )
}
export default StudentAssignmentResourceGrade;