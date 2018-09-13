import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class PersonFinder extends Component {
    static propTypes = {
        className: PropTypes.string,
        placeholder: PropTypes.string,
        defaultValue: PropTypes.string,
        onChange: PropTypes.func
    };

    static defaultProps = {
        className: null,
        placeholder: '',
        defaultValue: null,
        onChange: null
    };

    render() {
        const { className, ...props } = this.props;

        const classNames = classnames('input', className);

        return (
            <input
                type="text"
                className={classNames}
                ref={(ref) => { this.ref = ref; }}
                {...props}
            />
        );
    }
}
