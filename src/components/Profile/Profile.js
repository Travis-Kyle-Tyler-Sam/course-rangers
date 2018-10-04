import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Image, Card } from "semantic-ui-react";
import { getUserInfo } from './../../dux/userReducer';
import './Profile.css';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentDidMount() {
        this.props.getUserInfo();
    }

    
    goBack = () => {
        this.props.history.goBack();
    }

    render() { 
        return ( 
        <div className="profile_parent_div">
            <Card id='profile_card'>
                <div>
                    <Image src={this.props.user.user_image} size='small' circular alt=""/>
                </div>

                <div className='profile-text-container'>
                    <h1>{this.props.user.user_name}</h1>
                    <p><strong>Email:</strong> {this.props.user.email}</p>
                    <p> <strong>Phone: </strong> {this.props.user.phone_number}</p>
                </div>
                
            </Card> 
                <div className='profile-btn-container'>
                    <Button onClick={ this.goBack } size='large'>Cancel</Button>
                    <Button onClick={ this.goBack } size='large' primary>Edit</Button>
                </div>
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