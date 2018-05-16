import { combineReducers } from "redux";
import userReducer from './userReducer';
import teacherReducer from './teacherReducer'


export default combineReducers({
 users: userReducer,
 teachers: teacherReducer
});
