import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
class TeacherCurrentCourses extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            currentCourses: ['a', 'b', 'c']
         }
    }
    render() { 

        let currentCourseList = this.state.currentCourses.map(course=>{
            return <Table.Row>
      <Table.Cell><button>Today</button></Table.Cell>
      <Table.Cell>Course #</Table.Cell>
      <Table.Cell>Curriculum</Table.Cell>
      <Table.Cell>Start Date</Table.Cell>
      <Table.Cell>End Date</Table.Cell>      
      <Table.Cell><button>Edit</button></Table.Cell>
      <Table.Cell><button>Delete</button></Table.Cell>
            </Table.Row>
        })

        return ( <div>
            <button>Add New Current Course</button>
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