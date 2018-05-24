import React, { Component } from 'react';
import './NoClass.css'
import {Card, Button} from 'semantic-ui-react';
class NoClass extends Component {
    render() { 
        return ( <div>
            <div className="no_class">
            <Card className="no_class_card">
                <h1>There Is No Class Today For This Course</h1>
            <Button href="/#/temporarydashboard">Back</Button>
            </Card>
            </div>
        </div> )
    }
}
 
export default NoClass;