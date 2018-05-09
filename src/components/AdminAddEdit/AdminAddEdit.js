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

    handleChange  ( key, value ) {
        this.setState({
            [key]:value
        })
    }

    componentDidMount(){
        const { name, role, phone, email, id } = this.props;
        if (name){
            this.setState({
                name, role, phone, email, id
            })
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        const { name, role, phone, email, id } = this.props;
        if (prevProps.name!==name){
            this.setState({
                name,
                role,
                phone,
                email,
                id
            })
        }
    }
    render(){
        const { name, role, phone, email, id } = this.state;
        const { handleClickFn } = this.props;
        let displayID = () =>{
            if (id === -1){
                return <p>Not yet set</p>
            } else {
                return <p>{id}</p>
            }
        }
        
        return(
            <div>
                <div>
                    <p>Name: </p>
                    <input value={name} onChange = { e=> this.handleChange('name',e.target.value)}/>
                </div>
                <div>
                    <p>Role: </p>
                    <form></form>
                </div>
                <div>
                    <p>Phone: </p>
                    <input value={phone} onChange={ e=> this.handleChange('phone',e.target.value)}/>
                </div>
                <div>
                    <p>Email: </p>
                    <input value={email} onChange = { e=> this.handleChange('email',e.target.value)}/>
                </div>
                <div>
                    <p>{role} ID: </p> {displayID()}
                    
                </div>
                <button onClick = { () => handleClickFn(false)}>Save</button>
            </div>
        )
    }
}

export default AdminAddEdit;