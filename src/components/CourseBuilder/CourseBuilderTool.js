import React, { Component } from "react";
import moment from "moment";
import { Table } from "semantic-ui-react";
import "./CourseBuilderTool.css";
import BigCalendar from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";


moment.locale("en");
BigCalendar.momentLocalizer(moment);

const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

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
      days_of_week: [
        {
          name: "Curriculum Name",
          desc: "Curriculum Description",
          curriculumDays: [
            {
              dayNum: 1,
              dayTopic: "Topic of the day",
              assignments: [
                {
                  title: "assignment title",
                  description: "Description of assignment",
                  totalPts: 15,
                  url: "path of file might be blank if its just instructions",
                  dueOffset: 10
                }
              ],
              quizzes: [
                {
                  title: "Quiz title",
                  description: "Quiz description",
                  dueDate: 15,
                  questions: [
                    {
                      questionText: "How do you ask a question?",
                      ptsPossible: 10,
                      correctAnswer:
                        "The answer in the form of a string, always one of the answer options",
                      answerOptions: [
                        "answer option 1",
                        "answer option 1",
                        "answer option 3"
                      ]
                    }
                  ]
                }
              ],
              resources: [
                {
                  title: "resource title",
                  description: "resource description",
                  type: "link or file",
                  url: "url of resource"
                }
              ]
            }
          ]
        }
      ],
      view: "month",
      date: new Date(),
      width: 950,
      events: []
    };
  }





 eventClassConstructor(dayTitle, newThing, newStartDate, newEndDate){
  let newArray = []
  
  function Event(title, allDay, start, end) {
    this.title = title;
    this.allDay = allDay;
    this.startDate = start;
    this.endDate = end;
    this.showEvent = ()=>{
      return {
        title: this.title,
        allDay: this.allDay,
        start: this.startDate,
        end: this.endDate
      }
    }
  }
  


  let coolVariable = new Event(dayTitle, newThing, newStartDate, newEndDate)
  newArray.push(coolVariable.showEvent())
  return newArray
  }
  








  componentDidMount() {
    this.setState({ 
      courseInfo: this.props.courseInfo,
            startDate: this.props.startDateInput,
            endDate: this.props.endDateInput
      
    });
    this.calculateNumberOfCourseDays();
    this.createEvents()
  }

  calculateNumberOfCourseDays() {
    this.setState({
      numberOfDaysTotal: this.state.days_of_week.length
    });
  }





  createEvents(){
        let newArray = this.state.events
    let newObject = this.eventClassConstructor('Day1', true, '2018-05-12', '2018-05-12')
    newArray.push(newObject[0])
    
    
    let object2 = this.eventClassConstructor('Day2', true, '2018-05-16', '2018-05-16')
    newArray.push(object2[0])
    
    let object3 = this.eventClassConstructor('Day3', true, '2018-05-17', '2018-05-17')
    newArray.push(object3[0])
    
    let object4 = this.eventClassConstructor('Day4', true, '2018-05-21', '2018-05-21')
    newArray.push(object4[0])
    this.setState({events: newArray})
  }

  handleDaySelected(day) {
    let newArray = this.state.selectedDaysArray;
    let indexOfSelection = this.state.selectedDaysArray.indexOf(day);
    if (indexOfSelection != -1) {
      newArray.splice(indexOfSelection, 1);
    } else {
      newArray.push(day);
    }
    this.setState({ selectedDaysArray: newArray });
  }






  render() {

      console.log(this.state.events)



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
                  <button
                    onClick={() => {
                      this.handleDaySelected("Sunday");
                    }}
                  >
                    Select Sunday
                  </button>
                </Table.Cell>
                <Table.Cell>
                  <button
                    onClick={() => {
                      this.handleDaySelected("Monday");
                    }}
                  >
                    Select Monday
                  </button>
                </Table.Cell>
                <Table.Cell>
                  <button
                    onClick={() => {
                      this.handleDaySelected("Tuesday");
                    }}
                  >
                    Select Tuesday
                  </button>
                </Table.Cell>
                <Table.Cell>
                  <button
                    onClick={() => {
                      this.handleDaySelected("Wednesday");
                    }}
                  >
                    Select Wednesday
                  </button>
                </Table.Cell>
                <Table.Cell>
                  <button
                    onClick={() => {
                      this.handleDaySelected("Thursday");
                    }}
                  >
                    Select Thursday
                  </button>
                </Table.Cell>
                <Table.Cell>
                  <button
                    onClick={() => {
                      this.handleDaySelected("Friday");
                    }}
                  >
                    Select Friday
                  </button>
                </Table.Cell>
                <Table.Cell>
                  <button
                    onClick={() => {
                      this.handleDaySelected("Saturday");
                    }}
                  >
                    Select Saturday
                  </button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <div style={{ height: 700 }}>
      
        <BigCalendar
          style={{ height: 500, width: this.state.width }}
          toolbar={false}
          events={this.state.events}
          step={60}
          views={allViews}
          view={this.state.view}
          onView={() => {}}
          date={this.state.date}
          onNavigate={date => this.setState({ date })}
        />
      </div>
       
        </div>
      </div>
    );
  }
}

export default CourseBuilderTool;
