import React, { Component } from 'react';
import { Segment} from 'semantic-ui-react';
import StudentDaySelector from './StudentDaySelector/StudentDaySelector';
import StudentAssignmentResourceGrade from './StudentAssignmentResourceGrade/StudentAssignmentResourceGrade';
import './StudentCourseDetail.css'
class StudentCourseDetail extends Component {
    constructor(){
        super();
        this.state = {
            courseName:'MATH',
            daysArray:[],

        }
    }

    render(){
        const { courseName } = this.state;
        return(
            <div>
                <h1>{courseName}</h1>
                <div className='student-detail'>
                    <Segment>
                        <StudentDaySelector/>
                    </Segment>
                    <StudentAssignmentResourceGrade/>
                </div>

            </div>
        )
    }
}

export default StudentCourseDetail;