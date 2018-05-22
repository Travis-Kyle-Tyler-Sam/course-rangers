import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import "./TeacherCourseDaySelector.css";
import TeacherCourseResources from "./TeacherCourseResources";
import TeacherCourseAssignments from "./TeacherCourseAssignments";
import _ from "lodash";
import {
  Card,
  Icon,
  Image,
  Input,
  Button,
  TextArea,
  Form,
  Header,
  Checkbox,
  Message,
  Tab,
  Pane,
  Segment
} from "semantic-ui-react";
class TeacherCourseDaySelector extends Component {
  constructor(props) {
    super(props);
    let filteredCourse = this.props.courses.filter(
      course => course.id === +this.props.match.params.courseid
    )[0];

    this.state = {
      course: filteredCourse
    };
  }

  render() {
    const {
      completion_date,
      course_name,
      days,
      start_date,
      students
    } = this.state.course;
    let daysToDisplay = days.map(day => {
      return (
        <Link to={`/teacher/lecture/${day.id}`} key={day.id + day.topic}>
          <div className="item1">
            <h3>{moment(day.date).format("MM/DD")}</h3>
            <h5>{day.topic}</h5>
          </div>
        </Link>
      );
    });
    let studentsInCourse = students.map(student => {
      return <li key={student.id + student.user_name}>{student.user_name}</li>;
    });
    const panes = [
      {
        menuItem: "Assignments",
        render: () => (
          <Tab.Pane>
            <TeacherCourseAssignments
              days={days}
              course={+this.props.match.params.courseid}
            />
          </Tab.Pane>
        )
      },
      {
        menuItem: "Resources",
        render: () => (
          <Tab.Pane>
            <TeacherCourseResources
              days={days}
              course={+this.props.match.params.courseid}
            />
          </Tab.Pane>
        )
      },
      {
        menuItem: "Students",
        render: () => (
          <Tab.Pane>
            <ol>{studentsInCourse}</ol>
          </Tab.Pane>
        )
      }
    ];
    return (
      <div>
        <Header>{course_name}</Header>

        <Button href="/#/teacher/lecture">Today</Button>
        <div className="card_floater">
          <Card style={{ width: "600px" }}>
            <div className="container1">{daysToDisplay}</div>
          </Card>

          <Card style={{ width: "auto", height: "auto" }}>
            <Tab panes={panes} />
          </Card>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    courses: state.teachers.courses
  };
}

export default connect(mapStateToProps)(TeacherCourseDaySelector);
