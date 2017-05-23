import React from 'react';
import PropTypes from 'prop-types';


export default class SelectItem extends React.Component {

    static componentName = 'SelectItem';

    static PropTypes = {
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        name: PropTypes.string,
        disabled: PropTypes.bool,
        className: PropTypes.string
    };

    render() {
        return(
            <div className="selectlist__selectitem">
                {this.props.children}
            </div>
        );
    }
}