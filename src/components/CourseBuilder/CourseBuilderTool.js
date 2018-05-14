import React, { Component } from "react";
import moment from "moment";
import { Table } from "semantic-ui-react";
import "./CourseBuilderTool.css";
///// will need to delete days_of_week from state and use actual data once we are receiving correctly formated data from the DB

class CourseBuilderTool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseInfo: [],
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
            },
            {
              dayNum: 2
            },
            {
              dayNum: 3
            },
            {
              dayNum: 4
            },
            {
              dayNum: 5
            },
            {
              dayNum: 6
            },
            {
              dayNum: 7
            },
            {
              dayNum: 8
            },
            {
              dayNum: 9
            },
            {
              dayNum: 10
            },
            {
              dayNum: 11
            },
            {
              dayNum: 12
            },
            {
              dayNum: 13
            },
            {
              dayNum: 14
            },
            {
              dayNum: 15
            }
          ]
        }
      ]
    };
  }
  componentDidMount() {
    this.setState({ courseInfo: this.props.courseInfo });
    this.calculateNumberOfCourseDays();
  }

  calculateNumberOfCourseDays() {
    this.setState({
      numberOfDaysTotal: this.state.days_of_week.length
    });
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


  dateCreator(startDate, endDate){
    let rangeArray =[]
   function makeDiv(day){
        return <div className="item-1" key={day}>{day}</div>
    }
    for(let i=startDate.getDate(); i<=endDate.getDate(); i++){
         rangeArray.push(makeDiv(i))
    }
    return rangeArray
}




  ///// if week 1 has 7 days, and days the class is being held is 3 days per week, and the total number of days the curriculum is setup for is 30, it would populate 10 weeks.
  ////// if class is being held 1 day per week, it would populate 30 weeks.
  ///// if class is being held 4 times per week, it would populate 7 full weeks and an 8th week with only the first two days being populated.

  render() {
      console.log(this.state.selectedDaysArray);
      const { days_of_week } = this.state.courseInfo;
      
      
      ///// sunday = column 1, monday = column 2  tuesday = column 3, thursday = column 4, friday = column 6, saturday = column 7
      
      
      //// need to only populate days in columns that match with the days of the week in this.state.selectedDaysArray    //// maybe something with nth child inline css

    const mappedDays = this.state.days_of_week[0].curriculumDays.map(day => {
      return (
        <div className="item-1" key={day.dayNum} style={{}}>
          {day.dayNum}

        </div>
      );
    });





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
          <div className="support-grid" />

          <section className="grid-1">
          {mappedDays}
          </section>
        </div>
      </div>
    );
  }
}

export default CourseBuilderTool;
