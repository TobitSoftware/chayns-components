import React from 'react';
import Button from './Button';

export default class ChooseButton extends React.Component {

    static propTypes = {
        chooseButton: React.PropTypes.bool,
        disabled: React.PropTypes.bool,
        children: React.PropTypes.string.isRequired,
        onClick: React.PropTypes.func,
        className: React.PropTypes.string,
        style: React.PropTypes.object
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