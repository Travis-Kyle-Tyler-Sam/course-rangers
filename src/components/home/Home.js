import React, { Component } from "react";
import axios from "axios";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { getUserInfo } from "../../dux/userReducer";

import "./Home.css";

class Home extends Component {
  componentDidMount() {
    this.props.getUserInfo();
  }

  render() {
    return (
      <div className="mainDiv">
        <div className="login-container">
          <h1>Welcome to Course Rangers!</h1>
          <Button
            primary
            size="massive"
            href={process.env.REACT_APP_LOGIN}
            id="login_button"
          >
            Login
          </Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(null, { getUserInfo })(Home);
