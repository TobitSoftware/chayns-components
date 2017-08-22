import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

export default class ChooseButton extends React.Component {

    static propTypes = {
        children: PropTypes.node.isRequired,
        disabled: PropTypes.bool,
        onClick: PropTypes.func,
        className: PropTypes.string,
        style: PropTypes.object
    };

    static defaultProps = {
        style: null,
        className: null,
        onClick: null,
        disabled: false,
    };

    render() {
        const {
            children,
            ...props
        } = this.props;

        return(
            <Button
                chooseButton
                {...props}
            >
                {children}
            </Button>
        );
    }
}
