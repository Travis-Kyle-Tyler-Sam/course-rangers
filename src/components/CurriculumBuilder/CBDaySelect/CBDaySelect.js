import React, { Component } from "react";
import {
  Card,
  Icon,
  Image,
  Input,
  Button,
  TextArea,
  Form,
  Header,
  Checkbox
} from "semantic-ui-react";
import "../CurriculumBuilder.css";

class CBDaySelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dayTopicInput: this.props.selectedDay.dayTopic || "",
      editingTopicDesc: true,
      dayDescriptionInput: this.props.selectedDay.dayDesc || ""
    };
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  topicDescSave = () => {
    let { dayTopicInput, dayDescriptionInput } = this.state;

    if (dayTopicInput !== "" && dayDescriptionInput !== "") {
      this.setState({
        editingTopicDesc: !this.state.editingTopicDesc
      });

      if (this.state.editingTopicDesc) {
        let {
          dayNum,
          assignments,
          resources,
          quizzes
        } = this.props.selectedDay;
        let sendDay = {
          dayNum,
          assignments,
          resources,
          quizzes,
          dayTopic: dayTopicInput,
          dayDesc: dayDescriptionInput
        };
        this.props.updateDay(sendDay);
      }
    }
  };

  killResource = i => {
    let freshSelDay = { ...this.props.selectedDay };
    let resources = [...freshSelDay.resources];

    resources.splice(i, 1);

    freshSelDay.resources = resources;

    this.props.updateDay(freshSelDay);
  };

  killAssignment = i => {
    let freshSelDay = { ...this.props.selectedDay };
    let assignments = [...freshSelDay.assignments];
    assignments.splice(i, 1);

    freshSelDay.assignments = assignments;

    this.props.updateDay(freshSelDay);
  };

  killQuiz = i => {
    let freshSelDay = { ...this.props.selectedDay };
    let quizzes = [...freshSelDay.quizzes];
    quizzes.splice(i, 1);

    freshSelDay.quizzes = quizzes;

    this.props.updateDay(freshSelDay);
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.selectedDay.dayNum !== this.props.selectedDay.dayNum) {
      this.setState({
        dayTopicInput: this.props.selectedDay.dayTopic || "",
        editingTopicDesc: true,
        dayDescriptionInput: this.props.selectedDay.dayDesc || ""
      });
    }
  }

  render() {
    // Button label switches between save and edit in the day
    let daySaveLabel = this.state.editingTopicDesc ? "Save" : "Edit";

    let { resources, assignments, quizzes } = this.props.selectedDay;

    let resourceList = resources
      ? resources.map((resource, i) => {
          return (
            <div>
              <Icon
                color="red"
                name="close"
                onClick={() => this.killResource(i)}
              />

              {resource.title}
            </div>
          );
        })
      : null;

    let assignmentList = assignments
      ? assignments.map((assignment, i) => {
          return (
            <div>
              <Icon
                color="red"
                name="close"
                onClick={() => this.killAssignment(i)}
              />
              {assignment.title}
            </div>
          );
        })
      : null;

    let quizList = quizzes
      ? quizzes.map((quiz, i) => {
          return (
            <div>
              <Icon color="red" name="close" onClick={() => this.killQuiz(i)} />
              {quiz.title}
            </div>
          );
        })
      : null;

    return (
      <div className="ui segment cb-pane" style={{ margin: 10 }}>
        <Header>Day {this.props.selectedDay.dayNum}</Header>
        <div className="cbds-inputs-container">
          {!this.state.editingTopicDesc && (
            <div>
              <Header> {this.state.dayTopicInput} </Header>
              <p> {this.state.dayDescriptionInput} </p>
            </div>
          )}
          {this.state.editingTopicDesc && (
            <div>
              <Input
                name="dayTopicInput"
                value={this.state.dayTopicInput}
                onChange={this.handleInput}
                placeholder="Topic"
                fluid
              />

              <Form>
                <TextArea
                  name="dayDescriptionInput"
                  value={this.state.dayDescriptionInput}
                  onChange={this.handleInput}
                  placeholder="Description"
                  fluid
                />
              </Form>
            </div>
          )}

          <Button
            primary={true}
            style={{ float: "right" }}
            onClick={this.topicDescSave}
          >
            {daySaveLabel}
          </Button>
        </div>

        {daySaveLabel === "Edit" && (
          <div>
            <div className="cbds-day-group">
              <h3>Resources</h3>
              <Button
                size="mini"
                positive
                icon
                onClick={() => this.props.switch(1)}
              >
                <Icon name="plus" />
              </Button>
            </div>

            <div className="cbds-list-container">{resourceList}</div>

            <div className="cbds-day-group">
              <h3>Assignments</h3>
              <Button
                size="mini"
                positive
                icon
                onClick={() => this.props.switch(2)}
              >
                <Icon name="plus" />
              </Button>
            </div>
            <div className="cbds-list-container">{assignmentList}</div>

            <div className="cbds-day-group">
              <h3>Quizzes</h3>
              <Button
                size="mini"
                positive
                icon
                onClick={() => this.props.switch(3)}
              >
                <Icon name="plus" />
              </Button>
            </div>
            <div className="cbds-list-container">{quizList}</div>
          </div>
        )}
      </div>
    );
  }
}

export default CBDaySelect;
