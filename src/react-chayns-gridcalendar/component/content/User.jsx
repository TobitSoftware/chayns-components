/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Week from './Week';

export default class User extends PureComponent {
    render() {
        const {
            entries, groups, onClick, focus, groupFocus, weekWidth,
        } = this.props;
        return (
            <div className="calendar__content_userEntries">
                {entries.map((e, i) => (
                    <Week
                        data={e}
                        groups={groups}
                        key={e[0].date.getTime() + i}
                        onClick={onClick}
                        focus={focus}
                        groupFocus={groupFocus}
                        weekWidth={weekWidth}
                    />
                ))}
            </div>
        );
    }
}

User.propTypes = {
    entries: PropTypes.arrayOf(PropTypes.array,),
    groups: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        color: PropTypes.string,
    }),),
    onClick: PropTypes.func,
    focus: PropTypes.objectOf(Date),
    groupFocus: PropTypes.number,
    weekWidth: PropTypes.number,
};

User.defaultProps = {
    entries: [],
    groups: [],
    onClick: null,
    focus: null,
    groupFocus: null,
    weekWidth: 0,
};
