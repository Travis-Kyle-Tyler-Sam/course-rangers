import React, { Component } from 'react';
import { Table, Header } from 'semantic-ui-react';
import _ from 'lodash';
import {connect} from 'react-redux';
import moment from 'moment';
class TeacherCourseResources extends Component {
    constructor(props) {
        super(props);
        let filteredCourse = this.props.courses.filter( course => course.id === this.props.course)[0]
        this.state = { 
resources: [],
currentCourse: filteredCourse

         }
    }


        
     findCourseDay(course_day_id){
         let courseDay = this.state.currentCourse.days.filter( day => day.id === course_day_id)[0]
     return moment(courseDay.date).format('MM/DD')
        }

    render() {
        const tempResources = []
        if(!this.props.days){
            return ''
        }
        if(this.props.days){
            let resource = this.props.days.map(day =>{
                return day.resources
            })
            tempResources.push(resource)
        }
        const resourcesToMap = _.flattenDeep(tempResources)
        const list = resourcesToMap.map( resource => {
        return(
        <Table.Row key={resource.id + resource.description}>
           <Table.Cell><a href={resource.url}> {resource.title}</a></Table.Cell>
            <Table.Cell>{this.findCourseDay(resource.course_day_id)}</Table.Cell>
        </Table.Row>
        )})
    return(
        <div>
            <Header as='h2'>Resources</Header>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Resource</Table.HeaderCell>
                        <Table.HeaderCell>Class Date</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {list}
                </Table.Body>
            </Table>
        </div>
    )
}
}
function mapStateToProps(state) {
    return {
      courses: state.teachers.courses
    }
  }
  
  export default connect(mapStateToProps)(TeacherCourseResources);