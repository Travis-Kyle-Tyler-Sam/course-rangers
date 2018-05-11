import React, {Component} from 'react';
import axios from 'axios';
import AdminList from '../AdminList/AdminList';
import './AdminDash.css';
import {handleUsersChange} from '../../utils/adminfns/adminfns';
import { connect } from 'react-redux';

class AdminDash extends Component {
    constructor(){
        super();
        this.state = {
            students:[
                {
                    name: 'Jose Gonzalez',
                    email: 'jose@jose.jose',
                    phone:'801-801-8018',
                    userType:'Student',
                    id:98234598
                },
                
                {
                    name:'Hermione Granger',
                    email:'ilovebooks55@gmail.com',
                    phone:'801-801-8017',
                    userType:'Student',
                    id:1934875
                },
                {
                    name:'Goku',
                    email:'supersaiyinlol@capsulecorp.com',
                    phone:'801-801-8016',
                    userType:'Student',
                    id:981357
                }
            ],
            instructors:[
                {
                    name:'The Grandmaster',
                    email:'fearTheMeltyStick@grandmaster.io',
                    phone:'801-801-8015',
                    userType:'Instructor',
                    id:89734509
                },
                {
                    name:'Albus Dumbledore',
                    email:'justsendanowl@owlmail.owl',
                    phone:'801-801-8014',
                    userType:'Instructor',
                    id:2359879134
                }
            ]
        }
        this.handleUsersChange = handleUsersChange.bind(this);
    }

    componentDidMount(){
        axios.get('/auth/me').then( response => {
            axios.get(`/api/registry/${response.data.id}`).then( response => {
                let students = response.data.students.map( student => {
                    return Object.assign({},{
                        name:student.user_name,
                        email:student.email,
                        phone:student.phone,
                        userType:student.user_type,
                        id:student.id
                    })
                })
                let instructors = response.data.instructors.map( instructor => {
                    return Object.assign({}, {
                        name:instructor.user_name,
                        email:instructor.email,
                        phone:instructor.phone,
                        userType:instructor.user_type,
                        id:instructor.id
                    })

                })
                this.setState({students, instructors})
            })
        })
        
    }
    

    render(){
        const { students, instructors } = this.state;

        

        return(
            <div>
                <div className='lists'>
                    <AdminList
                        type = 'Students'
                        list = {students}
                        handleUsersChangeFn = {this.handleUsersChange}
                    />
                    <AdminList
                        type = 'Instructors'
                        list = {instructors}
                        handleUsersChangeFn = {this.handleUsersChange}
                    />
                </div>
            </div>
        )
    }
}

function mapStateToProps ( state ){
    return {
        user:state.user
    }
}

export default connect(mapStateToProps,null)(AdminDash)