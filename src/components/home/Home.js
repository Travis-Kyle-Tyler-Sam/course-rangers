import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { getUserInfo } from "../../dux/userReducer";
import CRLogo from '../../CourseRangers.png'

import "./Home.css";

class Home extends Component {

  render() {
    return (
      <div className="mainDiv">
        <div className="login-container">
          <img alt='course rangers logo' src={ CRLogo } width='75%'/>
          <Button
            primary
            size="massive"
            href={ process.env.REACT_APP_LOGIN }
            id="login_button"
          >
            Login
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(null, { getUserInfo })(Home);
