import React from 'react';
import { Link } from 'react-router-dom';
import './LogoutScreen.css';
import { Segment } from 'semantic-ui-react'

function LogoutScreen (props){
    setTimeout( () => {
        props.history.push('/')
    },2000)

    return(
        <div className='logout'>
            <Segment className='box'>
                <p>You have been successfully logged out</p>
                <Link to='/'>If you are not automatically redirected, press here to return to the home screen</Link>
            </Segment>
        </div>
    )
}

export default LogoutScreen;