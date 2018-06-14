import React from 'react';
import PropTypes from 'prop-types';


export default class SelectItem extends React.Component {
    static componentName = 'SelectItem';

    static propTypes = {
        id: PropTypes.oneOfType([ // eslint-disable-line react/no-unused-prop-types
            PropTypes.string,
            PropTypes.number
        ]),
        name: PropTypes.oneOfType([ // eslint-disable-line react/no-unused-prop-types
            PropTypes.string,
            PropTypes.node,
            PropTypes.arrayOf(PropTypes.node),
        ]),
        value: PropTypes.oneOfType([ // eslint-disable-line react/no-unused-prop-types
            PropTypes.object,
            PropTypes.array,
        ]),
        disabled: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
        className: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
        children: PropTypes.node,
    };

    static defaultProps = {
        id: null,
        name: null,
        value: null,
        disabled: null,
        className: null,
        children: null,
    };

    render() {
        return(
            <div className="selectlist__selectitem">
                {this.props.children}
            </div>
        );
    }
}
