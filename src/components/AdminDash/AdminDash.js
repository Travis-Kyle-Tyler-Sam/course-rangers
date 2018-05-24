import React, {Component} from 'react';
import axios from 'axios';
import AdminList from '../AdminList/AdminList';
import './AdminDash.css';
import { handleUsersChange, removeUser } from '../../utils/adminfns/adminfns';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import { Button, Tab } from 'semantic-ui-react';
import {getUserInfo} from '../../dux/userReducer';
import _ from 'lodash';

class AdminDash extends Component {
    constructor(){
        super();
        this.state = {
            students:[
                // {
                //     name: 'Jose Gonzalez',
                //     email: 'jose@jose.jose',
                //     phone:'801-801-8018',
                //     userType:'Student',
                //     id:98234598
                // },
                
                // {
                //     name:'Hermione Granger',
                //     email:'ilovebooks55@gmail.com',
                //     phone:'801-801-8017',
                //     userType:'Student',
                //     id:1934875
                // },
                // {
                //     name:'Goku',
                //     email:'supersaiyinlol@capsulecorp.com',
                //     phone:'801-801-8016',
                //     userType:'Student',
                //     id:981357
                // }
            ],
            instructors:[
                // {
                //     name:'The Grandmaster',
                //     email:'fearTheMeltyStick@grandmaster.io',
                //     phone:'801-801-8015',
                //     userType:'Instructor',
                //     id:89734509
                // },
                // {
                //     name:'Albus Dumbledore',
                //     email:'justsendanowl@owlmail.owl',
                //     phone:'801-801-8014',
                //     userType:'Instructor',
                //     id:2359879134
                // }
            ],
            adminID:2,
            snackOpen:false,
            action:'',
            actionName:'',
            displayStudents:true
        }
        this.handleUsersChange = handleUsersChange.bind(this);
        this.removeUser = removeUser.bind(this);
        this.addUser = this.addUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.handleSnack = this.handleSnack.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    componentDidMount(){
        
        axios.get('/auth/me').then( response => {
            if (response.status === 401){
                this.setState({adminID:3})
            } else {
                this.setState({adminID:response.data.id});
            }
            axios.get(`/api/registry/${this.state.adminID}`).then( response => {
                this.setState({
                    students:_.sortBy(response.data.students, user => {
                        return user.name.toLowerCase();
                    }) , 
                    instructors:_.sortBy(response.data.instructors, user => {
                        return user.name.toLowerCase();
                    })
                });
            });
        });
        // axios.get(`/api/registry/${this.state.adminID}`).then( response => {
        //     this.setState({
        //         students:response.data.students, 
        //         instructors:response.data.instructors
        //     });
        // });
    };
    handleSnack( bool, name, action){
        this.setState({
            snackOpen:bool,
            actionName:name,
            action:action
        })
    }
    addUser( name, email, phone, userType, id ){
        const { adminID } = this.state;
        axios.post('/api/registry/addUser', {name, email, phone, userType, id, adminID}).then( response => {
            let { name:newName, email:newEmail, phone:newPhone, userType:newUserType, id:newID } = response.data;
            this.handleUsersChange(newName, newEmail, newPhone, newUserType, newID)
            this.handleSnack(true,newName, 'added')
        })
    }
    editUser( name, email, phone, userType, id ){
        const { adminID } = this.state;
        axios.put('/api/registry/editUser', {name, email, phone, userType, id, adminID}).then( response => {
            let { name:newName, email:newEmail, phone:newPhone, userType:newUserType, id:newID } = response.data;
            this.handleUsersChange(newName, newEmail, newPhone, newUserType, newID)
            this.handleSnack(true, newName, 'edited')
        })
    }
    deleteUser(id){
        axios.delete(`/api/registry/deleteUser/${id}`).then( result => {
            let {id} = result.data
            this.removeUser(result.data.id)
            this.handleSnack(true, result.data.user_name, 'deleted')
        })
    }
    render(){
        const { students, instructors, action, actionName, displayStudents } = this.state;
        const panes = [
            {
                menuItem:'Students', render: () => <Tab.Pane>
                    <AdminList
                        type = 'Students'
                        list = {students}
                        handleUsersChangeFn = {this.handleUsersChange}
                        addUserFn = {this.addUser}
                        editUserFn = {this.editUser}
                        deleteUserFn = {this.deleteUser}
                        adminID = {this.state.adminID}
                    />
                </Tab.Pane>
            },
            {
                menuItem:'Instructors', render: () => <Tab.Pane>
                    <AdminList
                        type = 'Instructors'
                        list = {instructors}
                        handleUsersChangeFn = {this.handleUsersChange}
                        addUserFn = {this.addUser}
                        editUserFn = {this.editUser}
                        deleteUserFn = {this.deleteUser}
                    />
                </Tab.Pane>
            }
        ]
        

        return(
            <div className='admin-dash'>
                <div className='lists'>
                    <Tab className ='user-table' panes={panes}/>
                    
                
                </div>
                <Snackbar 
                    open = {this.state.snackOpen}
                    autoHideDuration = {3000}
                    onClose ={() => this.handleSnack(false)}
                    action={[
                        <Button id='ok'onClick={() => this.handleSnack(false)}>
                        OK 
                        </Button>
                    ]}
                    message={<span>{`${actionName} ${action}`}</span>}
                    anchorOrigin={{vertical:'top', horizontal:'center'}}
                />
            </div>
        )
    }
}

function mapStateToProps ( state ){
    return {
        user:state.user
    }
}

export default connect(mapStateToProps,{ getUserInfo })(AdminDash)