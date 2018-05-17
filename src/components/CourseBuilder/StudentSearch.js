import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateCourseStudents } from '../../dux/teacherReducer'
import { Search, Grid, Header, List, Form, Input, Button, Dropdown, Icon } from 'semantic-ui-react'



class StudentSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            studentList: [],
            searchString: ''


         }
    }

componentWillReceiveProps(nextProps) {
    if (this.state.studentList.length === 0 && nextProps.students.length > 0) {
     this.setState({ studentList: nextProps.students});
      
    }
  }
selectStudent(){
    let selectedList = [...this.props.selectedStudentList]
    let studentList = [...this.state.studentList]
    const studentName = studentList.filter(student => student.id == this.state.searchString);
    selectedList.push(studentName[0])
   
    

    studentList.forEach( (student, i) => {
        if( student.id === studentName[0].id){
            studentList.splice(i, 1)
        }
    })
    
    this.props.updateCourseStudents(selectedList)

    this.setState({
        searchString: '',
        studentList: studentList    
    })
}
removeStudent(studentId){
    let newArray = [...this.props.selectedStudentList]
    let studentList = [...this.state.studentList]

    newArray.forEach( (student, i) => {
        if( student.id === studentId) {
            newArray.splice(i, 1)
            studentList.push(student)
        }
    })

    this.props.updateCourseStudents(newArray)

    this.setState({
        studentList: studentList
    })
}

  render() {
    
    let studentsInTheClass = this.props.selectedStudentList.map( (student, i) =>{
        return <li key={student.id + student.user_name + i}>{`${student.user_name}  `}
        <Icon name='remove' onClick={()=>{
           this.removeStudent(student.id)
        }}/>
    </li>
    })
    const suggestions = this.state.studentList.map(student=>{
        return {
            text: student.user_name,
            value: student.id
        }
    })
  

    return (
        <div>
     
        <Dropdown
       search selection options={suggestions}
       value={this.state.searchString}
       onChange={(e, data) => {  
        this.setState({searchString: data.value})}
    }/>
        <Button onClick={ () => {
            this.selectStudent()
        }}>Add Student to Class</Button>
        
    
    <ol>{studentsInTheClass}</ol>
    </div>
    )
  }
}

function mapStateToProps(state) {
    return {
        selectedStudentList: state.teachers.studentList
    }
}

export default connect(mapStateToProps, { updateCourseStudents })(StudentSearch)
