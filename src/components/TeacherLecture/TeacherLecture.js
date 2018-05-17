import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import axios from 'axios';
import { Button, Input, Form, Icon, Label, List, Loader, Segment, Breadcrumb, Grid, Transition, TextArea} from 'semantic-ui-react';
import './TeacherLecture.css';
const socket = openSocket(`/`)
class TeacherLecture extends Component {
    constructor(){
        super();
        this.state = {
            userType:'Instructor',
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
        }
        socket.on('thumbcount', thumbquality => {
            if (thumbquality === 'thumbsup')
                this.setState({
                    count:this.state.count+1,
                    thumbsDisable:true
                })
            else {
                this.setState({
                    count2:this.state.count2+1,
                    thumbsDisable:true
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
        const { userType, classid } = this.state;
        socket.emit('join',`${userType}${classid}`, room => {
            this.setState({
                room
            })
        })
        
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        const { socket, userType } = this.state;
    }
    componentWillUnmount(){
        socket.close()
    }
    handleInput = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    launchThumbs = (e) =>{
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
        e.preventDefault()
        const {classid, teachersurveyinput} = this.state;
        socket.emit('free response', [teachersurveyinput, classid], () => {
            this.setState({
                teachersurveyinput:'',
                studentFreeResponses:[]
            })
        })

    }
    
    
    render(){
        const {  count, count2, room, studentResponses, 
            teacherSurveyText, teacherthumbinput, teachersurveyinput, 
            teacherThumbText, studentFreeResponses} = this.state

        return(
            <div>
                <p>TeacherLecture Room: {room}</p>
                <Form>
                    <p>Thumbs Survey</p>
                    <TextArea name='teacherthumbinput' value = {teacherthumbinput} onChange={this.handleInput}/>
                    <Button onClick={ this.launchThumbs}>LAUNCH THE THUMBS</Button>
                </Form>
                <div>
                    <p>thumbsup {count}</p>
                    <p>thumbsdown {count2}</p>
                </div>
                <Form>
                    <p>Free Response Question</p>
                    <TextArea name='teachersurveyinput' value={teachersurveyinput} onChange={this.handleInput}/>
                    <Button onClick={this.freeResponse}>LAUNCH THE QUESTION</Button>
                </Form>
                <div>
                    <p>{teacherThumbText}</p>
                    <List>
                        {studentResponses.length > 0
                        ?   studentResponses.map( (response, i) => {
                            return <List.Item key ={`thumbResponse${i}`}>{response.studentid}: {response.question}</List.Item>
                        })
                        :null
                        }
                    </List>
                </div>
                <div>
                    <p>Free Responses</p>
                    <p>{teacherSurveyText}</p>
                    <List>
                        {studentFreeResponses.length > 0
                         ?   studentFreeResponses.map( (response, i) => {
                            return <List.Item key={`freeResponse${i}`}>{response.studentid}:{response.response}</List.Item>
                        })
                        :null
                        }
                    </List>
                </div>
            </div>
        )
    }
}

export default TeacherLecture