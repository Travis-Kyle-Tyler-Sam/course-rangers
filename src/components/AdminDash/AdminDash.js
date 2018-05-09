import React, {Component} from 'react';
import axios from 'axios';
import AdminList from '../AdminList/AdminList';

class AdminDash extends Component {
    constructor(){
        super();
        this.state = {
            students:[
                {
                    name: 'Jose Gonzalez',
                    email: 'jose@jose.jose',
                    phone:'801-801-8018',
                    userType:'student',
                    id:98234598
                },
                
                {
                    name:'Hermione Granger',
                    email:'ilovebooks55@gmail.com',
                    phone:'801-801-8017',
                    userType:'student',
                    id:1934875
                },
                {
                    name:'Goku',
                    email:'supersaiyinlol@capsulecorp.com',
                    phone:'801-801-8016',
                    userType:'student',
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


    render(){
        const { students, instructors } = this.state;

        

        return(
            <div>
                <AdminList
                    type = 'students'
                    list = {students}
                />
                <AdminList
                    type = 'instructors'
                    list = {instructors}
                />
            </div>
        )
    }

}

export default AdminDash