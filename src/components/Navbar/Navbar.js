import React, { Component } from "react";
import {
  Sidebar,
  Segment,
  Button,
  Menu,
  Image,
  Dropdown
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { getUserInfo } from "../../dux/userReducer";

import "./Navbar.css";
import CRLogo from '../../CourseRangers.png'

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
    }
    
    componentDidMount() {
        if( !this.props.user.id ) {
            this.props.getUserInfo();
        }
    }
    
    handleDropDown = (e, data) => {
        if (data.value === "log-out") {
            axios.get("/auth/logout")
            .then(response => this.props.history.push("/"));
        } else {
            this.props.history.push(data.value);
        }
    };
    
    render() {
        
        let dashUrl
        
        if( this.props.user.user_type === 'Admin' ) {
            dashUrl = '/#/admindashboard'
        } else if( this.props.user.user_type === 'Instructor' ) {
            dashUrl = '/#/teacherdashboard'
        } else {
            dashUrl = '/#/studentdashboard'
        }
        
        const options = [
            {
                key: 'novalue',
                value: null
            },
            {
                key: "profile",
                text: "Profile",
                icon: "user circle",
                value: "/profile"
            },
            {
                key: "sign-out",
                text: "Sign Out",
                icon: "sign out",
                value: "log-out"
            }
        ];
        
        if (this.props.location.pathname === "/") {
            return null;
        }
        
        let url =
        this.props.user.user_image ||
        "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg";
        
        let Avatar = <Image src={url} height="70px" circular />;
        
    return (
        <div className="navbar">
            <img src={ CRLogo } height='90%'/>

            <div>
                <a href={ dashUrl }>Dashboard</a>

                <Dropdown
                    onChange={this.handleDropDown}
                    trigger={Avatar}
                    defaultValue={null}
                    options={options}
                    direction="left"
                    icon={null}
                />

            </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.users.user
  };
}

export default connect(mapStateToProps, { getUserInfo })(withRouter(Navbar));
