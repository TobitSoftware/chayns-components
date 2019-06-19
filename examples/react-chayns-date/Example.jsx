/* eslint-disable react/jsx-one-expression-per-line,jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import FancyDate from '../../src/react-chayns-date/component/Date';
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
                <FancyDate date={date}>
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
                </FancyDate>

                <div style={{ fontWeight: 'bold' }}>default:</div>
                <FancyDate date={date} />

                <div style={{ fontWeight: 'bold' }}>showTime:</div>
                <FancyDate date={date} showTime />

                <div style={{ fontWeight: 'bold' }}>showTime=false:</div>
                <FancyDate date={date} showTime={false} />

                <div style={{ fontWeight: 'bold' }}>showDate:</div>
                <FancyDate date={date} showDate />

                <div style={{ fontWeight: 'bold' }}>showDate=false:</div>
                <FancyDate date={date} showDate={false} />

                <div style={{ fontWeight: 'bold' }}>showDate=false showTime:</div>
                <FancyDate date={date} showDate={false} showTime />

                <div style={{ fontWeight: 'bold' }}>showDate showTime=false:</div>
                <FancyDate date={date} showDate showTime={false} />

                <div style={{ fontWeight: 'bold' }}>showDate showTime:</div>
                <FancyDate date={date} showDate showTime />

                <div style={{ fontWeight: 'bold' }}>showDate=false showTime=false:</div>
                <FancyDate date={date} showDate={false} showTime={false} />

                <div style={{ fontWeight: 'bold' }}>writeDay:</div>
                <FancyDate date={date} writeDay />

                <div style={{ fontWeight: 'bold' }}>writeMonth:</div>
                <FancyDate date={date} writeMonth />

                <div style={{ fontWeight: 'bold' }}>writeMonth writeDay:</div>
                <FancyDate date={date} writeMonth writeDay />

                <div style={{ fontWeight: 'bold' }}>writeMonth writeDay showTime showDate:</div>
                <FancyDate date={date} writeMonth writeDay showTime showDate />

                <div style={{ fontWeight: 'bold' }}>writeMonth writeDay showTime showDate=false:</div>
                <FancyDate date={date} writeMonth writeDay showTime showDate={false} />

                <div style={{ fontWeight: 'bold' }}>writeMonth writeDay showTime=false showDate=false:</div>
                <FancyDate date={date} writeMonth writeDay showTime={false} showDate={false} />

                <div style={{ fontWeight: 'bold' }}>writeMonth showTime=false showDate=false:</div>
                <FancyDate date={date} writeMonth showTime={false} showDate={false} />

                <div style={{ fontWeight: 'bold' }}>two dates:</div>
                <FancyDate date={date} date2={new Date()} />

                <div style={{ fontWeight: 'bold' }}>two dates showTime:</div>
                <FancyDate date={date} date2={new Date()} showTime />

                <div style={{ fontWeight: 'bold' }}>two dates showDate:</div>
                <FancyDate date={date} date2={new Date()} showDate />
            </div>
        );
    }
}
