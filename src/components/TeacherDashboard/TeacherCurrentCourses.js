import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import { connect } from 'react-redux';
import { updateCourses } from '../../dux/teacherReducer';
import TodayButton from './TodayButton';
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
  Message
} from "semantic-ui-react";

import './TeacherCourseTemplates.css'

class TeacherCurrentCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCourses: [],
      today: ''
    };
  }

  componentDidMount() {
    this.getTeachersCourses();
    this.populateToday()
  }

  getTeachersCourses() {
    axios.get("/api/courses").then(response => {
      this.props.updateCourses(response.data);
    });
  }

  deleteCourse(id) {
    axios.delete(`/api/course/${id}`).then(response => {
      return this.getTeachersCourses();
    });
  }
  populateToday(){
    this.setState({today: moment().format('YYYY-MM-DD')}) 
  }

  render() {


    let currentCourseList = this.props.courses.map(course => {
      return (
        <Table.Row key={course.id}>
          <Table.Cell>
            <TodayButton today={this.state.today} courseid={course.id}/>
          </Table.Cell>
          <Table.Cell> <Link to={`/teacher/dayselector/${course.id}`}>{course.course_name}</Link></Table.Cell>
          <Table.Cell>{course.curriculum_id}</Table.Cell>
          <Table.Cell>
            {moment(course.start_date).format("MMMM DD, YYYY")}
          </Table.Cell>
          <Table.Cell>
            {moment(course.completion_date).format("MMMM DD, YYYY")}
          </Table.Cell>
          <Table.Cell>
            <Button basic icon circular>
              <Link to={`/coursebuilder/${course.id}`}>
                <Icon name="edit" />
              </Link>
            </Button>
          </Table.Cell>
          <Table.Cell>
            <Button basic icon circular onClick={() => this.deleteCourse(course.id)}>
              <Icon name="trash" />
            </Button>
          </Table.Cell>
        </Table.Row>
      );
    });

    return (
      <div className='tct-template-container'>
        <Link to="/coursebuilder">
          <Button icon labelPosition="right">
            Add New Current Course<Icon name="plus" />
          </Button>
        </Link>
        <Table 
          striped 
          className='tct-table'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Today</Table.HeaderCell>
              <Table.HeaderCell>Course</Table.HeaderCell>
              <Table.HeaderCell>Curriculum</Table.HeaderCell>
              <Table.HeaderCell>Start Date</Table.HeaderCell>
              <Table.HeaderCell>End Date</Table.HeaderCell>
              <Table.HeaderCell>Edit</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{currentCourseList}</Table.Body>
        </Table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    courses: state.teachers.courses
  }
}

export default connect(mapStateToProps, { updateCourses })(TeacherCurrentCourses);
