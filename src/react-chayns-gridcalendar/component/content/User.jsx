import React from 'react';
import Week from './Week';


const WEEK_WIDTH =  11.5 * (window.innerWidth>450? 1 : 2);

export default class User extends React.Component{

    static defaultProps = {
        entries: []
    };

    static propTypes = {
        entries: React.PropTypes.arrayOf(
            React.PropTypes.array
        ),
        groups: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                id: React.PropTypes.number,
                name: React.PropTypes.string,
                color: React.PropTypes.string
            })
        ),
        onClick: React.PropTypes.func,
        focus: React.PropTypes.objectOf(Date),
        groupFocus: React.PropTypes.number
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