import React from 'react';

export default class Step3 extends React.Component{

    static contextTypes = {
        nextStep: React.PropTypes.func,
        previousStep: React.PropTypes.func,
        toStep: React.PropTypes.func
    };

    constructor(){
        super();
    }

    render(){
        return(
            <div style={{textAlign: "center"}}>
                <div className="button" style={{marginRight: "10px"}} onClick={()=>this.context.toStep(0)}>Jump to Step 1</div>
                <div className="button" style={{marginRight: "10px"}} onClick={this.context.previousStep}>Previous</div>
                <div className="button" onClick={this.context.nextStep}>Next</div>
            </div>
        );
    }
}