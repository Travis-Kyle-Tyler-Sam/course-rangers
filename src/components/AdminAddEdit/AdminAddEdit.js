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
                <form>
                    <div>
                        <p>Name: </p>
                        <input value={name} onChange = { e=> this.handleChange('name',e.target.value)}/>
                    </div>
                <div>
                    <p>Role: </p>
                    <div>
                        <input type='radio' value='Student' name='role' id='roleChoice1' onChange = { e => this.handleChange('role',e.target.value)}/>
                        <label htmlFor='roleChoice1'>Student</label>
                        
                        <input type='radio' value='Instructor' name='role' id='roleChoice2' onChange = { e => this.handleChange('role',e.target.value)}/>
                        <label htmlFor='roleChoice2'>Instructor</label>
                    </div>
                        
                    
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
                <button type = 'submit' onClick = { () => handleClickFn(false)}>Save</button>
                </form>
            </div>
        )
    }
}

export default AdminAddEdit;