import React from 'react'
import { Header, Segment, List, Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function StudentCourseList (props){
    const { id, studentsCourses, courseRouteFn } = props;
    const courseList = studentsCourses.map( course => {
                        
        return(
        <Table.Row onClick={ () => courseRouteFn(course.id)}>
            <Table.Cell> {course.courseName}</Table.Cell>
            <Table.Cell>{course.teacherName}</Table.Cell>
            <Table.Cell>{course.percent}</Table.Cell>
            <Table.Cell>{course.letterGrade}</Table.Cell>
        </Table.Row>)
        
    })
    return(
        <div>
            <Segment>
                <Header as='h1'>My Courses</Header>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Course</Table.HeaderCell>
                            <Table.HeaderCell>Teacher</Table.HeaderCell>
                            <Table.HeaderCell>Percent</Table.HeaderCell>
                            <Table.HeaderCell>Grade</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {courseList}
                    </Table.Body>
                </Table>
            </Segment>
        </div>
    )
}
export default StudentCourseList;