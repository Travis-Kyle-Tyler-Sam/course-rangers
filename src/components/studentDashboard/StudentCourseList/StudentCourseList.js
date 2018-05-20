import React from 'react'
import { Header, Segment, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function StudentCourseList (props){
    const { id, studentsCourses, courseRouteFn } = props;
    const courseList = studentsCourses.map( course => {
                        
        return(<List.Item onClick={ () => courseRouteFn(course.id)}>
           <p> {course.courseName}</p>
            <p>{course.teacherName}</p>
            <p>{course.percent}</p>
            <p>{course.letterGrade}</p>
        </List.Item>)
        
    })
    return(
        <div>
            <Segment>
                <Header as='h1'>My Courses</Header>
                <List>
                {courseList}
                </List>
            </Segment>
        </div>
    )
}
export default StudentCourseList;