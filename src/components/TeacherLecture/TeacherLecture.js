import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import axios from 'axios';
import { Table, Button, Input, Form, Icon, Label, List, Loader, Segment, Breadcrumb, Grid, Transition, TextArea, Feed, Header} from 'semantic-ui-react';
import './TeacherLecture.css';
import { connect } from "react-redux";
import _ from 'lodash';
import moment from 'moment';

const socket = openSocket(`http://localhost:3030`)

class TeacherLecture extends Component {
    constructor(){
        super();
        // let filteredCourse = this.props.courses.filter(
        //     course => course.id === +this.props.match.params.dayid
        //   )[0];
        this.state = {
            userType:'Instructor',
            name:'',
            count:0,
            response2:'',
            count2:0,
            classid:1,
            room:'',
            teachersurveyinput:'',
            studentFreeResponses:[],
            teacherthumbinput:'',
            teacherThumbText:'',
            studentResponses:[],
            thumbVisible:true,
            questionVisible:true,
            questionReturnVisible:false,
            thumbDownVisible:false,
            thumbUpVisible:false,
            resources: [],
            assignments: [],
            courseMaterial: []
        }
        socket.on('thumbcount', thumbquality => {
            if (thumbquality === 'thumbsup')
                this.setState({
                    count:this.state.count+1,
                    thumbsDisable:true,
                    thumbUpVisible:true
                })
            else {
                this.setState({
                    count2:this.state.count2+1,
                    thumbsDisable:true,
                    thumbDownVisible:true
                })
            }
            
        })
        socket.on('get student response', studentinput => {
            let studentArray = [...this.state.studentResponses]
            studentArray.push({question:studentinput[0], studentid:studentinput[2]})
            this.setState({
                studentResponses:studentArray,
            })
        })
        socket.on('get free response', studentinput => {
            let freeResponsesArray = [...this.state.studentFreeResponses];
            freeResponsesArray.push({response:studentinput[0],studentid:studentinput[2]})
            this.setState({
                studentFreeResponses:freeResponsesArray
            })
        })
    }
    componentDidMount(){
        if(+this.props.match.params.dayid === 0 ){
            this.props.history.push('/teacher/noclass')
        }
     
        const { userType, classid } = this.state;
        socket.emit('join',`${userType}${classid}`, room => {
            this.setState({
                room
            })
        })
        this.getCourseMaterial() 

    }
    // componentDidUpdate(prevProps, prevState, snapshot){
    //     const { socket, userType } = this.state;
    // }
    componentWillUnmount(){
        socket.close()
    }

    getCourseMaterial() {
        axios.get(`/api/teacher/lecture_material/${this.props.match.params.dayid}`)
            .then(response => {
                this.setState({ courseMaterial: response.data })
            })
            .catch(err => console.log(err))
    }

    handleInput = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    launchThumbs = (e) =>{
        this.toggleVisibility('thumbVisible', false)
        e.preventDefault()
        const {classid, teacherthumbinput} = this.state;
        socket.emit('thumbs launched',[teacherthumbinput, classid], (data) => {
            this.setState({
                teacherThumbText:teacherthumbinput,
                count:0,
                count2:0,
                teachersurveyinput:'',
                studentResponses:[]
            })
        })
    }
    freeResponse = (e) =>{
        this.toggleVisibility('questionVisible',false)
        e.preventDefault()
        const {classid, teachersurveyinput} = this.state;
        socket.emit('free response', [teachersurveyinput, classid], () => {
            this.setState({
                teachersurveyinput:'',
                studentFreeResponses:[]
            })
        })

    }
    
    
    toggleVisibility = (iconName, bool) => this.setState({[iconName]:bool})
    toggleThumbsDown = () => this.setState({thumbDownVisible:true})
    toggleThumbsUp = () => this.setState({thumbUpVisible:true})
    render(){
        console.log(this.state.courseMaterial)
        
        let uniqueResources = _.uniqBy(this.state.courseMaterial, "title");
        let uniqueAssignments= _.uniqBy(this.state.courseMaterial, "name");
        let resources = uniqueResources.map(resource => {
            return <Table.Row key={resource.id}><Table.Cell><a href={resource.url} target='_.blank'>{resource.title}</a></Table.Cell></Table.Row>
        })
        let assignments = uniqueAssignments.map(assignment => {
            return <Table.Row key={assignment.id + assignment.name}>
                <Table.Cell>{assignment.name}</Table.Cell>
               
                <Table.Cell>{moment(assignment.due_date).format('MM/DD')}</Table.Cell>
            </Table.Row>
        })
        const {  count, count2, room, studentResponses, 
            teacherSurveyText, teacherthumbinput, teachersurveyinput, 
            teacherThumbText, studentFreeResponses, thumbVisible, thumbLeave,
            thumbUpVisible, thumbDownVisible, questionVisible} = this.state

        return(
            <div className='teacher-lecture'>
                <div className='left-lecture'>
                    <div>
                        <Header as='h3'>TeacherLecture Room: {room}</Header>
                        <p>Topic:</p>
                    </div>
                    <div className='resources'>
                        <Segment>
                            <Header as='h2'>Resources</Header>
                            <Table>
                            <Table.Header>
                                <Table.Row>
                                <Table.HeaderCell>Resource</Table.HeaderCell>                                   
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>{resources}</Table.Body>
                        </Table>
                        </Segment>
                        <Segment>
                        <Header as="h2">Assignments</Header>
                        <Table>
                            <Table.Header>                           
                                <Table.Row>
                                <Table.HeaderCell>Assignment</Table.HeaderCell>
                                    <Table.HeaderCell>Due Date</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>{assignments}</Table.Body>
                        </Table>
                        </Segment>
                    </div>
                </div>
                <div className='middle-lecture'>
                    <Segment className='free-section'>
                    {/* possible icons--comment, comments, talk, help(a question mark, pencil, question) */}
                        <Header as='h1'>Free Responses</Header>
                        <Header as='h3'>{teacherSurveyText}</Header>
                        <Transition.Group
                        as='list'
                        duration={200}
                        divided
                        size='huge'>

                        {studentFreeResponses.length > 0
                        ?   studentFreeResponses.map( (response, i) => {
                            return <List.Item key={`freeResponse${i}`}>{response.studentid}:{response.response}</List.Item>
                        })
                        :null
                        }
                        </Transition.Group>
                    </Segment>
                    <Segment className='thumb-section'>
                        <Header as='h1'>Thumb Survey Results</Header>
                        <Header as='h3'>{teacherThumbText}</Header>
                        <div>
                                <Header as='h4'>thumbsup</Header>
                                <div className='thumbsup-count'>
                                    <Transition animation='fly up' duration='500' visible={thumbUpVisible} >
                                        <Icon name='thumbs outline up'size='large' />
                                    </Transition>
                                    <p>{count}</p>
                                </div>
                                <Header as='h4'>thumbsdown</Header>
                                <div className='thumbsup-count'>
                                    <Transition animation='fly down' duration='500' visible={thumbDownVisible}>
                                        <Icon name='thumbs outline down'size='large' />
                                    </Transition>
                                <p>{count2}</p>
                                </div>
                        </div>
                        <Transition.Group
                        as={List}
                        duration={200}
                        divided
                        size='huge'>
                            {studentResponses.length > 0
                            ?   studentResponses.map( (response, i) => {
                                return <List.Item key ={`thumbResponse${i}`}>{response.studentid}: {response.question}</List.Item>
                            })
                            :null
                            }
                        </Transition.Group>
                    </Segment>
                </div>
                <Segment className='right-lecture'>
                <Header as='h1'>In Class Surveys</Header>
                
                    <Form>
                        <Transition animation='fly left' duration='500' visible={thumbVisible}>
                            <Icon name='thumbs outline up'size='large'/>
                        </Transition>
                        <Header as='h3'>Thumbs Survey</Header>
                        <TextArea name='teacherthumbinput' value = {teacherthumbinput} onChange={this.handleInput}/>
                        <Button onClick={ this.launchThumbs}>LAUNCH THE THUMBS</Button>
                    </Form>
                    <Form>
                        <Transition animation='fly left' duration='500' visible={questionVisible}>
                            <Icon name='question'size='large'/>
                        </Transition>
                        <Header as='h3'>Free Response Question</Header>
                        <TextArea name='teachersurveyinput' value={teachersurveyinput} onChange={this.handleInput}/>
                        <Button onClick={this.freeResponse}>LAUNCH THE QUESTION</Button>
                    </Form>
                </Segment>
                
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      courses: state.teachers.courses
    };
  }
  
  export default connect(mapStateToProps)(TeacherLecture);
  