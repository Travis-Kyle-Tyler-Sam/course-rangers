import React, { Component } from 'react';
import { Sidebar, Segment, Button, Menu } from 'semantic-ui-react'
import {Link} from 'react-router-dom';


class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            visible: false
        }
    }


    render() { 


  
        return ( <div id="navbar">
        <Button><Link to="/profile">Profile</Link></Button>
            <Button id="logout"> <a href={process.env.REACT_APP_LOGOUT}>
                    Logout
                </a>
            </Button>
        </div> )
    }
}
 
export default Navbar;