import React from 'react';
import PropTypes from 'prop-types';


export default class SetupItem extends React.Component{

    static propTypes = {
        title: PropTypes.string,
        children: PropTypes.element
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