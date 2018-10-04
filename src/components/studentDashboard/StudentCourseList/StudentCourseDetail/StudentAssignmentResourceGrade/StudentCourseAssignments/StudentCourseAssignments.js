import React, {Component} from 'react';
import '../../StudentCourseDetail.css'
import StudentAssignmentDetail from './../../../../StudentAssignmentDetail/StudentAssignmentDetail';
import { Table, Pagination, Button} from 'semantic-ui-react';
import moment from 'moment';
import {withRouter} from 'react-router-dom';

class StudentCourseAssignments extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentPage:1,
            totalPages:Math.ceil(this.props.assignments.length/5)
        }
    }
    handlePage( pageIndex ){
        this.setState({
            currentPage:pageIndex
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if (prevProps.assignments.length !== this.props.assignments.length){
            this.setState({
                totalPages:(this.props.assignments.length/5)
            })
        }
    }
    render(){
        const {assignments, course, uploadFileFn} = this.props
        const list = assignments
        .filter((assignment, i) => Math.ceil((i+1)/5) === this.state.currentPage)
        .map( (assignment, i) => {
                let disabled = false;
                if (assignment.date_submitted){
                    disabled = true;
                }
                return(
                    <Table.Row>
                        <Table.Cell>{assignment.name}</Table.Cell>
                        <Table.Cell>{moment(assignment.due_date).format('MM/DD')}</Table.Cell>
                        {
                            assignment.date_submitted
                                ?<Table.Cell >
                                    {`submitted ${moment(assignment.date_submitted).format('MM/DD')}`}
                                    {/* <Icon name='target'/> */}
                                </Table.Cell>
                                :<Table.Cell >
                                    Incomplete 
                                    {/* <Icon name='protect'/> */}
                                </Table.Cell>
                        }
                        {
                            assignment.type === 'quiz'
                                ?<Table.Cell>
                                    <Button onClick={() => this.props.history.push(`/student/quiz/${assignment.id}`)}
                                    disabled={disabled}
                                    >
                                        Take Quiz!
                                    </Button>
                                </Table.Cell>
                                :<StudentAssignmentDetail
                                    courseName = {course.course_name}
                                    assignmentName = {assignment.name}
                                    instructorName = {course.user_name}
                                    dueDate = {moment(assignment.due_date).format('MM/DD')}
                                    instructions = {assignment.description}
                                    status = {assignment.point_scored ? 'Done': 'Incomplete'}
                                    uploadFileFn = {uploadFileFn}
                                    assignmentID = {assignment.id}
                                    studentID = {assignment.student_id}
                                    attachment = {assignment.attachment}
                                    dateSubmitted = {assignment.date_submitted}
                                    type = {assignment.type}
                                />
                        }
                    </Table.Row>
                )
            }
        )
        
        return(
            <div className='student-course-assignments'>
                <Table fixed compact singleLine color='purple'>
                    <Table.Header>
                        <Table.Row >
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Due Date</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {list}
                    </Table.Body>
                </Table>
                <Pagination
                    style={{ margin: '15px 0'}}
                    defaultActivePage={1}
                    totalPages={this.state.totalPages}
                    onPageChange={(event, data) => this.handlePage(data.activePage)}
                />
            </div>
        )
    }
}
export default withRouter(StudentCourseAssignments)