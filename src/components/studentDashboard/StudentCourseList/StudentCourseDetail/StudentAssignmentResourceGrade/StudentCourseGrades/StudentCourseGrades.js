import React from 'react';
import { Table, Header } from 'semantic-ui-react';
import GradesTable from './GradesTable/GradesTable';
function StudentCourseGrades(props){
    // const grades = [
    //     {
    //         type:'assignment',
    //         name:'assignment1',
    //         score:'17/20',
    //         grade:85
    //     },
    //     {
    //         type:'assignment',
    //         name:'assignment2',
    //         score:'17/20',
    //         grade:85
    //     },
    //     {
    //         type:'quiz',
    //         name:'quiz1',
    //         score:'17/20',
    //         grade:85
    //     },
    //     {
    //         type:'quiz',
    //         name:'quiz2',
    //         score:'17/20',
    //         grade:85
    //     }
    // ]
    const {grades} = props
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
    return(
        <div>
            <Header as='h2'>Grades</Header>
            <GradesTable
            type='Assignments'
            singular='Assignment'
            list = {assignments}/>
            <GradesTable
            type='Quizzes'
            singular='Quiz'
            list = {quizzes}/>
        </div>
    )
}
export default StudentCourseGrades;