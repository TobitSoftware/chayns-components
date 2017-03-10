import React from 'react';

export default class Step1 extends React.Component{

    static contextTypes = {
        nextStep: React.PropTypes.func
    };

    constructor(){
        super();
    }
    render(){
        return(
            <div style={{textAlign: "center"}}>
                <div className="button" onClick={this.context.nextStep}>Next</div>
            </div>
        );
    }
}