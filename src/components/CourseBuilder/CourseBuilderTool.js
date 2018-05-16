import React, { Component } from "react";
import moment from "moment";
import { Table } from "semantic-ui-react";
import "./CourseBuilderTool.css";
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { connect } from 'react-redux'

import { Button } from 'semantic-ui-react'


moment.locale("en");

class CourseBuilderTool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseInfo: [],
      startDate: '',
      endDate: '',
      numberOfDaysTotal: 0,
      numberOfDaysPerWeek: 0,
      selectedDaysArray: [],
      popDays: []
    };
  }

  componentDidMount() {
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





  render() {

    let day0style = this.state.selectedDaysArray.includes(0) ? false : true;
    let day1style = this.state.selectedDaysArray.includes(1) ? false : true;
    let day2style = this.state.selectedDaysArray.includes(2) ? false : true;
    let day3style = this.state.selectedDaysArray.includes(3) ? false : true;
    let day4style = this.state.selectedDaysArray.includes(4) ? false : true;
    let day5style = this.state.selectedDaysArray.includes(5) ? false : true;
    let day6style = this.state.selectedDaysArray.includes(6) ? false : true;

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
        <div>
          <Table striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell name="Sunday">Sunday</Table.HeaderCell>
                <Table.HeaderCell name="Monday">Monday</Table.HeaderCell>
                <Table.HeaderCell name="Tuesday">Tuesday</Table.HeaderCell>
                <Table.HeaderCell name="Wednesday">Wednesday</Table.HeaderCell>
                <Table.HeaderCell name="Thursday">Thursday</Table.HeaderCell>
                <Table.HeaderCell name="Friday">Friday</Table.HeaderCell>
                <Table.HeaderCell name="Saturday">Saturday</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Button
                    className='cb-tool-btn'
                    primary={ day0style }
                    onClick={() => {
                      this.handleDaySelected(0);
                    }}
                  >
                    Select Sunday
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    className='cb-tool-btn'
                    primary={ day1style }
                    onClick={() => {
                      this.handleDaySelected(1);
                    }}
                  >
                    Select Monday
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    className='cb-tool-btn'
                    primary={ day2style }
                    onClick={() => {
                      this.handleDaySelected(2);
                    }}
                  >
                    Select Tuesday
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    className='cb-tool-btn'
                    primary={ day3style }
                    onClick={() => {
                      this.handleDaySelected(3);
                    }}
                  >
                    Select Wednesday
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    className='cb-tool-btn'
                    primary={ day4style }
                    onClick={() => {
                      this.handleDaySelected(4);
                    }}
                  >
                    Select Thursday
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    className='cb-tool-btn'
                    primary={ day5style }
                    onClick={() => {
                      this.handleDaySelected(5);
                    }}
                  >
                    Select Friday
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    className='cb-tool-btn'
                    primary={ day6style }
                    onClick={() => {
                      this.handleDaySelected(6);
                    }}
                  >
                    Select Saturday
                  </Button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <div style={{ height: 700 }}>

      {/* <div className="cbt-days-display-header">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
        
      </div> */}
      <div className="cbt-days-display-container">
        { popDaysDisplay}
      </div>

      </div>
       
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
      curricula: state.teachers.curricula
  }
}

export default connect( mapStateToProps )(CourseBuilderTool);
