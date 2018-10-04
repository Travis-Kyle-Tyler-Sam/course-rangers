import React from 'react'
import { Header, Segment, Table, Button } from 'semantic-ui-react';
import '../StudentDashboard.css'

function StudentCourseList (props){
    const { studentsCourses, courseRouteFn, calculatePercentFn, assignments } = props;
    const courseList = studentsCourses.map( course => {
        let courseAssignments = assignments.filter( assignment => {
            return assignment.course_id === course.course_id && assignment.point_scored !== null
        })
        let coursePercent = calculatePercentFn(courseAssignments)
        return(
        <Table.Row key={course.course_id}>
            <Table.Cell onClick={ () => courseRouteFn(course.course_id)} ><Button primary>View Course</Button></Table.Cell>
        
            <Table.Cell >{course.course_name}</Table.Cell>
            <Table.Cell>{course.teacher_name}</Table.Cell>
            {
                course.percent
                ?<Table.Cell>{course.percent}</Table.Cell>
                :<Table.Cell>{coursePercent.percent ? `${coursePercent.percent}%` : coursePercent }</Table.Cell>
            }
            {
                course.letterGrade
                ?<Table.Cell>{course.letterGrade}</Table.Cell>
                :<Table.Cell>{coursePercent.letter}</Table.Cell>
            }

        </Table.Row>)
        
    })
    return(
        <div className='course-list'>
            
            <Segment
                color='green'>
            {studentsCourses.length !== 0
            ?<div>
                <Header as='h1'>My Courses</Header>
                <Table striped >
                    <Table.Header>
                        <Table.Row>
                        <Table.HeaderCell>View Course</Table.HeaderCell> 
                            <Table.HeaderCell>Course Name</Table.HeaderCell>
                            <Table.HeaderCell>Teacher</Table.HeaderCell>
                            <Table.HeaderCell>Percent</Table.HeaderCell>
                            <Table.HeaderCell>Grade</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {courseList}
                    </Table.Body>
                </Table>
                </div>
            :<div>No classes yet!</div>
            }
            </Segment>
            
            
        </div>
    )
}
export default StudentCourseList;