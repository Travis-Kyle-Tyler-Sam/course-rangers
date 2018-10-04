module.exports = {
    newUsers ( type, state ){
        this.state = state;
        let tempUserState = [];
        if (type === 'Student'){
            tempUserState = this.state.students.map( student => ({...student})); 
        }
        else {
            tempUserState = this.state.instructors.map( instructor => ({...instructor}));
        }
        return tempUserState;
    },
    addUser( name, email, phone, userType, id){
        //this will make an axios call to update the db, but in the meantime I'm going to update state with the updated information
        let tempUserState = [];
        if (userType === 'Student'){
            tempUserState = this.state.students.map( student => ({...student})); 
        }
        else {
            tempUserState = this.state.instructors.map( instructor => ({...instructor}));
        }
        let flag = false;
        let newUserState = tempUserState
        .map( user => { 
            if (user.id === id){
                flag = true;
                return ({name,email,phone,userType,id})
            }
            else {
                return user
            }
        });
        if (!flag){
            newUserState.push({name,email,phone,userType,id})
        }
        return newUserState
    },
    mergeState( name, email, phone, userType, id, state){
        //this will make an axios call to update the db, but in the meantime I'm going to update state with the updated information
        let tempUserState = [];
        let group = ''
        let otherGroup = ''
        if (userType === 'Student'){
            tempUserState = this.state.students.map( student => ({...student})); 
            group = 'students';
            otherGroup = 'instructors';
        }
        else {
            group = 'instructors';
            otherGroup = 'students';
        }
        let flag = false;
        let newUserState = tempUserState.map( user => 
            {if (user.id === id){
                flag = true;
                return ({name,email,phone,userType,id})
            }
            else return user
            }
        )
        if (!flag){
            newUserState.push({name,email,phone,userType,id})
        }
        let newState = Object.assign({}, {[otherGroup]:state[otherGroup]}, {[group]:newUserState})
        return newState;
    },
    handleUsersChange( name, email, phone, userType, id){
        //this will make an axios call to update the db, but in the meantime I'm going to update state with the updated information
        
        let tempUserState = [];
        let group = ''
        let otherGroup = ''
        if (userType === 'Student'){
            tempUserState = this.state.students.map( student => ({...student})); 
            group = 'students';
            otherGroup = 'instructors';
        }
        else {
            tempUserState = this.state.instructors.map( instructor => ({...instructor}));
            group = 'instructors';
            otherGroup = 'students';
        }
        let flag = false;
        let newUserState = tempUserState.map( (user, i) => 
            {if (user.id === id){
                flag = true;
                return ({name,email,phone,userType,id});
            }
            else return user;
            }
        )
        let otherUserState = this.state[otherGroup].map( user => ({...user}));
        let index = this.state[otherGroup].findIndex( user => user.id === id);
        if (!flag && index !== -1){
            otherUserState.splice(index,1)
        }
        let newState = Object.assign({}, {[otherGroup]:otherUserState}, {[group]:newUserState})
        this.setState(newState);
    },
    removeUser(id){
        let newStudents = this.state.students.filter( user => {
            return user.id !== id;
        });
        let newInstructors = this.state.instructors.filter( user => {
            return user.id !== id;
        });
        this.setState({
            students:newStudents,
            instructors:newInstructors
        })
    }
    
}