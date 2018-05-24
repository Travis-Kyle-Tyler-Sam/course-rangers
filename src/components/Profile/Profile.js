import React, { Component } from 'react';
import { connect } from "react-redux";
import { Header, Segment, List, Table, Button, Icon, Modal, Image, Card } from "semantic-ui-react";
import { getUserInfo } from './../../dux/userReducer';
import FileUpload from './../FileUpload';
import './Profile.css';


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentDidMount() {
        this.props.getUserInfo();
      }



    render() { 
        console.log(this.props.user)
        return ( 
            <div className="profile_parent_div">
        <Card id='profile_card'>
                <h1>{this.props.user.user_name}</h1>
  <Image src={this.props.user.user_image} size='small' circular alt=""/>
            <p>Email: {this.props.user.email}</p>
            <p>Phone Number: {this.props.user.phone_number}</p>
            
        </Card> 
        </div>
        )
    }
}
 
function mapStateToProps(state) {
    return {
      user: state.users.user
    };
  }
  
  export default connect(mapStateToProps, { getUserInfo })(Profile);