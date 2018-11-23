import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from './Icon';

export default class ChosenMember extends Component {
    static propTypes = {
        removeMember: PropTypes.func.isRequired,
        name: PropTypes.string.isRequired,
        locationId: PropTypes.number,
        groupId: PropTypes.number,
        userId: PropTypes.number,
        fixed: PropTypes.bool,
        siteId: PropTypes.string,
        personId: PropTypes.string,
    };

    static defaultProps = {
        locationId: null,
        groupId: null,
        userId: null,
        fixed: false,
        siteId: null,
        personId: null
    };

    remove = () => {
        const {
            locationId,
            userId,
            groupId,
            removeMember,
            fixed
        } = this.props;

        if (!fixed) {
            if (locationId !== null) {
                removeMember(0, locationId);
            } else if (userId !== null) {
                removeMember(1, userId);
            } else {
                removeMember(2, groupId);
            }
        }
    };

    render() {
        const {
            name,
            fixed,
            siteId,
            personId
        } = this.props;

        // eslint-disable-next-line no-nested-ternary
        const memberId = siteId !== null ? siteId : (personId !== null ? personId : null);
        const memberName = memberId !== null ? `${name} (${memberId})` : name;

        const isDarkMode = chayns.env.site.colorMode === 1;

        const chosenMemberContentClasses = classNames('chosen-member__content chayns__background-color--25', {
            'chosen-member__content--dark': isDarkMode
        });

        return (
            <div className="chosen-member">
                <div className={chosenMemberContentClasses}>
                    <span className="chosen-member__content__name notranslate">
                        {memberName}
                    </span>
                    <Icon
                        classes="chayns__color--100"
                        onClick={this.remove}
                        bright={isDarkMode}
                        hidden={fixed}
                        icon="wrong"
                        isTsIcon
                    />
                </div>
            </div>
        );
    }
}
