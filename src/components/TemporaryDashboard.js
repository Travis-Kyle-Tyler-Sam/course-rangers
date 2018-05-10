import React, { Component } from 'react';
import { connect } from "react-redux";
import { getUserInfo } from './../dux/userReducer';
import { Link } from "react-router-dom";
///// this dashboard doesn't actually link anywhere yet

class TemporaryDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }


    componentDidMount() {
        this.props.getUserInfo();
      }

    render() { 
        return ( 
            <div>
                Hello {this.props.user.user_name}
            <section>
                <button>   
                <Link to="/studentdashboard">
                Student Dashboard
             </Link>
                </button>
            </section>
  <section>
                <button>
                <Link to="/teacherdashboard">
                Teacher Dashboard
             </Link>
                </button>
            </section>
            <section>
                <button>
                <Link to="/admindashboard">
                Admin Dashboard
             </Link>
                </button>
                <button> <a href={process.env.REACT_APP_LOGOUT}>
                    Logout
                  </a></button>
        
            </section>




            </div>
         )
    }
}
function mapStateToProps(state) {
    return {
      user: state.users.user
    };
  }
  
  export default connect(mapStateToProps, { getUserInfo })(TemporaryDashboard);