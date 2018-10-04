import React, { Component } from "react";
import { Icon, Segment } from "semantic-ui-react";

class QList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let questions = this.props.questions.map((question, i) => {
      let qIcon =
        question.option_selected !== null ? (
          <Icon name="check circle outline" color="blue" />
        ) : (
          <Icon name="circle outline" color="red" />
        );

      return (
        <div
          className="qt-q-item"
          key={question.id}
          onClick={() => this.props.changeQ(i)}
        >
          {this.props.index === i && <Icon name="chevron right" primary />}
          Question {i + 1}
          {qIcon}
        </div>
      );
    });

    return (
      <Segment className="qlist-container" style={{ margin: 0 }}>
        <h2 className="qt-qlist-h2">Questions</h2>
        <div className="qlist-inner-container">{questions}</div>
      </Segment>
    );
  }
}

export default QList;
