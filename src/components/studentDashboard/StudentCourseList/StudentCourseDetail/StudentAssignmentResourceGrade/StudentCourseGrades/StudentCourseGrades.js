import React from 'react';
import { Table, Tab } from 'semantic-ui-react';
import GradesTable from './GradesTable/GradesTable';
import '../../StudentCourseDetail.css';
function StudentCourseGrades(props){
    const { grades } = props
    const assignments = grades.filter( assignment => assignment.type==='assignment').map( assignment => {
        return(
            <Table.Row>
                <Table.Cell>{assignment.name}</Table.Cell>
                <Table.Cell>{
                    assignment.point_scored
                    ?`${assignment.point_scored}/${assignment.points_possible}`
                    : 'Not yet graded'
                    }</Table.Cell>
                <Table.Cell>{
                    assignment.percentage
                    ?`${assignment.percentage}%`
                    : 'Not yet graded'
                    }</Table.Cell>
            </Table.Row>
        )
    })
    const quizzes = grades.filter( assignment => assignment.type === 'quiz')
    .map( assignment => {
        return(
            <Table.Row>
                <Table.Cell>{assignment.name}</Table.Cell>
                <Table.Cell>{
                    assignment.point_scored
                    ?`${assignment.point_scored}/${assignment.points_possible}`
                    : 'Not yet graded'
                    }</Table.Cell>
                <Table.Cell>{
                    assignment.percentage
                    ?`${assignment.percentage}%`
                    : 'Not yet graded'
                    }</Table.Cell>
            </Table.Row>
        )
    })
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