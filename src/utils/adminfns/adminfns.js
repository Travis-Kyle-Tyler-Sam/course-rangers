
module.exports = {
    newUsers ( name, email, phone, type, id, state ){
        this.state = state;
        let tempUserState = [];
        let group = ''
        if (type === 'Student'){
            tempUserState = this.state.students.map( student => ({...student})); 
            group = 'students'
        }
        else {
            let tempUserState = this.state.instructors.map( instructor => ({...instructor}));
            group = 'instructors'
        }
        return tempUserState;
    },
    addUser( name, email, phone, userType, id, state){
        //this will make an axios call to update the db, but in the meantime I'm going to update state with the updated information
        let tempUserState = [];
        let group = ''
        if (userType === 'Student'){
            tempUserState = this.state.students.map( student => ({...student})); 
            group = 'students'
        }
        else {
            let tempUserState = this.state.instructors.map( instructor => ({...instructor}));
            group = 'instructors'
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
            let tempUserState = this.state.instructors.map( instructor => ({...instructor}));
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
            let tempUserState = this.state.instructors.map( instructor => ({...instructor}));
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
        let newState = Object.assign({}, {[otherGroup]:this.state[otherGroup]}, {[group]:newUserState})
        this.setState(newState)
    },

}