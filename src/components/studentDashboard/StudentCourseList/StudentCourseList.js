import React from 'react'
import { Header, Segment, List, Table, Loader, Dimmer } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function StudentCourseList (props){
    const { id, studentsCourses, courseRouteFn } = props;
    const courseList = studentsCourses.map( course => {
                        
        return(
        <Table.Row onClick={ () => courseRouteFn(course.course_id)}>
            <Table.Cell> {course.course_name}</Table.Cell>
            <Table.Cell>{course.teacher_name}</Table.Cell>
            {
                course.percent
                ?<Table.Cell>{course.percent}</Table.Cell>
                :null
            }
            {
                course.letterGrade
                ?<Table.Cell>{course.letterGrade}</Table.Cell>
                :null
            }

        </Table.Row>)
        
    })
    return(
        <div>
            
            <Segment>
            {studentsCourses[0].course_name
            ?<div>
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
                </div>
            //     :<Dimmer active>
            //     <Loader/>
            // </Dimmer>
            :null
            }
            </Segment>
            
            
        </div>
    )
}
export default StudentCourseList;