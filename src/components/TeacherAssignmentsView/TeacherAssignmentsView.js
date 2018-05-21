import React, { Component } from 'react';
import { Header, Segment, List, Table, Button } from "semantic-ui-react";
import _ from "lodash";
import { connect } from "react-redux";
import moment from "moment";
import axios from 'axios';
class TeacherAssignmentsView extends Component {
    constructor(props) {
        super(props);
      
        this.state = { 
            assignments: []
         }
    }
    componentDidMount(){
        axios.get(`/api/courseassignments/${this.props.match.params.assignmentid}`)
        .then(response =>{
            this.setState({assignments: response.data})
        })
    }


 
    render() { 
       let assignments = this.state.assignments.map(assignment =>{
           return <Table.Row key={assignment.assignment_id + assignment.user_name}>
           <Table.Cell>{assignment.name}</Table.Cell>
           <Table.Cell>{assignment.user_name}</Table.Cell>
           <Table.Cell>{moment(assignment.due_date).format('MM/DD')}</Table.Cell>
           <Table.Cell>{assignment.percentage? assignment.percentage: <Button>Grade</Button>}</Table.Cell>
           
           
           </Table.Row>
       })
        return ( 
            <div>
          <Header as="h2"></Header>
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Assignment</Table.HeaderCell>
              <Table.HeaderCell>Student</Table.HeaderCell>
              <Table.HeaderCell>Due Date</Table.HeaderCell>
              <Table.HeaderCell>Grade</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
              {assignments}
          </Table.Body>
        </Table>
            </div>
         )
    }
}
function mapStateToProps(state) {
    return {
      courses: state.teachers.courses
    };
  }
  
  export default connect(mapStateToProps)(TeacherAssignmentsView);
  