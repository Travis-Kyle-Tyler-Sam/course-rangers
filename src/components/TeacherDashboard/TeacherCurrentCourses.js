import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import axios from 'axios';
import {Link} from 'react-router-dom';
class TeacherCurrentCourses extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            currentCourses: []
         }
    }

    componentDidMount(){
this.getTeachersCourses()
    }

 getTeachersCourses() {
    axios.get('/api/teacher_courses/:teacher_id').then(response => {
        console.log(response.data)
      this.setState({currentCourses: response.data})
    });
 }



deleteCourse(id){
    axios.delete(`/api/delete_course/${id}`).then(response =>{
        return this.getTeachersCourses()
       })
}

    render() { 

        let currentCourseList = this.state.currentCourses.map(course=>{
            console.log(course)
            return <Table.Row>
      <Table.Cell><button>Today</button></Table.Cell>
      <Table.Cell> Course #????</Table.Cell>
      <Table.Cell>{course.course_name}</Table.Cell>
      <Table.Cell>{course.start_date}</Table.Cell>
      <Table.Cell>{course.completion_date}</Table.Cell>      
      <Table.Cell><button><Link to= '/coursebuilder' course ={course}>
            Edit
             </Link></button></Table.Cell>
      <Table.Cell><button onClick={()=>this.deleteCourse(course.id)}>Delete</button></Table.Cell>
            </Table.Row>
        })

        return ( <div>
            <button><Link to= '/coursebuilder'>
            Add New Current Course
             </Link></button>
            <Table striped>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Today</Table.HeaderCell>
        <Table.HeaderCell>Course #</Table.HeaderCell>
        <Table.HeaderCell>Curriculum</Table.HeaderCell>
        <Table.HeaderCell>Start Date</Table.HeaderCell>
        <Table.HeaderCell>End Date</Table.HeaderCell>
        <Table.HeaderCell>Edit</Table.HeaderCell>
        <Table.HeaderCell>Delete</Table.HeaderCell>
        
        
      </Table.Row>
    </Table.Header>

    <Table.Body>
     {currentCourseList}
    </Table.Body>
  </Table>

        </div> )
    }
}
 
export default TeacherCurrentCourses;