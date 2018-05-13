const fns = require('../../utils/adminfns/adminfns');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
let mock = new MockAdapter('axios');
mock.onGet('/')

describe('resetting state with new user info', () => {
    let state
    beforeEach(() => {
        state = {
            students:[
                {
                    name:'kyle',
                    email:'kyle@kyle.kyle',
                    phone:'888-888-8888',
                    userType:'Student',
                    id:1983
                }
            ],
            instructors:[
                {
                    name:'stu',
                    email:'stu@stu.stu',
                    phone:'891-328-8383',
                    userType:'Instructor',
                    id:1855
                }
            ]
        }
    })
    test(' new state is not equal to the old state', () => {
        //arrange/act
        let newState = fns.newUsers('bob','hello@','888-333-5555','Student',1983, state)
        //assert
        expect(newState).not.toBe(state)
    })
    test('id  on new object should be the same as the old object', () => {
        //arrange/act
        let id = 1983;
        
        let oldObject = state.students.filter( student => {
            return student.id === id;
        })
        let newState = fns.newUsers('bob','hello@','888-333-5555','Student',1983, state)
        let newObject = newState.filter( student => {
            return student.id === id;
        })
        expect(newObject[0].id).toEqual(id)
    })
    test('new object should be different from old object', () => {
        //arrange/act
        let id = 1983;
        
        let oldObject = state.students.filter( student => {
            return student.id === id;
        })
        let newState = fns.addUser('bob','hello@','888-333-5555','Student',1983, state)
        let newObject = newState.filter( student => {
            return student.id === id;
        })
        expect(newObject[0]).not.toEqual(oldObject[0])
    })
    test('new object have particular values', () => {
        //arrange/act
        let id = 1983;
        let objectToAdd = {
            name:'bob',
            email:'hello@',
            phone:'888-333-5555',
            userType:'Student',
            id:1983
        }
        let newState = fns.addUser('bob','hello@','888-333-5555','Student',1983, state)
        let newObject = newState.filter( student => {
            return student.id === id;
        })
        expect(newObject[0]).toEqual(objectToAdd)
    })
    test('old state should be merged with the users array', () => {
        //arrange/act
        let id = 1983;
        let newUserArray = fns.addUser('bob','hello@','888-333-5555','Student',1983, state)
        let newState = fns.mergeState('bob','hello@','888-333-5555','Student',1983, state)
        
       expect(newState.students).toEqual(newUserArray)
    })
    test('the other array should remain untouched', () => {
        //arrange/act
        let newState = fns.mergeState('bob','hello@','888-333-5555','Student',1983, state)
        
       expect(newState.instructors).toEqual(state.instructors)
    })
    test('the instructors array should repopulate with all the old instructors', () => {
        //arrange/act
        let newState = fns.mergeState('bob','hello@','888-333-5555','Student',1983, state)
        
       expect(newState.instructors).toEqual(state.instructors)
    })
    test('the other array should remain untouched', () => {
        //arrange/act
        let newState = fns.mergeState('bob','hello@','888-333-5555','Student',1983, state)
        
       expect(newState.instructors).toEqual(state.instructors)
    })
    test('function can add a new user to array', () => {
        let objectToAdd = {
            name:'bob',
            email:'hello@',
            phone:'888-333-5555',
            userType:'Student',
            id:5555
        }
        let newState = fns.addUser('bob','hello@','888-333-5555','Student',5555, state);
        expect(newState[newState.length-1]).toEqual(objectToAdd)
    })
    test('new state should include new object', () => {
        let objectToAdd = {
            name:'bob',
            email:'hello@',
            phone:'888-333-5555',
            userType:'Student',
            id:5555
        }
        let newState = fns.mergeState('bob','hello@','888-333-5555','Student',5555, state)
        expect(newState.students).toContainEqual(objectToAdd)
    })
    
})

describe('admin can add users to db, as well as edit users in db', () => {
    test('admin can add user to db', () => {
        
    })
})