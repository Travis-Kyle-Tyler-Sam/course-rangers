import React, { Component } from 'react';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <div>
    <a href={process.env.REACT_APP_LOGIN}>
              <button>
                    Login
                </button>
                  </a>

        </div> )
    }
}
 
export default Login;