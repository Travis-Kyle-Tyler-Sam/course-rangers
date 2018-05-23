import React, { Component } from 'react';
import { Sidebar, Segment, Button, Menu } from 'semantic-ui-react'
import {Link} from 'react-router-dom';

import { connect } from 'react-redux'
import { getUserInfo } from '../../dux/userReducer'

import './Navbar.css'


class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            visible: false
        }
    }

    componentDidMount() {
        this.props.getUserInfo();
    }


    render() { 


  
        return ( 

        <div className="navbar">
            <a href="/#/profile">Profile</a>

            <a href={process.env.REACT_APP_LOGOUT}>
                Logout
            </a>
    </div> )
    }
}

function mapStateToProps(state) {
    return {
        user: state.users.user
    }
}
 
export default connect( mapStateToProps, { getUserInfo } )(Navbar);