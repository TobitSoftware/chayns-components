import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Icon from '../../../react-chayns-icon/component/Icon';

export default class ChosenMember extends Component {
    static propTypes = {
        removeMember: PropTypes.func.isRequired,
        name: PropTypes.string.isRequired,
        locationId: PropTypes.number,
        personId: PropTypes.string,
        groupId: PropTypes.number,
        siteId: PropTypes.string,
        userId: PropTypes.number,
        fixed: PropTypes.bool
    };

    static defaultProps = {
        locationId: null,
        personId: null,
        groupId: null,
        siteId: null,
        userId: null,
        fixed: false
    };

    remove = () => {
        const {
            removeMember,
            locationId,
            groupId,
            userId,
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
            personId,
            siteId,
            fixed,
            name
        } = this.props;

        // eslint-disable-next-line no-nested-ternary
        const memberId = siteId !== null ? siteId : (personId !== null ? personId : null);
        const memberName = memberId !== null ? `${name} (${memberId})` : name;

        const isDarkMode = chayns.env.site.colorMode === 1;

        const chosenMemberContentClasses = classNames('chosen-member__content', {
            'chayns__background-color--white-2': !isDarkMode,
            'chayns__background-color--dark-2': isDarkMode
        });

        return (
            <div className="chosen-member">
                <div className={chosenMemberContentClasses}>
                    <span className="chosen-member__content__name notranslate">
                        {memberName}
                    </span>
                    {!fixed ? (
                        <Icon
                            className="chayns__color--white-6 chosen-member__content__icon"
                            onClick={this.remove}
                            icon="ts-wrong"
                        />
                    ) : null}
                </div>
            </div>
        );
    }
}
