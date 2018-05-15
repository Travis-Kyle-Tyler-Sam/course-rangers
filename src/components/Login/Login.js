import React, {Component} from 'react';
import {Button} from 'semantic-ui-react'
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
        
               <Button primary size="massive" href={process.env.REACT_APP_LOGIN} id="login_button">Login</Button> 
           
        )
    }
}

export default Login;