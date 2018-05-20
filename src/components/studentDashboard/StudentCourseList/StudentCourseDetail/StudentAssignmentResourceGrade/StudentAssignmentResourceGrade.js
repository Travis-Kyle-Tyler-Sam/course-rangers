import React, {Component} from 'react';
import StudentCourseAssignments from './StudentCourseAssignments/StudentCourseAssignments';
import StudentCourseGrade from './StudentCourseGrades/StudentCourseGrades';
import StudentCourseResources from './StudentCourseResources/StudentCourseResources';
import {Segment, Tab} from 'semantic-ui-react';

function StudentAssignmentResourceGrade() {
    const panes = [
        {menuItem:'Assignments', render: () => <Tab.Pane><StudentCourseAssignments/></Tab.Pane>},
        {menuItem:'Resources', render: () => <Tab.Pane><StudentCourseResources/></Tab.Pane>},
        {menuItem:'Grade', render: () => <Tab.Pane><StudentCourseGrade/></Tab.Pane>}
    ]
    return(
        <Tab panes={panes}/>
    )
}
export default StudentAssignmentResourceGrade;