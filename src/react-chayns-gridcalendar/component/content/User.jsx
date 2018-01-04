/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';

import Week from './Week';


const WEEK_WIDTH =  11.5 * (window.innerWidth>450? 1 : 2);

export default class User extends React.Component{

    static defaultProps = {
        entries: []
    };

    static propTypes = {
        entries: PropTypes.arrayOf(
            PropTypes.array
        ),
        groups: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string,
                color: PropTypes.string
            })
        ),
        onClick: PropTypes.func,
        focus: PropTypes.objectOf(Date),
        groupFocus: PropTypes.number
    };

    constructor(){
        super();
    }
    render(){
        return(
            <div className="calendar__content_userEntries" >
                {this.props.entries.map((entries,i)=>{
                    return (
                        <Week
                            data={entries}
                            groups={this.props.groups}
                            key={entries[0].date.getTime()+i}
                            onClick={this.props.onClick}
                            focus={this.props.focus}
                            groupFocus={this.props.groupFocus}
                            weekWidth = {this.props.weekWidth}
                        />
                    )
                })}
            </div>
        );
    }
}