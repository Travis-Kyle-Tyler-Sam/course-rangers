import axios from "axios";


const initialState = {
  user: {},
  curricula: [],
  studentList: []
};

const UPDATE_USER_INFO = "UPDATE_USER_INFO";
const GET_CURRICULA = "GET CURRICULA"
const UPDATE_COURSE_STUDENTS = "UPDATE_COURSE_STUDENTS"



export function getUserInfo() {
  const userData = axios.get("/auth/me").then(res => {
    return res.data;
  });

  return {
    type: UPDATE_USER_INFO,
    payload: userData
  };
}

export function getCurricula(id){
  const curriculaData = axios.get(`/api/curriculum/${1}`)
  .then( res => res.data)

  return {
    type: GET_CURRICULA,
    payload: curriculaData
  }
}

export function updateCourseStudents (studentArr) {
  return {
    type: UPDATE_COURSE_STUDENTS,
    payload: studentArr
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

    default:
      return state;
  }
}


