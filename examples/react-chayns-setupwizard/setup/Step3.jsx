import React from 'react';
import PropTypes from 'prop-types';

export default class Step3 extends React.Component {
    static contextTypes = {
        nextStep: PropTypes.func,
        previousStep: PropTypes.func,
        toStep: PropTypes.func
    };

    render() {
        return(
            <div style={{ textAlign: 'center' }}>
                <div className="button" style={{ marginRight: '10px' }} onClick={()=>this.context.toStep(0)}>Jump to Step 1</div>
                <div className="button" style={{ marginRight: '10px' }} onClick={this.context.previousStep}>Previous</div>
                <div className="button" onClick={this.context.nextStep}>Next</div>
            </div>
        );
    }
}
