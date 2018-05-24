import React, { Component } from 'react';
import { Button, Header, Input, Form, Label, Modal, Checkbox, Radio, Icon } from 'semantic-ui-react';
import './../AdminDash/AdminDash.css';
class AdminAddEdit extends Component {
    constructor(){
        super();
        this.state = {
            name:'',
            phone:'',
            email:'',
            id:-1,
            adjust:'Add',
        }
        this.handleClick = this.handleClick.bind(this);
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
        const { name:newName, role:newRole, phone:newPhone, email:newEmail, id:newID } = this.props;
        const { name, role, phone, email, id } = prevProps;
        if (name === newName 
            && role === newRole 
            && phone === newPhone 
            && email === newEmail 
            && id === newID){
            null
        } else {
            this.setState({
                name:newName, 
                value:newRole,
                phone:newPhone, 
                email:newEmail, 
                id:newID,
            })
        }

    }
    handleClick ( bool ){
        this.setState({
            modalOpen:bool
        })
    }
    
    saveFunctions(name, email, phone, value, id, callback1, callback2, bool){
        const { handleListChangeFn } = this.props;
        callback1(name, email, phone, value, id);
        callback2(bool);
        if (this.state.adjust !== 'Edit'){
            this.setState({
                name:'',
                phone:'',
                email:'',
                id:-1,
            })
        }
        handleListChangeFn();
    }
    deleteFunctions(id){
        const { deleteUserFn, handleListChangeFn} = this.props;
        deleteUserFn(id);
        handleListChangeFn();
    }

    render(){
        const { name, phone, email, id, adjust, value } = this.state;
        const { handleClickFn, callbackFn, deleteUserFn } = this.props;
        let displayID = () =>{
            if (id === -1){
                return <p>Not yet set</p>
            } else {
                return <p>{id}</p>
            }
        }
        return(
            <div>
                <Modal trigger={<Button onClick={ () => this.handleClick(true)} 
                    id={`${phone}`}>
                    {adjust}
                    </Button>}
                    open={this.state.modalOpen}
                    size='mini'
                    style={{padding:'2rem'}}
                >
                <Modal.Header style={ {paddingTop:'1rem', fontSize:'2.3em'} }>{adjust}</Modal.Header>
                <Modal.Content style={{paddingTop:'0.5rem'}}>
                        <Form>
                            <p>Name: </p>
                            <Input value={name} id='name_input' onChange = { e=> this.handleChange('name',e.target.value)}/>
                            
                            <p>Role:    </p>
                            <div className='radio'>
                                    <Radio value='Student' name='role' id='studentChoice' onChange = { e => this.handleChange('value',e.target.value)}
                                    checked={this.state.value === 'Student'}/>
                                    <Label htmlFor='studentChoice'>Student</Label>
                                    
                                    <Radio value='Instructor' name='role' id='instructorChoice' onChange = { e => this.handleChange('value',e.target.value)}
                                    checked={this.state.value==='Instructor'}/>
                                    <Label htmlFor='instructorChoice'>Instructor</Label>
                                </div>
                            <p>Phone: </p>
                            <Input value={phone} id='input_phone' onChange={ e=> this.handleChange('phone',e.target.value)}/>
                        
                        
                            <p>Email: </p>
                            <Input value={email} id='input_email' onChange = { e=> this.handleChange('email',e.target.value)}/>
                        
                            <div className='radio'>
                                <p>{value} ID: </p> {displayID()}
                            </div>
                            
                        </Form>
                        <Modal.Actions className='radio'>
                            <Button onClick={() => this.saveFunctions(name, email, phone, value, id, callbackFn, this.handleClick, false)}
                            positive
                            animated>
                                <Button.Content visible>
                                    <Icon name='save'/>
                                </Button.Content>
                                <Button.Content hidden>
                                    Save 
                                </Button.Content>
                            </Button>
                            <Button onClick={() => this.deleteFunctions(id)}
                                negative
                                animated>
                                <Button.Content visible>
                                    <Icon name='trash'/>
                                </Button.Content>
                                <Button.Content hidden>
                                    Delete 
                                </Button.Content>
                            </Button>
                            <Button onClick={() => this.handleClick(false)}
                                animated>
                                <Button.Content visible>
                                    <Icon name='close'/>
                                </Button.Content>
                                <Button.Content hidden>
                                    Close
                                </Button.Content>
                            </Button>
                        </Modal.Actions>
                </Modal.Content>
            </Modal>
           
            </div>
        )
    }
}

export default AdminAddEdit;