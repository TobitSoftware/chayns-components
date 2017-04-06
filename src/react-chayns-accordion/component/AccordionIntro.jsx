import React from 'react';

export default class AccordionIntro extends React.Component {
    render() {
        if(this.props.content)
        return(
            <div className="accordion__intro">
                {this.props.content}
            </div>
        );


        return null;
    }
}