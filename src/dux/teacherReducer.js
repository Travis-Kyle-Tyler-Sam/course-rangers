import axios from "axios";


const initialState = {
  user: {},
  curricula: [],
  studentList: [],
  courses: []
};

const UPDATE_USER_INFO = "UPDATE_USER_INFO";
const GET_CURRICULA = "GET CURRICULA";
const UPDATE_COURSE_STUDENTS = "UPDATE_COURSE_STUDENTS";
const UPDATE_COURSES = "UPDATE_COURSES"



export function getUserInfo() {
  const userData = axios.get("/auth/me").then(res => {
    return res.data;
  });

  return {
    type: UPDATE_USER_INFO,
    payload: userData
  };
}

export function getCurricula(){
  const curriculaData = axios.get(`/api/curriculum/`)
  .then( res => res.data)

  return {
    type: GET_CURRICULA,
    payload: curriculaData
  }
}

export function updateCourseStudents(studentArr) {
  return {
    type: UPDATE_COURSE_STUDENTS,
    payload: studentArr
  }
}

export function updateCourses(newCourses) {
  return {
    type: UPDATE_COURSES,
    payload: newCourses
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_INFO + "_FULFILLED":
      return Object.assign({}, state, { user: action.payload });

    case GET_CURRICULA + "_FULFILLED":
      return Object.assign( {}, state, { curricula: action.payload });

    case UPDATE_COURSE_STUDENTS:
      return Object.assign( {}, state, { studentList: action.payload} )

    case UPDATE_COURSES: 
      return Object.assign( {}, state, {courses: action.payload} )

    default:
      return state;
  }
}


