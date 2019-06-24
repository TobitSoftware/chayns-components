/* eslint-disable react/jsx-one-expression-per-line,jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import DateInfo from '../../src/react-chayns-dateinfo/component/DateInfo';
import Button from '../../src/react-chayns-button/component/Button';

export default class DateExample extends Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }


    render() {
        const { date } = this.state;

        return (
            <div>
                <DateInfo date={date}>
                    <Button
                        onClick={() => {
                            chayns.dialog.advancedDate({ dateType: chayns.dialog.dateType.DATE_TIME }).then((event) => {
                                if (event.buttonType === 1) {
                                    this.setState({ date: new Date(event.selectedDates[0].timestamp * 1000) });
                                }
                            });
                        }}
                    >Choose Date
                    </Button>
                </DateInfo>

                <div style={{ fontWeight: 'bold' }}>default:</div>
                <DateInfo date={date} />

                <div style={{ fontWeight: 'bold' }}>showTime:</div>
                <DateInfo date={date} showTime />

                <div style={{ fontWeight: 'bold' }}>showTime=false:</div>
                <DateInfo date={date} showTime={false} />

                <div style={{ fontWeight: 'bold' }}>showDate:</div>
                <DateInfo date={date} showDate />

                <div style={{ fontWeight: 'bold' }}>showDate=false:</div>
                <DateInfo date={date} showDate={false} />

                <div style={{ fontWeight: 'bold' }}>showDate=false showTime:</div>
                <DateInfo date={date} showDate={false} showTime />

                <div style={{ fontWeight: 'bold' }}>showDate showTime=false:</div>
                <DateInfo date={date} showDate showTime={false} />

                <div style={{ fontWeight: 'bold' }}>showDate showTime:</div>
                <DateInfo date={date} showDate showTime />

                <div style={{ fontWeight: 'bold' }}>showDate=false showTime=false:</div>
                <DateInfo date={date} showDate={false} showTime={false} />

                <div style={{ fontWeight: 'bold' }}>writeDay:</div>
                <DateInfo date={date} writeDay />

                <div style={{ fontWeight: 'bold' }}>writeMonth:</div>
                <DateInfo date={date} writeMonth />

                <div style={{ fontWeight: 'bold' }}>writeMonth writeDay:</div>
                <DateInfo date={date} writeMonth writeDay />

                <div style={{ fontWeight: 'bold' }}>writeMonth writeDay showTime showDate:</div>
                <DateInfo date={date} writeMonth writeDay showTime showDate />

                <div style={{ fontWeight: 'bold' }}>writeMonth writeDay showTime showDate=false:</div>
                <DateInfo date={date} writeMonth writeDay showTime showDate={false} />

                <div style={{ fontWeight: 'bold' }}>writeMonth writeDay showTime=false showDate=false:</div>
                <DateInfo date={date} writeMonth writeDay showTime={false} showDate={false} />

                <div style={{ fontWeight: 'bold' }}>writeMonth showTime=false showDate=false:</div>
                <DateInfo date={date} writeMonth showTime={false} showDate={false} />

                <div style={{ fontWeight: 'bold' }}>two dates:</div>
                <DateInfo date={date} date2={new Date()} />

                <div style={{ fontWeight: 'bold' }}>two dates showTime:</div>
                <DateInfo date={date} date2={new Date()} showTime />

                <div style={{ fontWeight: 'bold' }}>two dates showDate:</div>
                <DateInfo date={date} date2={new Date()} showDate />
            </div>
        );
    }
}
