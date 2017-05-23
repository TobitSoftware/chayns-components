import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

export default class ChooseButton extends React.Component {

    static propTypes = {
        chooseButton: PropTypes.bool,
        disabled: PropTypes.bool,
        children: PropTypes.string.isRequired,
        onClick: PropTypes.func,
        className: PropTypes.string,
        style: PropTypes.object
    };

    render() {
        const {
            children,
            ...props
        } = this.props;

        return(
            <Button
                chooseButton={true}
                {...props}
            >
                {children}
            </Button>
        );
    }
}