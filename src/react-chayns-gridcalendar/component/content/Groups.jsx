import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class Groups extends PureComponent {
    render() {
        const { groups, focus, onClick } = this.props;

        return (
            <div className="calendar__groups">
                {
                    groups.map((group) => {
                        const className = classNames('calendar__groups_item', {
                            calendar__groups_notFocused: focus && group.id !== focus,
                        });
                        return (
                            <div className={className} key={group.id} onClick={(event) => onClick(event, group)}>
                                <div
                                    className="calendar__groups_color"
                                    style={{ backgroundColor: group.color ? group.color : chayns.env.site.color }}
                                />
                                {group.name}
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

Groups.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    groups: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    focus: PropTypes.number.isRequired,
};
