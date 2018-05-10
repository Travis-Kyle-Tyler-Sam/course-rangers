import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            
         }
    }
    render() { 
        return ( <div>
    <a href={process.env.REACT_APP_LOGIN}>
              <Button primary>
                    Login
                </Button>
                  </a>

        </div> )
    }
}
 
export default Login;