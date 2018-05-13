import React, { Component } from 'react';
import moment from 'moment';
import { Table } from 'semantic-ui-react';




class CourseBuilderTool extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            courseInfo: []
         }
    }
    componentDidMount(){
        this.setState({courseInfo: this.props.courseInfo})
    }
    render() { 
       console.log(this.state)
        return ( <div>
              
                <div>
                <Table striped>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Sunday</Table.HeaderCell>
        <Table.HeaderCell>Monday</Table.HeaderCell>
        <Table.HeaderCell>Tuesday</Table.HeaderCell>
        <Table.HeaderCell>Wednesday</Table.HeaderCell>
        <Table.HeaderCell>Thursday</Table.HeaderCell>
        <Table.HeaderCell>Friday</Table.HeaderCell>
        <Table.HeaderCell>Saturday</Table.HeaderCell>
        </Table.Row>
        </Table.Header>
                </Table>
                </div>


        </div> )
    }
}
 
export default CourseBuilderTool;