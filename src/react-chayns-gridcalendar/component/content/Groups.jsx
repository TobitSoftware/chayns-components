import React from 'react';
import classNames from 'classnames';

export default class Groups extends React.Component{

    static propTypes = {
        groups: React.PropTypes.array,
        onClick: React.PropTypes.func,
        focus: React.PropTypes.number
    };

    constructor(){
        super();
    }
    render(){
        return(
            <div className="calendar__groups">
                {
                    this.props.groups.map((group)=>{
                        let className = classNames('calendar__groups_item',{
                            'calendar__groups_notFocused': this.props.focus && group.id!=this.props.focus
                        });
                        return (
                            <div className={className} key={group.id} onClick={(event)=>this.props.onClick(event,group)}>
                                <div className="calendar__groups_color" style={{backgroundColor: group.color ? group.color : chayns.getSchemeColor()}}></div>
                                {group.name}
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}