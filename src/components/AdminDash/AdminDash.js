import React, {Component} from 'react';
import axios from 'axios';
import AdminList from '../AdminList/AdminList';
import './AdminDash.css';
import {handleUsersChange} from '../../utils/adminfns/adminfns';

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
        //axios call to get student and teacher information
        
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

export default AdminDash