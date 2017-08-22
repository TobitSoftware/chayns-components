import React from 'react';
import PropTypes from 'prop-types';

export default class Step1 extends React.Component{

    static contextTypes = {
        nextStep: PropTypes.func
    };

    render() {
        return(
            <div style={{ textAlign: 'center' }}>
                <div className="button" onClick={this.context.nextStep}>Next</div>
            </div>
        );
    }
}
