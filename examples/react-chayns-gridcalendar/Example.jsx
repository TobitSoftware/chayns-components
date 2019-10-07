import React, { Component } from 'react';

import { GridCalendar } from '../../src/index';
import Accordion from '../../src/react-chayns-accordion/component/Accordion';

export default class GridCalendarExample extends Component {
    constructor() {
        super();
        this.state = {
            date: new Date(),
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick(data) {
        if (data.selected) {
            this.setState({
                date: data.selected.date,
            });
        }
    }

    render() {
        const { date } = this.state;
        const TODAY = new Date();

        return [
            <Accordion head="Grid calendar" style={{ marginBottom: '20px' }}>
                <div className="accordion__content">
                    <GridCalendar
                        onClick={this.onClick}
                        startTime={new Date(TODAY.getFullYear(), TODAY.getMonth() - 1, TODAY.getDate())}
                        endTime={new Date(TODAY.getFullYear(), TODAY.getMonth() + 1, TODAY.getDate())}
                        focus={date}
                        data={[{
                            id: 0,
                            name: chayns.env.user.name ? chayns.env.user.name : 'chayns',
                            entries: [{
                                id: 0,
                                groupId: 1,
                                startTime: new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() + 1, 12).getTime(),
                                endTime: new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() + 1, 23, 59).getTime(),
                            }],
                        }]}
                        columns={{
                            names: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
                            highlightedColor: chayns.env.site.color,
                        }}
                        groups={[{
                            id: 1,
                            name: 'Important day',
                            color: 'red',
                        }]}
                        onNavigateLeft={() => console.log('LEFT')}
                        onNavigateRight={() => console.log('RIGHT')}
                    />
                </div>
            </Accordion>,
            <GridCalendar
                onClick={this.onClick}
                startTime={new Date(TODAY.getFullYear(), TODAY.getMonth() - 1, TODAY.getDate())}
                endTime={new Date(TODAY.getFullYear(), TODAY.getMonth() + 1, TODAY.getDate())}
                focus={date}
                data={[{
                    id: 0,
                    name: chayns.env.user.name ? chayns.env.user.name : 'chayns',
                    entries: [{
                        id: 0,
                        groupId: 1,
                        startTime: new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() + 1, 12).getTime(),
                        endTime: new Date(TODAY.getFullYear(), TODAY.getMonth(), TODAY.getDate() + 1, 23, 59).getTime(),
                    }],
                }]}
                columns={{
                    names: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
                    highlightedColor: chayns.env.site.color,
                }}
                groups={[{
                    id: 1,
                    name: 'Important day',
                    color: 'red',
                }]}
                onNavigateLeft={() => console.log('LEFT')}
                onNavigateRight={() => console.log('RIGHT')}
            />,
        ];
    }
}
