import React, {Component} from 'react';
import HomeNavbar from './homeNavbar/HomeNavbar';
import './Home.css';

import featureOne from '../../images/features-01.png';
import featureSecond from '../../images/features-02.png';
import featureThree from '../../images/features-03.png';
import featureFour from '../../images/features-04.png';

class Home extends Component {
    render() {
        return (
            <div>
                <HomeNavbar/>
                <div className="landing">
                    <div className="dark-overlay landing-inner">
                        <div className="container"></div>
                    </div>
                    <div className='middle-container'>
                        <div className='home-main-content'>
                            <h1>The Best Software for eLearning</h1>
                            <p>We pride ourselves on providing the most up-to-date content for our students
                                to learn each course.</p>
                            <div className='main-feature-section'>
                                <div className="features-item">
                                    <div className="fi-logo">
                                        <img src={featureOne} alt=""/>
                                        <h3>EXCELLENT FALCUTY</h3>
                                        <div className="fi-desc">
                                            <p>Sed ut perspiciatis omnis</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="features-item">
                                    <div className="fi-logo">
                                        <img src={featureSecond} alt=""/>
                                        <h3>INDUSTRY LEADER</h3>
                                        <div className="fi-desc">
                                            <p>Sed ut perspiciatis omnis</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="features-item">
                                    <div className="fi-logo">
                                        <img src={featureThree} alt=""/>
                                        <h3>THOUSAND STUDENTS</h3>
                                        <div className="fi-desc">
                                            <p>Sed ut perspiciatis omnis</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="features-item">
                                    <div className="fi-logo">
                                        <img src={featureFour} alt=""/>
                                        <h3>ADVANCED QUIZZING</h3>
                                        <div className="fi-desc">
                                            <p>Sed ut perspiciatis omnis</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="diagonal"></section>
            </div>
        );
    }
}

export default Home;