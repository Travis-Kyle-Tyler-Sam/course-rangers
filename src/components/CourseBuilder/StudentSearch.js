import _ from 'lodash'
import React, { Component } from 'react'
import { Search, Grid, Header, List, Form, Input, Button, Dropdown, Icon } from 'semantic-ui-react'



export default class StudentSearch extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            studentList: [],
            selectedStudents: [],
              searchString: ''
         }
    }




componentWillReceiveProps(nextProps) {
    if (nextProps.students !== this.state.studentList) {
     this.setState({ studentList: nextProps.students});
      
    }
  }
selectStudent(){
    let selectedList=this.state.selectedStudents
    const studentName = this.state.studentList.filter(student => student.id == this.state.searchString);
    console.log('student name', studentName)
    selectedList.push(studentName[0])
   

    this.setState({
        selectedStudents:selectedList,
        searchString: '',    
    })
}
removeStudent(student){
    let newArray = this.state.selectedStudents
    newArray.splice(student, 1)
    this.setState({selectedStudents: newArray})
}

  render() {
    
      console.log('Search String', this.state.searchString)
      console.log('Search List', this.state.selectedStudents)
    let studentsInTheClass = this.state.selectedStudents.map(student =>{
        return <li key={student.id + student.user_name}>{`${student.user_name}  `}
        <Icon name='remove' onClick={()=>{
           this.removeStudent(student)
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
