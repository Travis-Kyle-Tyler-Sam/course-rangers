import React, { Component } from 'react';
import { Button, Header, Input, Form, Label, Modal, Checkbox, Radio } from 'semantic-ui-react';

class AdminAddEdit extends Component {
    constructor(){
        super();
        this.state = {
            name:'',
            role:'',
            phone:'',
            email:'',
            id:-1,
            adjust:'',
        }
    }

    handleChange  ( key, value ) {
        this.setState({
            [key]:value
        })
    }

    componentDidMount(){
        const { name, role, phone, email, id, adjust } = this.props;
        if (name){
            this.setState({
                name, 
                value:role,
                phone, 
                email, 
                id,
                adjust
            })
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        const { name, role, phone, email, id, adjust } = this.props;
        if (prevProps.id!==id){
            this.setState({
                name,
                value:role,
                phone,
                email,
                id,
                adjust
            })
        }
    }
    saveFunctions(name, email, phone, value, id, callback1, callback2, bool){
        callback1(name, email, phone, value, id);
        callback2(bool);
    }
    render(){
        const { name, role, phone, email, id, adjust, value } = this.state;
        const { handleClickFn, handleUsersChangeFn } = this.props;
        let displayID = () =>{
            if (id === -1){
                return <p>Not yet set</p>
            } else {
                return <p>{id}</p>
            }
        }
        
        return(
            <div>
                <Modal.Content>
                    <Modal.Description>
                        <Form>
                            
                                <p>Name: </p>
                                <Input value={name} onChange = { e=> this.handleChange('name',e.target.value)}/>
                            
                            
                                <p>Role: </p>
                                
                                    <Radio value='Student' name='role' id='roleChoice1' onChange = { e => this.handleChange('value',e.target.value)}
                                    checked={this.state.value === 'Student'}/>
                                    <Label htmlFor='roleChoice1'>Student</Label>
                                    
                                    <Radio value='Instructor' name='role' id='roleChoice2' onChange = { e => this.handleChange('value',e.target.value)}
                                    checked={this.state.value==='Instructor'}/>
                                    <Label htmlFor='roleChoice2'>Instructor</Label>

                                <p>Phone: </p>
                                <Input value={phone} onChange={ e=> this.handleChange('phone',e.target.value)}/>
                            
                            
                                <p>Email: </p>
                                <Input value={email} onChange = { e=> this.handleChange('email',e.target.value)}/>
                            
                            
                                <p>{value} ID: </p> {displayID()}
                            <Button onClick={() => this.saveFunctions(name, email, phone, value, id, handleUsersChangeFn, handleClickFn, false) 
                            }>Save</Button>
                            <Button onClick={() => handleClickFn(false)}>Close</Button>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
            </div>
        )
    }
}

export default AdminAddEdit;