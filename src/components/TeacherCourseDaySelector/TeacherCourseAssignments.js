import React, { Component } from "react";
import { Header, Segment, List, Table } from "semantic-ui-react";
import _ from "lodash";
import { connect } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
class TeacherCourseAssignments extends Component {
  constructor(props) {
    super(props);
    let filteredCourse = this.props.courses.filter(
      course => course.id === this.props.course
    )[0];
    this.state = {
      currentCourse: filteredCourse
    };
  }

  render() {
    const tempAssignments = [];
    const tempQuizzes = [];

    if (!this.props.days) {
      return "";
    }
    if (this.props.days) {
      let assignment = this.props.days.map(day => {
        return day.assignments;
      });

      tempAssignments.push(assignment);
    }
    if (this.props.days) {
      let quiz = this.props.days.map(day => {
        return day.quizzes;
      });

      tempQuizzes.push(quiz);
    }
    const assignmentsToMap = _.flattenDeep(tempAssignments);
    const quizzesToMap = _.flattenDeep(tempQuizzes);
    var uniqueQuizzes = _.uniqBy(quizzesToMap, "description");
    var uniqueAssignments = _.uniqBy(assignmentsToMap, "description");

    const assignmentsList = uniqueAssignments.map(assignment => {
      return (
        <Table.Row key={assignment.id + assignment.description}>
          <Table.Cell> 
            <Link to={`/teacher/courseassignments/${assignment.course_id}/${assignment.assignment_id}`}>
              {assignment.name}
            </Link>
          </Table.Cell>
          <Table.Cell>{moment(assignment.due_date).format("MM/DD")}</Table.Cell>
        </Table.Row>
      );
    });
    const quizzesList = uniqueQuizzes.map(quiz => {
      return (
        <Table.Row key={quiz.id + quiz.description}>
          <Table.Cell>
            <Link to={`/teacher/courseassignments/${quiz.course_id}/${quiz.assignment_id}`}>
              {quiz.name}
            </Link>
          </Table.Cell>
          <Table.Cell>{moment(quiz.due_date).format("MM/DD")}</Table.Cell>
        </Table.Row>
      );
    });
    return (
      <div>
        <Header as="h2">Upcoming Assignments/Quizzes</Header>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Assignment Name</Table.HeaderCell>
              <Table.HeaderCell>Due Date</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{assignmentsList}</Table.Body>
        </Table>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Quiz Name</Table.HeaderCell>
              <Table.HeaderCell>Due Date</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{quizzesList}</Table.Body>
        </Table>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    courses: state.teachers.courses
  };
}

export default connect(mapStateToProps)(TeacherCourseAssignments);
