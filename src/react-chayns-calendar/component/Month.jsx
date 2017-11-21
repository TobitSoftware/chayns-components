/* eslint-disable */

import React from 'react';

import MonthTable from './MonthTable';


export default class Month extends React.Component{
    render(){
        let _title = this.props.title ? this.props.title : '';
        return(
            <div className={`month__item ${this.props.className}`}>
                <div className="month__title">
                    {_title}
                </div>
                <MonthTable
                    onDateSelect = {this.props.onDateSelect}
                    startDate={this.props.startDate}
                    endDate={this.props.endDate}
                    selected = {this.props.selected}
                    activated = {this.props.activated}
                    highlighted = {this.props.highlighted}
                    activateAll= {this.props.activateAll}
                />
            </div>
        );
    }
}