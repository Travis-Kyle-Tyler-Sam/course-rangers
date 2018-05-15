import React, { Component } from "react";
import Login from "./../Login/Login";
import axios from "axios";
import { connect } from "react-redux";
import { getUserInfo } from "../../dux/userReducer";

class Home extends Component {
  componentDidMount() {
    this.props.getUserInfo();
  }

  render() {
    return (
      <div className="mainDiv">
       
          <h1>Welcome to Course Rangers!</h1>
        
         <Login />
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
