import React, { Component } from 'react';
import openSocket from 'socket.io-client';
import axios from 'axios';
const socket = openSocket(`/`)

class TeacherLecture extends Component {
    constructor(){
        super();

        this.state = {
            userType:'Instructor',
            thumb:'',
            count:0,
            response2:'',
            count2:0,
            classid:1,
            room:'',
            userid:3, 
            thumbsDisable:false,
            teachersurveyinput:'',
            teacherSurveyText:'',
            studentSurveyText:'',
            studentResponses:['student responses here'],
            studentUnderstands:true,
            studentsurveyinput:''
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
        socket.on('open thumbs', teacherinput => {
            this.setState({
                teacherSurveyText:teacherinput,
                thumbsDisable:false,
                studentSurveyText:'',
                studentUnderstands:true
            })
        })
        socket.on('get student response', studentinput => {
            let studentArray = [...this.state.studentResponses]
            studentArray.push({question:studentinput[0], studentid:studentinput[2]})
            this.setState({
                studentResponses:studentArray,
                
            })
        })
    }
    componentDidMount(){
        const { socket, classid, userType, count, count2 } = this.state;
        // socket.on('ping', data => this.setState({response:data}))
        
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        const { socket, userType } = this.state;
        
    }

    buttonPress = () => {
        const { count, userType, classid, userid} = this.state;
        socket.emit('students send thumbs', ['thumbsup', classid, userid], () => {
            this.setState({
                thumbsDisable:true
            })
        })
    }
    buttonPress2 = () => {
        const { count2, classid, userid } = this.state;
        socket.emit('students send thumbs',['thumbsdown', classid, userid], () => {
            this.setState({
                thumbsDisable:true,
                studentUnderstands:false
            })
        })
    }
    joinRoom = () => {
        const { userType, classid } = this.state;
        socket.emit('join',`${userType}${classid}`, room => {
            this.setState({
                room
            })
        })
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
        const {classid, teachersurveyinput} = this.state;
        socket.emit('thumbs launched',[teachersurveyinput, classid], () => {
            this.setState({
                teacherSurveyText:teachersurveyinput,
                count:0,
                count2:0,
                teachersurveyinput:'',
                studentResponses:[]
            })
        })
    }
    sendStudentResponse = (e) =>{
        e.preventDefault()
        const {classid, studentsurveyinput, userid} = this.state;
        this.setState({
            studentSurveyText:studentsurveyinput
        })
        socket.emit('student response', [studentsurveyinput, classid, userid], () => {
            this.setState({
                studentsurveyinput:''
            })
        })
    }
    
    render(){
        const { response, count, response2, count2, room, userType, thumbsDisable, studentUnderstands, studentResponses, teacherSurveyText, studentSurveyText} = this.state

        return(
            <div>
                <p>TeacherLecture</p>
                
                
                <div>
                    <p>{room}</p>
                    <button onClick={this.joinRoom}>Join Room</button>
                </div>
                <form>
                    <input type='radio' value='Student' id='userChoice1' name='userType' onChange={this.handleInput}/>
                    <label htmlFor='userChoice1'>Student</label>
                    <input type='radio' value='Instructor' id='userChoice2' name='userType' onChange={this.handleInput}/>
                    <label htmlFor='userChoice2'>Instructor</label>
                    <p>userType: {userType}</p>
                </form>
                <form>
                    <input name='userid' value={this.state.userid} id='userid'onChange={this.handleInput} />
                    <label htmlFor='userid'>Input User ID</label>
                    <p>User ID: {this.state.userid}</p>
                </form>
                { userType === 'Instructor'
                ?<form>
                    <input name='teachersurveyinput' value = {this.state.teachersurveyinput} onChange={this.handleInput}/>
                    <button onClick={ this.launchThumbs}>LAUNCH THE THUMBS</button>
                </form>
                : teacherSurveyText
                
                    ?<form>
                        <p>{teacherSurveyText}</p>
                        
                    </form>
                    : null
                }
                <div>
                    { userType === 'Instructor'
                        ?<p>{response} {count}</p>
                        : teacherSurveyText
                            ?<button onClick={this.buttonPress} 
                            disabled={thumbsDisable}>I get it!</button>
                            :null
                    }
                </div>
                <div>
                    {userType === 'Instructor'
                        ? <p>{response2} {count2}</p>
                        : teacherSurveyText
                        ? <button onClick={this.buttonPress2}
                            disabled={thumbsDisable}
                            >I don't get it.</button>
                        :null
                    }
                </div>
                { !studentUnderstands
                ?<form>
                    <p>What don't you understand?</p>
                    <input onChange={this.handleInput} name='studentsurveyinput' value={this.state.studentsurveyinput}/>
                    <button onClick={this.sendStudentResponse}>This is my question</button>
                    <p>{this.state.studentSurveyText}</p>
                </form>
                : null}
                
                { userType === 'Instructor'
                ?
                <div>
                    <p>{teacherSurveyText}</p>
                    <ul>
                        {studentResponses.map( (response, i) => {
                            return <li key ={`response ${i}`}>{response.studentid}: {response.question}</li>
                        })}
                    </ul>
                </div>
                : null
                }
                
            </div>
        )
    }
}

export default TeacherLecture