import React, { Component } from 'react';
import { Sidebar, Segment, Button, Menu, Image } from 'semantic-ui-react'
import {Link, withRouter} from 'react-router-dom';

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
        
        if( this.props.location.pathname === "/") {
            return null
        }

        let url = this.props.user.user_image || 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg'

    return ( 

    <div className="navbar">
        <a href="/#/profile">Profile</a>

        <a href={process.env.REACT_APP_LOGOUT}>
            Logout
        </a>

        <Image src={ url } height='70px' circular />
    </div> 
    )}
}

function mapStateToProps(state) {
    return {
        user: state.users.user
    }
}
 
export default connect( mapStateToProps, { getUserInfo } )( withRouter(Navbar) );