/* eslint-disable react/jsx-one-expression-per-line,jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import FancyDate from '../../src/react-chayns-date/component/Date';

export default class DateExample extends Component {
    render() {
        return (
            <div>
                <FancyDate date={new Date('2018-06-18T09:49:17.222Z')} />
                <FancyDate date={new Date('2019-06-14T09:49:17.222Z')} />
                <FancyDate date={new Date()} />
                <FancyDate date={new Date('2019-06-30T20:49:17.222Z')} />
                <FancyDate date={new Date('2020-06-20T09:49:17.222Z')} />
                <FancyDate date={new Date('2019-06-30T20:49:17.222Z')} showTime />
                <FancyDate date={new Date('2019-06-18T09:49:17.222Z')} showTime={false} />
                <FancyDate date={new Date('2019-06-30T20:49:17.222Z')} showDate />
                <FancyDate date={new Date('2019-06-18T09:49:17.222Z')} showDate={false} />
                <FancyDate date={new Date('2019-06-18T09:49:17.222Z')} showDate={false} showTime />
                <FancyDate date={new Date('2019-06-18T09:49:17.222Z')} showDate showTime={false} />
                <FancyDate date={new Date('2019-06-18T09:49:17.222Z')} showDate showTime />
                <FancyDate date={new Date('2019-06-18T09:49:17.222Z')} showDate showTime writeMonth />
            </div>
        );
    }
}
