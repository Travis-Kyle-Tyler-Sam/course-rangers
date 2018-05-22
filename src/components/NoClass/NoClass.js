import React, { Component } from 'react';
import {Card, Button} from 'semantic-ui-react';
class NoClass extends Component {
    render() { 
        return ( <div>

            <Card>
                <h1>There Is No Class Today For This Course</h1>
            </Card>
            <Button href="/#/temporarydashboard">Back</Button>
        </div> )
    }
}
 
export default NoClass;