import React, {Component} from 'react';
import axios from 'axios';
import AdminList from '../AdminList/AdminList';
import './AdminDash.css';

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
    }

    componentDidMount(){
        //axios call to get student and teacher information
        
    }

    handleChange( name, email, phone, type, id){
        //this will make an axios call to update the db, but in the meantime I'm going to update state with the updated information
    }


    render(){
        const { students, instructors } = this.state;

        

        return(
            <div>
                <div className='lists'>
                    <AdminList
                        type = 'Students'
                        list = {students}
                    />
                    <AdminList
                        type = 'Instructors'
                        list = {instructors}
                    />
                </div>
            </div>
        )
    }

}

export default AdminDash