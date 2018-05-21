import React, { Component } from 'react';
import { Header, Segment, List, Table, Button, Icon, Modal } from "semantic-ui-react";
import _ from "lodash";
import { connect } from "react-redux";
import moment from "moment";
import axios from 'axios';
class TeacherAssignmentsView extends Component {
    constructor(props) {
        super(props);
      
        this.state = { 
            assignments: [],
            pointsScored: 0,
            percentage: 0,
            letterGrade: '',
            pointsPossible: 0
         }
    }
    componentDidMount(){
        axios.get(`/api/courseassignments/${this.props.match.params.assignmentid}`)
        .then(response =>{
            this.setState({assignments: response.data})
        })
    }
gradeAssignment(assignmentId, pointsScored, percentage,studentAssignmentId){
    let letterGrade = this.letterGrade(percentage)
    let body = {
        assignmentId,
        pointsScored: +pointsScored,
        percentage,
        letterGrade: letterGrade,
    
    }
axios.put(`/api/gradeassignment/${studentAssignmentId}`, body).then(response =>{
    this.setState({assignments: response.data
    })
})
}
letterGrade(percentage){
    if(percentage >= 90){   
        return "A"
    }
    if(percentage >= 80 && percentage < 90){      
        return "B"
    }
    if(percentage >= 70 && percentage < 80){       
        return "C"
    }
    if(percentage >= 60 && percentage < 70){     
        return "D"
    }
    if(percentage < 60){     
        return "F"
    }
    else {
        return ""
    }
}
percentageFinder(pointsScored, pointsPossible){
    this.setState({percentage: pointsScored * 100 / pointsPossible })
  
}
handlePointsChange(e, pointsPossible){
    this.percentageFinder(e.target.value, this.state.pointsPossible)
    let letterGrade = this.letterGrade(this.state.percentage)
    this.setState({pointsScored: e.target.value,
        letterGrade: letterGrade,
        pointsPossible: pointsPossible
    })
}
    render() { 
      console.log(this.state)
       let assignments = this.state.assignments.map(assignment =>{
           
           return <Table.Row key={assignment.assignment_id + assignment.user_name}>
           <Table.Cell>{assignment.name}</Table.Cell>
           <Table.Cell>{assignment.user_name}</Table.Cell>
           <Table.Cell>{moment(assignment.due_date).format('MM/DD')}</Table.Cell>
           <Table.Cell>{assignment.percentage? (`${assignment.percentage}%`):  <Modal closeIcon trigger={<Button> Grade</Button>} >
    <Header content={`${assignment.name} for ${assignment.user_name}`} />
    <Modal.Content>
       <p>{`Assignment Description: ${assignment.description}`}</p> 
    <p>{`Attachment: ${assignment.attachment} `}</p>
    <p>{`Date Submitted: ${moment(assignment.date_submitted).format('MM/DD')}`}</p>
    <p>{`Points: `} <input type="number" onChange={(e)=>this.handlePointsChange(e,assignment.points_possible)}/></p>
    <p>{`Points Possible: ${assignment.points_possible}`}</p>
    <p>{`Percentage: ${this.state.pointsScored * 100 / assignment.points_possible}%`}</p>
    <p>{`Letter Grade: ${this.letterGrade(this.state.pointsScored * 100 / assignment.points_possible)}`}</p>
    </Modal.Content>
    <Modal.Actions>
      <Button color='green' onClick={()=>this.gradeAssignment(assignment.assignment_id, this.state.pointsScored, this.state.percentage, assignment.id)} >
        <Icon name='checkmark' /> Submit Grade
      </Button>
    </Modal.Actions>
  </Modal>}</Table.Cell>
           
           
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
  