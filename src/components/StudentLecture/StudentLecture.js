import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import { Button, Input, Form, Icon, Label, List, Loader, Segment, Breadcrumb, Grid, Transition, TextArea, Header, Table } from 'semantic-ui-react';
import './StudentLecture.css'
import StudentResources from './StudentResources/StudentResources';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';



const socket = openSocket(process.env.REACT_APP_SOCKET);

class StudentLecture extends Component {
    constructor() {
        super()
        this.state = {
            userType: 'Student',
            thumbsDisable: false,
            studentThumbText: '',
            studentSurveyText: '',
            studentUnderstands: true,
            studentsurveyinput: '',
            userid: 3,
            classid: 1,
            teacherThumbText: '',
            teacherSurveyText: '',
            freeresponseinput: '',
            thumbsVisible: false,
            courseMaterial: [],
            freeResponseVisible:false
        }
        socket.on('open thumbs', teacherinput => {
            this.setState({
                teacherThumbText: teacherinput,
                thumbsDisable: false,
                studentThumbText: '',
                studentUnderstands: true,
                thumbsVisible: true,
            })
        })
        socket.on('student free response', teacherinput => {
            this.setState({
                teacherSurveyText: teacherinput,
                studentSurveyText: '',
                freeResponseVisible:true,
            })
        })
    }
    componentDidMount() {
        const { userType, classid } = this.state;
        socket.emit('join', `${userType}${classid}`, room => {
            this.setState({
                room
            })
        })
        this.getCourseMaterial()
    }
    getCourseMaterial() {
        axios.get(`/api/student/lecture_material/${this.props.match.params.dayid}`)
            .then(response => {
                this.setState({ courseMaterial: response.data })
            })
            .catch(err => console.log(err))
    }


    buttonPress = (e) => {
        e.preventDefault()
        const { userType, classid, userid } = this.state;
        socket.emit('students send thumbs', ['thumbsup', classid, userid], () => {
            this.setState({
                thumbsDisable: true
            })
        })
    }
    buttonPress2 = (e) => {
        e.preventDefault()
        const { count2, classid, userid } = this.state;
        socket.emit('students send thumbs', ['thumbsdown', classid, userid], () => {
            this.setState({
                thumbsDisable: true,
                studentUnderstands: false
            })
        })
    }
    componentWillUnmount() {
        socket.close()
    }
    sendStudentResponse = (e) => {
        e.preventDefault()
        const { classid, studentsurveyinput, userid } = this.state;
        this.setState({
            studentThumbText: studentsurveyinput
        })
        socket.emit('student thumb response', [studentsurveyinput, classid, userid], () => {
            this.setState({
                studentsurveyinput: ''
            })
        })
    }
    sendFreeResponse = (e) => {
        e.preventDefault()
        const { classid, freeresponseinput, userid } = this.state;
        this.setState({
            studentSurveyText: freeresponseinput
        })
        socket.emit('student free response', [freeresponseinput, classid, userid], () => {
            this.setState({
                freeresponseinput: ''
            })
        })
    }
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        let uniqueResources = _.uniqBy(this.state.courseMaterial, "title");
        let uniqueAssignments = _.uniqBy(this.state.courseMaterial, "name");
        let resources = uniqueResources.map(resource => {
            return <Table.Row key={resource.id}><Table.Cell><a href={resource.url} target='_.blank'>{resource.title}</a></Table.Cell></Table.Row>
        })
        let assignments = uniqueAssignments.map(assignment => {
            return <Table.Row key={assignment.id + assignment.name}>
                <Table.Cell>{assignment.name}</Table.Cell>
                <Table.Cell>{assignment.percentage ? (`${assignment.percentage}%`): ('Not Taken')}</Table.Cell>
                <Table.Cell>{assignment.date_submitted ? moment(assignment.date_submitted).format('MM/DD') : moment(assignment.due_date).format('MM/DD')}</Table.Cell>
            </Table.Row>
        })
        const { room, userType, thumbsDisable, studentUnderstands,
            studentSurveyText, teacherSurveyText, freeresponseinput,
            studentsurveyinput, teacherThumbText, thumbsVisible, 
            studentThumbText, freeResponseVisible } = this.state;
        return (
            <div>
                
                <div className='student-lecture'>
                <Header as='h2'>Student Lecture View Room {room}</Header>
                    <div className='assignments'>
                        <Header as="h2">Assignments</Header>
                        <Table>
                            <Table.Header>                           
                                <Table.Row>
                                <Table.HeaderCell>Assignment</Table.HeaderCell>
                                    <Table.HeaderCell>Grade</Table.HeaderCell>
                                    <Table.HeaderCell>Due Date</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>{assignments}</Table.Body>
                        </Table>
                        <Header as="h2">Resources</Header>
                        <Table>
                            <Table.Header>
                                <Table.Row>
                                <Table.HeaderCell>Resource</Table.HeaderCell>                                   
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>{resources}</Table.Body>
                        </Table>
                    </div>
                    <div className='student-response'>
                        <Segment>
                            <Header as='h2'>Thumbs!</Header>
                            <Transition duration='500' animation='fly left' visible={thumbsVisible}>
                                <Form>
                                    <p>{teacherThumbText}</p>
                                    <Icon name='thumbs outline up' size='large' />
                                    <Button onClick={this.buttonPress}
                                        disabled={thumbsDisable}
                                    >
                                        I get it!
                                </Button>
                                    <Icon name='thumbs outline down' size='large' />
                                    <Button onClick={this.buttonPress2}
                                        disabled={thumbsDisable}
                                    >
                                        I don't get it.
                                </Button>
                                </Form>
                            </Transition>

                            {!studentUnderstands
                                ? <Form>
                                    <p>What don't you understand?</p>
                                    <TextArea onChange={this.handleInput} name='studentsurveyinput' value={studentsurveyinput} />
                                    <Button onClick={this.sendStudentResponse}>SEND YOUR QUESTION</Button>
                                    <p>Here is your question:</p>
                                    <p>{studentThumbText}</p>
                                </Form>
                                : null
                            }
                        </Segment>
                        <Segment>
                            <Header as='h2'>Free Response</Header>
                            <Transition duration='500' animation='fly left' visible={freeResponseVisible}>
                                <Form>
                                    <Icon name='question' size='large'/>
                                    <p>{teacherSurveyText}</p>
                                    <TextArea onChange={this.handleInput} name='freeresponseinput' value={freeresponseinput}></TextArea>
                                    <Button onClick={this.sendFreeResponse}>SEND YOUR RESPONSE</Button>
                                    <p>Here is your question:</p>
                                    <p>{studentSurveyText}</p>
                                </Form>
                            </Transition>
                            
                        </Segment>
                    </div>
                </div>
            </div>

        )
    }
}

export default StudentLecture;