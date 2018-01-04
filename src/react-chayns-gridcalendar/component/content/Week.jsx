/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


export default class Week extends React.Component{

    static defaultProps = {
        data: []
    };

    static propTypes = {
        startTime: PropTypes.objectOf(Date),
        data: PropTypes.array,
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

    static hexToRgb(hex) {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
    }

    constructor(){
        super();
        this.schemeColor = Week.hexToRgb(chayns.getSchemeColor());
    }

    renderDays(){
        let days = [], i = 0;
        for(i; i < this.props.data.length; i++){
            let background = '',
                day=this.props.data[i],
                percentage,
                filled = '',
                start,
                color = this.schemeColor,
                backgroundColor = day.date.getDate() === this.props.focus.getDate() && day.date.getMonth() === this.props.focus.getMonth() && day.date.getFullYear() === this.props.focus.getFullYear()
                    ? `rgba(${this.schemeColor.r},${this.schemeColor.g},${this.schemeColor.b},0.3)`
                    : '';
            let classes = classNames('week_item',{
                'week_item_filled': day && day.id,
                'week_item_focused': day && day.groupId && this.props.groupFocus === day.groupId
            });
            if(day && day.id){
                start = Math.round((new Date(day.startTime).getHours()/24)*100);
                percentage = Math.round((day.endTime-day.startTime)/(24*60*60*1000)*100);
                if(day.color){
                    /**
                     * For correct calculating of the percentage it is required, that the entry is in one day
                     * @type {Date}
                     */
                    color = Week.hexToRgb(day.color);
                }
                background = `linear-gradient(to right, rgba(${color.r},${color.g},${color.b},0.5) ${start}%,rgba(${color.r},${color.g},${color.b},1) ${start+1}%,rgba(${color.r},${color.g},${color.b},1) ${start+percentage}%,rgba(${color.r},${color.g},${color.b},0.5) ${start+percentage+1}%)`
            }

            days.push(
                <div className={classes} style={{background: background, backgroundColor: backgroundColor}} key={i} onClick={(event)=>this.props.onClick(event,day)}>
                </div>
            )
        }
        return days;
    }

    render(){
        let days = this.renderDays();
        return(
            <div className="week" style={{width: `${this.props.weekWidth*0.9}px`, marginRight: `${this.props.weekWidth*0.1}px`}}>
                <div className="week_table">
                    <div className="week_row">
                        {days}
                    </div>
                </div>
            </div>
        );
    }
}