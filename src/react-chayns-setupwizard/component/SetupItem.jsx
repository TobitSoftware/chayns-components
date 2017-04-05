import React from 'react';

export default class SetupItem extends React.Component{

    static propTypes = {
        title: React.PropTypes.string,
        children: React.PropTypes.element
    };

    constructor(){
        super();
    }

    render(){
        return(
            this.props.children
        );
    }
}