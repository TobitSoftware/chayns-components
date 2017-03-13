import React from 'react';

import {Calendar} from 'tobit-chayns_components/react-chayns-calendar';
import 'tobit-chayns_components/react-chayns-calendar/style.css';

export default class Example extends React.Component {

    constructor(){
        super();
        this.onClick = this.onClick.bind(this);
    }

    onClick(){

    }

    render(){
        return(
            <div className="content">
                <h2 style={{marginBottom:'8%'}}>Option 1:</h2>
                <div className="accordion accordion--open">
                    <div className="accordion__head">
                        Calendar
                    </div>
                    <div className="accordion__body">
                        <div className="accordion__content">
                            <Calendar onDateSelect={this.onClick}/>
                        </div>
                    </div>
                </div>
                <h2 style={{marginBottom:'8%'}}>Option 2:</h2>
                <Calendar onDateSelect={this.onClick}/>
            </div>
        )
    }
}