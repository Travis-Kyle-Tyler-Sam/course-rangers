import React, { Component } from "react";
import moment from "moment";
import axios from 'axios'
import "./CourseBuilderTool.css";
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { connect } from 'react-redux'

import { Button, Table, Message, Icon } from 'semantic-ui-react'


moment.locale("en");

class CourseBuilderTool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDaysArray: [],
      popDays: [],
      errors: []
    };
  }



  handleDaySelected(day) {

    let selDays = [...this.state.selectedDaysArray]
    let ind = selDays.indexOf(day)

    if( ind === -1 ) {
      selDays.push(day)
    } else {
      selDays.splice(ind, 1)
      if(selDays.length === 0 ){
        return this.setState({
          selectedDaysArray: selDays,
          popDays: []
        })
        
      }
    }

    let selectedCurriculum = this.props.curricula.filter( curr => curr.id === +this.props.template)
    let selectedCurriculumDays = selectedCurriculum[0].days

    selectedCurriculumDays.sort( (a, b) => {
      if(a.day_in_curriculum < b.day_in_curriculum) return -1;
      if(a.day_in_curriculum > b.day_in_curriculum) return 1;
      return 0
    })

    let assignedDate = moment(this.props.startDate).subtract(1, 'd').format('YYYY-MM-DD')


    let selectedDays = selectedCurriculumDays.map( day => {
      assignedDate = moment(assignedDate).add(1, 'd').format('YYYY-MM-DD')
      
      let dayOfWeek = +moment(assignedDate).format('d')
      while( !selDays.includes( dayOfWeek )){
        assignedDate = moment(assignedDate).add(1, 'd').format('YYYY-MM-DD')
        dayOfWeek = +moment(assignedDate).format('d')
      }

      return {
        id: day.id,
        topic: day.topic,
        date: assignedDate,
        dayNum: day.day_in_curriculum
      }

    })

    let popDate = moment(selectedDays[0].date).startOf('week')
    let popEnd = moment(selectedDays[ selectedDays.length-1 ].date)
    let popDateArray = []
    let dayToPush

    while(popDate <= popEnd){
      let matchDay = selectedDays.filter( selectedDay => {
        let aDt = moment(selectedDay.date) - popDate
        let isMatch = aDt === 0
        return isMatch
      })

      if( matchDay.length > 0) {
        dayToPush = matchDay[0]
        dayToPush.type = 'attend'
      } else {
        dayToPush = {
          date: popDate.format('YYYY-MM-DD'),
          type: 'off'
        }
      }
      popDateArray.push( dayToPush )
      popDate.add(1, 'd')
    }

    this.setState({
      selectedDaysArray: selDays,
      popDays: popDateArray
    })
  }

  switchMonth = (n) => {
    if( n ===  -1){
      let newDate = moment(this.state.date).subtract(1, "M").toDate()
      this.setState({ date: newDate })
    } else {
      let newDate = moment(this.state.date).add(1, "M").toDate()
      this.setState({ date: newDate })
    }
  }

  submitCourse = () => {
    let errors = [];

    // Empty course name
    // No selected template
    // No start date
    // Student list is empty
    // No attending days selected
    if( this.props.courseName === '' ) {
      errors.push('The course name cannot be empty')
    }

    if( this.props.template === '' ) {
      errors.push('Please select a course template')
    }

    if( this.props.startDate === '' ) {
      errors.push('The course must have a start date')
    }

    if( this.props.enrolledStudents.length === 0 ) {
      errors.push('Please add students to this course')
    }

    if( this.state.selectedDaysArray.length === 0 ) {
      errors.push('Please select the days that this course will be held')
    }

    if( errors.length > 0 ) {
      this.setState( { errors } )
    } else {
      let selectedCurriculum = this.props.curricula.filter( curriculum => curriculum.id === this.props.template)
      selectedCurriculum = selectedCurriculum[0]
      let filteredPopDays = this.state.popDays.filter( popDay => popDay.type === 'attend')

      selectedCurriculum.days.forEach( (curDay, i, curArr) => {
        curArr[i].date = filteredPopDays[i].date
      })

      selectedCurriculum.name = this.props.courseName;
      selectedCurriculum.startDate = this.props.startDate;
      selectedCurriculum.enrolledStudents = this.props.enrolledStudents

      axios.post('/api/course', selectedCurriculum)
      .then( response => console.log(response.data))
    }

  }





  render() {

    let day0style = this.state.selectedDaysArray.includes(0) ? true : false;
    let day1style = this.state.selectedDaysArray.includes(1) ? true : false;
    let day2style = this.state.selectedDaysArray.includes(2) ? true : false;
    let day3style = this.state.selectedDaysArray.includes(3) ? true : false;
    let day4style = this.state.selectedDaysArray.includes(4) ? true : false;
    let day5style = this.state.selectedDaysArray.includes(5) ? true : false;
    let day6style = this.state.selectedDaysArray.includes(6) ? true : false;

    let popDaysDisplay = this.state.popDays.map( (popDay, i) => {
      if( popDay.type === 'attend') {
        return (
          <div className='cb-popday-attend cb-popday-cal' key={ i + popDay.title} >
            <div className='cb-popday-label'>
              <strong> { moment(popDay.date).format('MM/DD') }</strong> <br />
            </div>
            <p>Day { popDay.dayNum + ': ' + popDay.topic}</p>
          </div>
        )
      } else {
        return (
          <div className='cb-popday-off cb-popday-cal' key={ i + popDay.title} >
            <strong> { moment(popDay.date).format('MM/DD') }</strong> <br />
          </div>
        )
      }

    })



    return (
      <div>

      
      <div className="cbt-days-display-container">
        <Button
          className='cb-tool-btn'
          primary={ day0style }
          onClick={() => {
            this.handleDaySelected(0);
          }}
        >
          Select Sunday
        </Button>

        <Button
          className='cb-tool-btn'
          primary={ day1style }
          onClick={() => {
            this.handleDaySelected(1);
          }}
        >
          Select Monday
        </Button>

        <Button
          className='cb-tool-btn'
          primary={ day2style }
          onClick={() => {
            this.handleDaySelected(2);
          }}
        >
          Select Tuesday
        </Button>

        <Button
          className='cb-tool-btn'
          primary={ day3style }
          onClick={() => {
            this.handleDaySelected(3);
          }}
        >
          Select Wednesday
        </Button>

        <Button
          className='cb-tool-btn'
          primary={ day4style }
          onClick={() => {
            this.handleDaySelected(4);
          }}
        >
          Select Thursday
        </Button>

        <Button
          className='cb-tool-btn'
          primary={ day5style }
          onClick={() => {
            this.handleDaySelected(5);
          }}
        >
          Select Friday
        </Button>

        <Button
          className='cb-tool-btn'
          primary={ day6style }
          onClick={() => {
            this.handleDaySelected(6);
          }}
        >
          Select Saturday
        </Button>
      { popDaysDisplay}
      </div>
      <Message
        error
        header='Error(s)!'
        list={ this.state.errors }
        hidden={ this.state.errors.length === 0}
      />
        <Button 
          primary 
          onClick={ this.submitCourse }>
        Submit Course
        </Button>
        <Button>Cancel</Button>      
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
      curricula: state.teachers.curricula,
      enrolledStudents: state.teachers.studentList
  }
}

export default connect( mapStateToProps )(CourseBuilderTool);
