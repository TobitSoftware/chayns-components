/* eslint-disable */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Month from './Month';


const TODAY = new Date(),
    TRANSITION_TIME = 300;


export default class Calendar extends Component {

    static defaultProps = {
        selected: TODAY,
        activateAll: true
    };

    static propTypes = {
        startDate: PropTypes.instanceOf(Date).isRequired,
        endDate: PropTypes.instanceOf(Date).isRequired,
        onDateSelect: PropTypes.func.isRequired,
        selected: PropTypes.instanceOf(Date),
        activated: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
        highlighted: PropTypes.oneOfType([
            PropTypes.shape({
                dates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
                color: PropTypes.string
            }),
            PropTypes.arrayOf(PropTypes.shape({
                dates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
                color: PropTypes.string
            }))
        ]),
        activateAll: PropTypes.bool,
    };

    constructor() {
        super();
        this.state = {
            focus: new Date(),
            animationKey: 0.05,
            months: [],
            animation: ''
        };
        this.MONTH_NAMES = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];
    }

    componentWillMount() {
        let _focus = this.props.selected; //TODO: SELECETED SHOULD NOT BE OUTSIDE THE START AND END TIME. ADDITIONALLY SELECTED SHOULD BE THE FIRST DATE IN TIME CONTEXT, NOT THE FIRST DATE OF THE LIST
        _focus.setMilliseconds(0);
        _focus.setSeconds(0);
        _focus.setMinutes(0);
        _focus.setHours(0);
        this.setMonths(_focus);
    }

    setMonths(_focus){
        let _leftHidden = new Date(_focus.getFullYear(),_focus.getMonth()-1,1);
        let _rightShown = new Date(_focus.getFullYear(),_focus.getMonth()+1,1);
        let _rightHidden = new Date(_focus.getFullYear(),_focus.getMonth()+2,1);
        this.setState({
            focus: _focus,
            months: [
                {
                    title: this.MONTH_NAMES[_leftHidden.getMonth()],
                    className: "left__hidden month",
                    startDate: _leftHidden,
                    endDate: new Date(_leftHidden.getFullYear(), _leftHidden.getMonth() + 1, 0)
                },
                {
                    title: this.MONTH_NAMES[_focus.getMonth()],
                    className: "left__shown month",
                    startDate: new Date(_focus.getFullYear(), _focus.getMonth(), 1),
                    endDate: new Date(_focus.getFullYear(), _focus.getMonth() + 1, 0)
                },
                {
                    title: this.MONTH_NAMES[_rightShown.getMonth()],
                    className: "right__shown month",
                    startDate: _rightShown,
                    endDate: new Date(_rightShown.getFullYear(), _rightShown.getMonth() + 1, 0)
                },
                {
                    title: this.MONTH_NAMES[_rightHidden.getMonth()],
                    className: "right__hidden month",
                    startDate: _rightHidden,
                    endDate: new Date(_rightHidden.getFullYear(), _rightHidden.getMonth() + 1, 0)
                }]
        });
    }

    getNavigateLeft(){
        return (this.props.activateAll && !this.props.startDate ||  (this.props.startDate && (this.props.startDate.getYear() < this.state.focus.getYear() || (this.props.startDate.getYear() === this.state.focus.getYear() && this.props.startDate.getMonth()<this.state.focus.getMonth()))))
    }

    getNavigateRight(){
        let FOCUS_FACTOR = window.screen.width<450 ? 0 : 1;
        return (this.props.activateAll && !this.props.endDate || (this.props.endDate && (this.props.endDate.getYear() > this.state.focus.getYear() || (this.props.endDate.getYear() === this.state.focus.getYear() && this.props.endDate.getMonth()-FOCUS_FACTOR>this.state.focus.getMonth()))))
    }

    navigateRightOnClick(){
        if(this.getNavigateRight()){
            let _focus = new Date(this.state.focus.getFullYear(), this.state.focus.getMonth()+1, 1);
            this.setMonths(_focus);
            this.setState({
                animationKey: this.state.animationKey+1,
                animation: 'right'
            });
        }
    }

    navigateLeftOnClick(){

        if(this.getNavigateLeft()){
            let _focus = new Date(this.state.focus.getFullYear(), this.state.focus.getMonth()-1, 1);
            this.setMonths(_focus);
            this.setState({
                animationKey: this.state.animationKey+1,
                animation: 'left'
            });
        }
    }

    /*
     TODO: DER KALENDAR MUSS SICH MIT POSITION VON HANDLE TOUCH MOVE BEWEGEN
     */

    handleTouchStart(event){
        this.swipeX = event.touches[0].clientX;
    }

    handleTouchMove(event){
        //console.log('ELEMENT',this.calendarMonths.offsetWidth);
        //this.move = -1*(this.swipeX-event.touches[0].clientX);
        //this.calendarMonths.style.transform= `translateX(${-1*(this.swipeX-event.touches[0].clientX)}px)`;

        this.moveSwipeX = event.touches[0].clientX;
    }

    handleTouchEnd(){
        if(this.swipeX && this.moveSwipeX){
            if(this.moveSwipeX>=this.swipeX+60){
                this.navigateLeftOnClick();
                this.swipeX=null;
                this.moveSwipeX=null;
                //this.move=null;
            }else if(this.moveSwipeX<=this.swipeX-60){
                this.navigateRightOnClick();
                this.swipeX=null;
                this.moveSwipeX=null;
            }
        }
    }

    renderMonths(){
        /**
         * TODO
         *
         * Hier müssen die Monate gerendert werden. Für jeden Monat sollten an dieser Stelle alle Tage in ein Array gespeichert werden.
         * Das ersparrt der 'MonthTable'-Komponente noch einmal über sämtliche Einträge eines Monats zu gehen um die aktive/highlighted/etc Tage
         * zu finden
         *
         * @type {null}
         * @private
         */
        let _startDate = this.props.startDate ? this.props.startDate : null,
            _activated = this.props.activated && this.props.activated.length > 0 ? this.props.activated : null,
            _highlighted = this.props.highlighted ? this.props.highlighted : null;
        return this.state.months.map((month, index)=> {
            let activated = [],
                _selected;
            let tempDates = [];
            let tempHighlighted = [];
            let tempObj = [];

            if (month.startDate.getYear() === this.props.selected.getYear() && month.startDate.getMonth() === this.props.selected.getMonth()) {
                _selected = this.props.selected;
            }

            for (var i = 0; _activated && i < _activated.length; i++) {
                if (month.startDate.getYear() === _activated[i].getYear() && month.startDate.getMonth() === _activated[i].getMonth()) {
                    if (_startDate) {

                        if ((_startDate.getYear() < _activated[i].getYear() ||
                            _startDate.getYear() === _activated[i].getYear() && _startDate.getMonth() < _activated[i].getMonth()) ||
                            (_startDate.getMonth() === _activated[i].getMonth() && _startDate.getDate() <= _activated[i].getDate())
                        ) {
                            activated.push(_activated[i]);
                        }
                    } else {
                        activated.push(_activated[i]);
                    }
                }
            }

            if(this.props.activateAll){
                if (_highlighted instanceof Array) {
                    for (let j = 0; j < _highlighted.length; j++) {
                        let dates = [];
                        for (let k = 0; k < _highlighted[j].dates.length; k++) {
                            if (_highlighted[j].dates[k].getTime() >= month.startDate && _highlighted[j].dates[k].getTime() <= month.endDate) {
                                dates.push(_highlighted[j].dates[k]);
                            }
                        }

                        if (dates.length > 0) {
                            tempObj.push({dates: dates, color: _highlighted[j].color});
                        }
                    }
                }else{
                    //TODO
                }
            }else {
                if(activated){
                    for (let i = 0; i < activated.length; i++) {
                        if (_highlighted instanceof Array) {
                            for (let j = 0; j < _highlighted.length; j++) {
                                let dates = [];
                                for (let k = 0; k < _highlighted[j].dates.length; k++) {
                                    if (_highlighted[j].dates[k].getYear() === activated[i].getYear() && _highlighted[j].dates[k].getMonth() === activated[i].getMonth() && _highlighted[j].dates[k].getDate() === activated[i].getDate()) {
                                        dates.push(_highlighted[j].dates[k]);
                                    }
                                }
                                if (dates.length > 0) {
                                    tempObj.push({dates: dates, color: _highlighted[j].color});
                                }
                            }
                        } else {
                            if (_highlighted && _highlighted.dates) {
                                for (let j = 0; _highlighted.dates.length < j; j++) {
                                    if (_highlighted.dates[j].getYear() === activated[i].getYear() && _highlighted.dates[j].getMonth() === activated[i].getMonth() && _highlighted.dates[j].getDate() === activated[i].getDate()) {
                                        tempDates.push(_highlighted.dates[j]);
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if(tempDates.length>0) {
                tempHighlighted = {dates: tempDates, color: _highlighted.color};
            }
            if(tempObj.length>0){
                tempHighlighted = tempObj;
            }

            return (
                <CSSTransition
                    classNames={this.state.animation}
                    timeout={{
                        enter: TRANSITION_TIME,
                    }}
                    appear
                    exit={false}
                    key={month.startDate.getTime() * (index + 1)}
                >
                    <Month
                        onDateSelect={this.props.onDateSelect}
                        title={month.title}
                        className={month.className}
                        startDate={month.startDate}
                        endDate={month.endDate}
                        selected={_selected}
                        activated={activated}
                        highlighted={tempHighlighted}
                        activateAll={this.props.activateAll}
                        key={month.startDate.getTime() * (index + 1)}
                    />
                </CSSTransition>
            )
        })
    }

    render() {
        let _navigateLeft = !(this.getNavigateLeft());
        let _navigateRight = !(this.getNavigateRight());

        let _months = this.renderMonths();
        return (
            <div className="buffer" onTouchMove={this.handleTouchMove.bind(this)} onTouchStart={this.handleTouchStart.bind(this)} onTouchEnd={this.handleTouchEnd.bind(this)}>
                <div className="absolute">
                    <div className="calendar__navigation">
                        <div onClick={this.navigateLeftOnClick.bind(this)} className="calendar__navigate left" hidden={_navigateLeft}>
                            <i className="fa fa-chevron-left"/>
                        </div>
                        <div onClick={this.navigateRightOnClick.bind(this)} className="calendar__navigate right" hidden={_navigateRight}>
                            <i className="fa fa-chevron-right"/>
                        </div>
                    </div>
                </div>
                <div className="calendar__months">
                    <TransitionGroup
                    >
                        {_months}
                    </TransitionGroup>
                </div>
            </div>
        )
    }
}
