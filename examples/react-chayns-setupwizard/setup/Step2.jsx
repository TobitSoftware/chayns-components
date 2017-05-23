import React from 'react';
import PropTypes from 'prop-types';

export default class Step2 extends React.Component{

    static contextTypes = {
        nextStep: PropTypes.func,
        previousStep: PropTypes.func
    };

    constructor(){
        super();
    }

    render(){
        return(
            <div style={{textAlign: "center"}}>
                <div className="button" style={{marginRight: "10px"}} onClick={this.context.previousStep}>Previous</div>
                <div className="button" onClick={this.context.nextStep}>Next</div>
            </div>
        );
    }
}