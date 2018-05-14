import React, {Component} from 'react';
import Login from '../../Login';
import './HomeNavbar.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Snackbar from 'material-ui/Snackbar';
import navbarLogo from '../../../images/logo-home-1.png';
import { Button } from 'semantic-ui-react';

class HomeNavbar extends Component {
    constructor(){
        super();
        this.state = {
            user:{
                user_type:'',
                // snackOpen:false
            }
        }
    }
    
    componentDidMount(){
        axios.get('/auth/me').then( response => {
            console.log(response)
            if (response.status === 401){
                null
            }
            else {
                this.setState({
                    user:response.data
                })
            }
        })
    }
    // handleSnack( bool){
    //     this.setState({
    //         snackOpen:bool
    //     })
    // }
    
    render(){
        let { user } = this.state;
        let userType;
        if (user.user_type){
            switch(user.user_type){
                //these will conditionally render once we want specific users to go to specific dashboards. Until then, it will link to the temporary dashboards
                // case 'Student':
                //     userType = 'student'
                //     break;
                // case 'Instructor':
                //     userType = 'teacher'
                //     break;
                // case 'admin':
                //     userType = 'admin'
                //     break;
                default: userType = 'temporary'
            }
        }
    return (
        <header>
            <div className='top-navbar'>
                <div>
                    <h2>Elearning</h2>
                </div>
                <div>
                    <img src={navbarLogo} alt=""/>
                </div>
                {user.user_type
                ? <div className='Reg-log-section' >
                    <p className = 'Welcome'>Welcome, {user.user_name}.</p>
                    <Link to={`/${userType}dashboard`} className='Welcome'>Dashboard</Link>
                    <span>/</span>
                    <a href = {process.env.REACT_APP_LOGOUT} >Logout</a>
                </div>
                :<div className='Reg-log-section'>
                    <a href={process.env.REACT_APP_LOGIN}>Register </a>
                    <span>/</span>
                    <a href={process.env.REACT_APP_LOGIN}> Login</a>
                </div>
                }
                {/* <Snackbar
                open={this.state.snackOpen}
                autoHideDuration={3000}
                onClose={() => this.handleSnack(false)}
                action={[
                    <Button id='ok'onClick={() => this.handleSnack(false)}>
                    OK 
                    </Button>
                ]}
                message={<span>You have been successfully logged out.</span>}
                ></Snackbar> */}
            </div>
        </header>
    )
    }
}

export default HomeNavbar
