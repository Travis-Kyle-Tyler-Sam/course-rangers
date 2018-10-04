import React, {Component} from 'react';
import StudentAssignmentDetail from './../../StudentAssignmentDetail/StudentAssignmentDetail'
import { Table, Pagination, Button } from 'semantic-ui-react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

class PendingAssignmentTable extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentPage:1,
            totalPages:Math.ceil(this.props.list.length/3),
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if (prevProps.list !== this.props.list){
            this.setState({
                totalPages:Math.ceil(this.props.list.length/3)
            })
        }
    }
    handlePage( pageIndex ){
        this.setState({
            currentPage:pageIndex
        })
    }
    render(){
        const { list, course } = this.props;
        const { currentPage, totalPages } = this.state;
        const assignments = list.map( (assignment, i) => {
            if (Math.ceil((i+1)/3)===currentPage){
                return (
                    <Table.Row>
                        <Table.Cell >{assignment.name}</Table.Cell>
                        <Table.Cell >{moment(assignment.due_date).format('MM/DD')}</Table.Cell>
                        {
                            assignment.date_submitted
                                ?<Table.Cell >
                                    {`submitted ${moment(assignment.date_submitted).format('MM/DD')}`}
                                    {/* <Icon name='target'/> */}
                                </Table.Cell>
                                :<Table.Cell >
                                    Incomplete 
                                </Table.Cell>
                        }
                        {
                            assignment.type === 'quiz'
                                ?<Table.Cell >
                                    <Button onClick={() => this.props.history.push(`/student/quiz/${assignment.id}`)}>
                                        Take Quiz!
                                    </Button>
                                </Table.Cell>
                                
                                :<StudentAssignmentDetail
                                    courseName = {assignment.course_name}
                                    assignmentName = {assignment.name}
                                    instructorName = {assignment.teacher_name}
                                    dueDate = {moment(assignment.due_date).format('MM/DD')}
                                    instructions = {assignment.description}
                                    key = {`pend-assignment-detail${assignment.id}`}
                                    uploadFileFn = {this.props.uploadFileFn}
                                    assignmentID = {assignment.id}
                                    studentID = {assignment.studentID}
                                    attachment = {assignment.attachment}
                                    dateSubmitted = {assignment.date_submitted}
                                    type = {assignment.type}
                                />
                        }
                    </Table.Row>
                )
            }
        })
        return(
            <div>
                <Table striped compact fixed singleLine>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>{course.course_name}</Table.HeaderCell>
                            <Table.HeaderCell>Due Date</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {assignments}
                    </Table.Body>
                </Table>
                <Pagination
                    style={{ margin: '0 0 25px 0'}}
                    defaultActivePage={1}
                    totalPages={totalPages}
                    onPageChange={(event, data) => this.handlePage(data.activePage)}/>
            </div>
        )
    }
}
export default withRouter(PendingAssignmentTable)