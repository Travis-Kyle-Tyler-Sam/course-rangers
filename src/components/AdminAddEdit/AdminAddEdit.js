import React, { Component } from 'react';

class AdminAddEdit extends Component {
    constructor(){
        super();
        this.state = {
            name:'',
            role:'',
            phone:'',
            email:'',
            id:-1
        }
    }

    handleChange = ( key, value ) => {
        this.setState({
            [key]:value
        })
    }
    render(){
        const { name, role, phone, email, id } = this.state;

        return(
            <div>
                <div>
                    <p>Name: </p>
                    <input value={name} onChange = {this.handleChange('name',e.target.value)}/>
                </div>
                <div>
                    <p>Role: </p>
                    <form></form>
                </div>
                <div>
                    <p>Phone: </p>
                    <input value={phone} onChange={this.handleChange('phone',e.target.value)}/>
                </div>
                <div>
                    <p>Email: </p>
                    <input value={email} onChange = {this.handleChange('email',e.target.value)}/>
                </div>
                <div>
                    <p>Student ID: </p>
                    <input value={id}/>
                </div>
                <button>Save</button>
            </div>
        )
    }
}