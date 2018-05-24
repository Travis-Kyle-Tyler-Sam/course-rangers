import React, {Component} from 'react';
import { Table, Header, Pagination } from 'semantic-ui-react';
import moment from 'moment';
import '../../StudentCourseDetail.css'
class StudentCourseResources extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentPage:1,
            totalPages:Math.ceil(this.props.resources.length/5)
        }
    }
    
    handlePage( pageIndex ){
        this.setState({
            currentPage:pageIndex
        })
    }
    render(){
        const { resources } = this.props;
        const { currentPage } = this.state;
        const list = resources.map( (resource, i) => {
            if (Math.ceil((i+1)/5) === currentPage)
            return(
                <Table.Row>  
                    <Table.Cell><a target='_blank' href={resource.url}>{resource.title}</a></Table.Cell>
                    <Table.Cell>{moment(resource.date).format('MM/DD')}</Table.Cell>
                </Table.Row>
            )
        })
        return(
            <div className='student-course-resources'>
                <Table fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Resource</Table.HeaderCell>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {list}
                    </Table.Body>
                </Table>
                <Pagination
                defaultActivePage={1}
                totalPages={this.state.totalPages}
                onPageChange={(event, data) => this.handlePage(data.activePage)}
                />
            </div>
        )
    }
}
export default StudentCourseResources;