import React from 'react';
import '../StudentCourseDetail.css'
import { Card } from 'semantic-ui-react';
import sortBy from 'lodash/sortBy'

function StudentDaySelector (props){
    const {daysArray} = props;
    const daysBoxes = sortBy(daysArray, day => {
        return day.date
    })
    
    .map( day => {
        return <Card>
            <Card.Content>{day.date}</Card.Content>
        </Card>
    })
    return(
        <div className='day-grid-container'>
            {daysBoxes}
        </div>
    )
}
export default StudentDaySelector;