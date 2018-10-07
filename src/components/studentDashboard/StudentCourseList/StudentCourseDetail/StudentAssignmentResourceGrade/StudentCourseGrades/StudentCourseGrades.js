import React from 'react';
import { Tab } from 'semantic-ui-react';
import GradesTable from './GradesTable/GradesTable';
import '../../StudentCourseDetail.css';
function StudentCourseGrades(props){
    const { grades } = props
    const assignments = grades.filter( assignment => assignment.type==='assignment')
    const quizzes = grades.filter( assignment => assignment.type === 'quiz')
    
    const panes = [
        {
            menuItem:'Assignments', render: () =>
            <Tab.Pane>
                <GradesTable
                    type='Assignments'
                    singular='Assignment'
                    list = {assignments}
                />
            </Tab.Pane>
        },
        {
            menuItem:'Quizzes', render: () =>
            <Tab.Pane>
                 <GradesTable
                    type='Quizzes'
                    singular='Quiz'
                    list = {quizzes}
                />
            </Tab.Pane>
        }
    ]
    return(
        <div className='student-course-grades'>
            <Tab panes={panes}/>
            
        </div>
    )
}
export default StudentCourseGrades;