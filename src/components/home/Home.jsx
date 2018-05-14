import React, {Component} from 'react';
import HomeNavbar from './homeNavbar/HomeNavbar';
import './Home.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUserInfo } from '../../dux/userReducer';

import featureOne from '../../images/features-01.png';
import featureSecond from '../../images/features-02.png';
import featureThree from '../../images/features-03.png';
import featureFour from '../../images/features-04.png';
import IconLogo from '../../images/icon-heading.png';
import IconOne from '../../images/icon-1.jpg';
import IconTwo from '../../images/icon-2.jpg';
import IconThree from '../../images/icon-3.jpg';

class Home extends Component {


    componentDidMount(){
        axios.get('/auth/me').then( response => {
            if (response.status === 401){
                null
            } else {
                this.props.getUserInfo()
            }
        })
    }

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
                            <button href="" className="btn-primary">View All Courses</button>
                        </div>
                    </div>
                </div>
                <section className="diagonal">
                    <div>
                        <div className='border border-top'></div>
                        <img src={IconLogo} alt=""/>
                        <div className='border border-bottom'></div>
                    </div>
                    <div className='top-section-title'>
                        <h3>The place to learn and <br/> prepare for your future</h3>
                        <div className='boxes-wrapper'>
                            <div className='boxes-container'>
                                <div>
                                    <div className='box-container'>
                                        <div className='icon-box'>
                                            <img src={IconOne} alt=""/>
                                        </div>
                                        <div className='box-content'>
                                            <h3 className='title-box'>USER EXPERIENCE IN MODERN WORLD</h3>
                                            <div className='description'>
                                                <p>A dashboard dedicated for each course focuses on learning experience</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='boxes-container'>
                                <div>
                                    <div className='box-container'>
                                        <div className='icon-box'>
                                            <img src={IconTwo} alt=""/>
                                        </div>
                                        <div className='box-content'>
                                            <h3 className='title-box'>USER EXPERIENCE IN MODERN WORLD</h3>
                                            <div className='description'>
                                                <p>A dashboard dedicated for each course focuses on learning experience</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='boxes-container'>
                                <div>
                                    <div className='box-container'>
                                        <div className='icon-box'>
                                            <img src={IconThree} alt=""/>
                                        </div>
                                        <div className='box-content'>
                                            <h3 className='title-box'>USER EXPERIENCE IN MODERN WORLD</h3>
                                            <div className='description'>
                                                <p>A dashboard dedicated for each course focuses on learning experience</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}


// function mapStateToProps( state ){
//     return {
//         user: state.user
//     }
// }

export default connect(null,{getUserInfo})(Home);