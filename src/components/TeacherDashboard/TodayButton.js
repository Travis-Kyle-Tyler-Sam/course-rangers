import React, { Component } from 'react';
import {
    Card,
    Icon,
    Image,
    Input,
    Button,
    TextArea,
    Form,
    Header,
    Checkbox,
    Message
  } from "semantic-ui-react";
  import axios from 'axios';

class TodayButton extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            todaysClass: []
         }
    }



    componentDidMount(){
this.getDate()
    }
    getDate(){

            axios.get(`/api/gettoday/?date=${this.props.today}&courseid=${this.props.courseid}`)
            .then(response => this.setState({todaysClass: response.data}))
            .catch(err=>console.log(err))
    }

    render() { 
       
        let routeParam = ()=>{
            if(this.state.todaysClass[0] !== 1){
                 return this.state.todaysClass[0].id
             }
         }
            if(!this.state.todaysClass[0]){
                return 'No Class Today'
            }

        return ( 
            <div>      
                <Button href={`/#/teacher/lecture/${routeParam()}`}>Today</Button>
                </div>
     


         )
    }
}
 
export default TodayButton;