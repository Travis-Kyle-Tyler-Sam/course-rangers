import React, {Component} from 'react';
import HomeNavbar from './homeNavbar/HomeNavbar';
import './Home.css';

export default class Home extends Component {
    render() {
        return (
            <div>
                <HomeNavbar/>
                <div className="landing">
                    <div className="dark-overlay landing-inner">
                        <div className="container"></div>
                    </div>
                </div>

                <div className='middle-container'>
                    <div className='home-main-content'></div>
                </div>
            </div>
        )
    }
}
