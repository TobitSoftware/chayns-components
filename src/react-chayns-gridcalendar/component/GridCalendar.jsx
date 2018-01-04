/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';

import Navigator from './content/Navigator';
import User from './content/User';
import Groups from './content/Groups'


const WEEK_WIDTH = 50 ;

let transformLeft = 0,
    transformRight = 0,
    focusWeek,
    isDesktop = window.innerWidth>450;

export default class ProgressCalendar extends React.Component{

    static defaultProps = {
        columns: {
            names: ['Mo.','Di.','Mi.','Do.','Fr.','Sa.','So.'],
            highlightedColor: chayns.getSchemeColor(),
        },
        groups: [],
        focus: new Date(),
        onNavigateRight: ()=>{},
        onNavigateLeft: ()=>{}
    };

    static propTypes = {
        data: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string,
                entries: PropTypes.arrayOf(
                    PropTypes.shape({
                        id: PropTypes.number,
                        groupId: PropTypes.number,
                        startTime: PropTypes.number,
                        endTime: PropTypes.number
                    })
                )
            })
        ),
        columns: PropTypes.shape({
            names: PropTypes.arrayOf(PropTypes.string),
            highlightedColor: PropTypes.string
        }),
        groups: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string,
                color: PropTypes.string
            })
        ),
        onClick: PropTypes.func.isRequired,
        onNavigateLeft: PropTypes.func,
        onNavigateRight: PropTypes.func,
        focus: PropTypes.objectOf(Date),
        startTime: PropTypes.objectOf(Date).isRequired,
        endTime: PropTypes.objectOf(Date).isRequired
    };

    static dateInterval(dateStart,dateEnd){
        let startDate = dateStart.getDate() < 10 ? '0' +  dateStart.getDate() :  dateStart.getDate(),
            startMonth = ( dateStart.getMonth() + 1) < 10 ? '0' + ( dateStart.getMonth() + 1) : ( dateStart.getMonth() + 1),
            endDate = dateEnd.getDate() < 10 ? '0' +  dateEnd.getDate() :  dateEnd.getDate(),
            endMonth = ( dateEnd.getMonth() + 1) < 10 ? '0' + ( dateEnd.getMonth() + 1) : ( dateEnd.getMonth() + 1);
        return (`${startDate}.${startMonth} - ${endDate}.${endMonth}.${dateEnd.getFullYear()}`);
    }

    static getWeek(currentStart){
        let monday, sunday;
        if (currentStart.getDay() === 0) {
            monday = new Date(currentStart.getFullYear(), currentStart.getMonth(), currentStart.getDate() - 6);
            sunday = new Date(currentStart.getFullYear(), currentStart.getMonth(), currentStart.getDate(), 23, 59);
        } else {
            monday = new Date(currentStart.getFullYear(), currentStart.getMonth(), currentStart.getDate() - (currentStart.getDay() - 1));
            sunday = new Date(currentStart.getFullYear(), currentStart.getMonth(), currentStart.getDate() + (7 - currentStart.getDay()), 23, 59);
        }
        return [monday,sunday]
    }

    static sortEntries(entries){
        if(entries) {
            let temp = entries;
            for (let j = 1; j < temp.length; j++) {
                let entry = temp[j];
                let i = j - 1;
                while (i >= 0 && entry.startTime < temp[i].startTime) {
                    temp[i + 1] = temp[i];
                    i = i - 1;
                }
                temp[i + 1] = entry;
            }
            return temp;
        }
    }

    static realDay(day){
        if(day.getDay()===0){
            return 6;
        }else{
            return day.getDay()-1;
        }
    }

    constructor(){
        super();

        this.state = {
            week: 0,
            focusGroup: null,
            isDesktop: window.innerWidth>450
        };

        this.onNavigateLeft = this.onNavigateLeft.bind(this);
        this.onNavigateRight = this.onNavigateRight.bind(this);
        this.onClick = this.onClick.bind(this);
        this.groupOnClick = this.groupOnClick.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);

        window.addEventListener('orientationchange', (event)=>{
            isDesktop =  screen.availWidth>450;
            this.forceUpdate();}
        );
    }

    componentWillMount(){
        this.entries = this.getEntries();
    }

    componentDidMount(){
        this.setState({
            contentWidth: this.content.clientWidth
        })
    }

    componentDidUpdate(){
        if(this.state.contentWidth != this.content.clientWidth){
            this.setState({
                contentWidth: this.content.clientWidth
            })
        }
    }

    shouldComponentUpdate(nextProps){
        for(let i in nextProps.data){
            if(nextProps.data.length!=this.props.data.length){
                this.entries = this.getEntries(nextProps.data,nextProps.startTime,nextProps.endTime);
                return true
            }else{
                if(nextProps.data[i].entries.length != this.props.data[i].entries.length){
                    this.entries = this.getEntries(nextProps.data,nextProps.startTime,nextProps.endTime);
                    return true;
                }
            }
        }
        if(nextProps.columns.length != this.props.columns.length
            || nextProps.groups.length != this.props.groups.length
            || nextProps.startTime.getTime() != this.props.startTime.getTime()
            || nextProps.endTime.getTime() != this.props.endTime.getTime()){
            this.entries = this.getEntries(nextProps.data,nextProps.startTime,nextProps.endTime);
            return true;
        }else if(nextProps.focus != this.props.focus){
            return true;
        }
        return true;
    }

    onNavigateLeft(){
        this.props.onNavigateLeft(this.weeks[focusWeek+(this.state.week-1)]);
        this.setState({
            week: this.state.week-1
        });
        transformLeft++;
    }

    onNavigateRight(){
        let factor = isDesktop ? 2 : 1;
        let retval = this.weeks[focusWeek+(this.state.week+factor)] ? this.weeks[focusWeek+(this.state.week+factor)] : [];
        this.props.onNavigateRight(retval);
        this.setState({
            week: this.state.week+1
        });
        transformRight++;
    }

    onClick(event, entry){
        this.props.onClick({event:event,selected:entry});
        let dateTime = entry.date.getTime(), weekEnd= this.weeks[focusWeek+this.state.week][1], buffer = 0;
        if(weekEnd<dateTime){
            buffer = 1
        }
        for(let i in this.weeks) {
            if (this.weeks[i][0] <= entry.date.getTime() && this.weeks[i][1] >= entry.date.getTime()) {
                focusWeek = i-buffer;
                break;
            }
        }
        this.setState({
            focusGroup: null,
            week: 0
        });
    }

    groupOnClick(event, group){
        if(this.state.focusGroup === group.id){
            this.setState({
                focusGroup: null
            })
        }else{
            this.setState({
                focusGroup: group.id
            })
        }
    }

    handleTouchStart(event){
        this.swipeX = event.touches[0].clientX;
    }

    handleTouchMove(event){
        //console.log('ELEMENT',this.calendarMonths.offsetWidth);
        //this.move = -1*(this.swipeX-event.touches[0].clientX);
        //this.calendarMonths.style.transform= `translateX(${-1*(this.swipeX-event.touches[0].clientX)}%)`;

        this.moveSwipeX = event.touches[0].clientX;
    }

    handleTouchEnd(leftHidden,rightHidden){
        if(this.swipeX && this.moveSwipeX){
            if(this.moveSwipeX>=this.swipeX+60){
                if(!leftHidden) {
                    this.onNavigateLeft();
                }
                this.swipeX=null;
                this.moveSwipeX=null;
                //this.move=null;
            }else if(this.moveSwipeX<=this.swipeX-60){
                if(!rightHidden){
                    this.onNavigateRight();
                }
                this.swipeX=null;
                this.moveSwipeX=null;
            }
        }
    }

    getWeeks(startTime,endTime){
        let retval = [], currentStart = startTime;
        while(currentStart.getTime()<endTime.getTime()) {
            let [monday,sunday] = ProgressCalendar.getWeek(currentStart),
                mondayTS = monday.getTime(),
                sundayTS = sunday.getTime();
            if(this.props.focus.getTime() >= mondayTS && this.props.focus.getTime() <= sundayTS){
                focusWeek = retval.length;
            }
            retval.push([mondayTS, sundayTS]);
            currentStart= new Date(currentStart.getFullYear(),currentStart.getMonth(),currentStart.getDate()+7);
        }
       /* if(retval.length === focusWeek){
            let lastMonday = new Date(retval[retval.length-1][0]), lastSunday = new Date(retval[retval.length-1][1]);
            lastMonday.setDate(lastMonday.getDate()+7);
            lastSunday.setDate(lastSunday.getDate()+7);
            retval.push([lastMonday.getTime(), lastSunday.getTime()]);
        }*/
        this.weeks = retval;
        return retval;
    }

    getNavigatorDays(weekStart,weekEnd){
        let temp = [],
            i = 0,
            date = new Date(weekStart),
            [nextWeekStart,nextWeekEnd] = ProgressCalendar.getWeek(new Date(date.getFullYear(),date.getMonth(),date.getDate()+7)),
            weekDay = ProgressCalendar.realDay(this.props.focus);
        for(i;i< (isDesktop ? 2 : 1) ;i++) {
            let days = [],
                j = 0;
            for (j in this.props.columns.names) {
                if(i===0) {
                    days.push({
                        name: this.props.columns.names[j],
                        date: new Date(weekStart.getFullYear(),weekStart.getMonth(),weekStart.getDate()+parseInt(j))
                    })
                }else if(i===1){
                    days.push({
                        name: this.props.columns.names[j],
                        date: new Date(nextWeekStart.getFullYear(),nextWeekStart.getMonth(),nextWeekStart.getDate()+parseInt(j))
                    })
                }
            }
            temp.push(days);
        }
        if(this.props.focus.getTime()>=weekStart && this.props.focus.getTime()<=weekEnd){
                temp[0][weekDay].selected = true;
            }else if(temp[1]&& this.props.focus.getTime()>=nextWeekStart.getTime() && this.props.focus.getTime()<=nextWeekEnd.getTime()){
                temp[1][weekDay].selected = true;
            }
        return temp;
    }

    getEntries(data,startTime,endTime){
        data = data ? data : this.props.data;
        startTime = startTime ? startTime : this.props.startTime;
        endTime = endTime ? endTime : this.props.endTime;

        let convertedEntries = [],
            weeks = this.getWeeks(startTime, endTime),
            i;
        for (i in data) {
            let entries = ProgressCalendar.sortEntries(data[i].entries),
                userEntries = [],
                kIndex = 0,
                j;
            if(entries) {
                for (j in weeks) {
                    let m = 0,
                        weekEntries = [];
                    for (m; m < 7; m++) {
                        let retval = {},
                            k,
                            startTime = new Date(weeks[j][0] + m * 24 * 60 * 60 * 1000),
                            endTime = new Date(startTime.getTime() + (23 * 60 * 60 * 1000 + 59 * 60 * 1000));

                        startTime = startTime.getTime();
                        endTime = endTime.getTime();
                        /*console.log('######################');
                         console.log('DAY: ');
                         console.log('Start: ', new Date(startTime), 'Offset: ', new Date(startTime).getTimezoneOffset());
                         console.log('End: ', new Date(endTime));*/
                        for (k = kIndex; k < entries.length; k++) {
                            /**
                             * Only possible for entries, which are not longer than a day
                             */
                            /*if(k>4) {
                             console.log('--------------------------------------');
                             console.log('ENTRY-START: ', new Date(entries[k].startTime), 'ENTRY-END: ', new Date(entries[k].endTime));
                             console.log('--------------------------------------');
                             }*/
                            if (entries[k].startTime >= startTime && entries[k].endTime <= endTime) {
                                let l;
                                if (this.props.groups.length > 0) {
                                    let isGrouped = false;
                                    for (l in this.props.groups) {
                                        if (entries[k].groupId === this.props.groups[l].id) {
                                            retval = entries[k];
                                            retval.color = this.props.groups[l].color;
                                            isGrouped = true;
                                            break;
                                        }
                                    }
                                    if (!isGrouped) {
                                        retval = entries[k];
                                    }
                                } else {
                                    retval = entries[k];
                                }
                                retval.date = new Date(startTime);
                                retval.user = {id: data[i].id, name: data[i].name};
                                kIndex = k + 1;
                            } else if (entries[k].endTime > endTime) {
                                break;
                            }
                        }
                        //console.log('######################');
                        weekEntries.push(retval.user ? retval : {
                                date: new Date(startTime),
                                user: {id: data[i].id, name: data[i].name}
                            });
                    }
                    userEntries.push(weekEntries)
                }
            }
            convertedEntries.push({entries: userEntries, userId: data[i].id});
        }
        return convertedEntries;
    }

    renderUser(){
        if(this.content && this.props.data) {
            return (
                <div className="calendar__content_groups">
                    {
                        this.props.data.map((user) => {
                            return (
                                <div className="calendar__user ellipsis" key={user.id}>
                                    {user.name}
                                </div>
                            )
                        })
                    }
                </div>
            )
        }else{
            return '';
        }
    }

    renderEntries(){
        /**
         * TODO: PROBLEM WITH REF. REF GOT OLD WIDTH
         */
        let focus = this.props.focus, wrapperWidth = this.weeks.length*WEEK_WIDTH*(isDesktop ? 1 : 2),
            weekWidth = this.content ? this.state.contentWidth/2*(isDesktop  ? 1 : 2) : 0;

        let content =  this.content ? this.entries.map((entries) => {
                            return (
                                <User
                                    entries={entries.entries}
                                    groups={this.props.groups}
                                    key={entries.userId}
                                    onClick={this.onClick}
                                    focus={focus}
                                    groupFocus={this.state.focusGroup}
                                    weekWidth={weekWidth}
                                />
                            )
                        }): '';

        return (
            <div className="calendar__content_weeks" ref={content => this.content = content}>
                <div className="calendar__content_wrapper" style={{
                    width: `${wrapperWidth}%`,
                    transform: `translateX(${ -1 * (focusWeek + this.state.week) * weekWidth}px)`
                }}>
                    {
                        content
                    }
                </div>
            </div>
        )
    }

    render(){
        let navText = '', [weekStart, weekEnd] = [new Date(),new Date()], days;
        if(this.weeks) {
            [weekStart, weekEnd] = this.weeks[focusWeek+this.state.week];
            weekStart = new Date(weekStart);
            weekEnd = new Date(weekEnd);
            if (isDesktop) {
                let start = weekStart,
                    end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 13);
                navText = `${ProgressCalendar.dateInterval(start, end)}`
            } else {
                let start = weekStart,
                    end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 6);
                navText = `${ProgressCalendar.dateInterval(start, end)}`
            }
            days = this.getNavigatorDays(weekStart, weekEnd);
        }

        let leftHidden = weekStart.getTime()<=this.props.startTime,
            rightHidden = isDesktop ? new Date(weekEnd.getFullYear(),weekEnd.getMonth(),weekEnd.getDate()+7).getTime()>=this.props.endTime : weekEnd.getTime()>=this.props.endTime;


        return(
            <div className="calendar">
                <div className="calendar_header" onTouchMove={this.handleTouchMove} onTouchStart={this.handleTouchStart} onTouchEnd={()=>this.handleTouchEnd(leftHidden, rightHidden)}>
                    <Navigator
                        text={navText}
                        onClick={{
                            left: this.onNavigateLeft,
                            right: this.onNavigateRight,
                            day: this.onClick
                        }}
                        hidden={{
                            left: leftHidden,
                            right: rightHidden
                        }}
                        days={days}
                    />
                </div>
                <div className="calendar__content" onTouchMove={this.handleTouchMove} onTouchStart={this.handleTouchStart} onTouchEnd={()=>this.handleTouchEnd(leftHidden, rightHidden)}>
                    {this.renderUser()}
                    {this.renderEntries()}
                </div>
                <Groups
                    groups={this.props.groups}
                    onClick={this.groupOnClick}
                    focus={this.state.focusGroup}
                />
            </div>
        );
    }
}

