import React from 'react';

export default class SelectItem extends React.Component {

    static componentName = 'SelectItem';

    static PropTypes = {
        id: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]),
        name: React.PropTypes.string,
        disabled: React.PropTypes.bool,
        className: React.PropTypes.string
    };

    render() {
        return(
            <div className="selectlist__selectitem">
                {this.props.children}
            </div>
        );
    }
}