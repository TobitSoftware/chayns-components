import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Icon from '../../../react-chayns-icon/component/Icon';

export default class ChosenMember extends Component {
    remove = () => {
        const { removeMember, locationId, groupId, userId, fixed } = this.props;

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
        const { personId, siteId, fixed, name } = this.props;

        let memberId = null;

        if (siteId !== null) {
            memberId = siteId;
        } else if (personId !== null) {
            memberId = personId;
        }

        const memberName = memberId !== null ? `${name} (${memberId})` : name;

        return (
            <div className="chosen-member">
                <div className="chosen-member__content">
                    <span className="chosen-member__content__name notranslate">
                        {memberName}
                    </span>
                    {!fixed ? (
                        <Icon
                            className="chosen-member__content__icon"
                            onClick={this.remove}
                            icon="ts-wrong"
                        />
                    ) : null}
                </div>
            </div>
        );
    }
}

ChosenMember.propTypes = {
    removeMember: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    locationId: PropTypes.number,
    personId: PropTypes.string,
    groupId: PropTypes.number,
    siteId: PropTypes.string,
    userId: PropTypes.number,
    fixed: PropTypes.bool,
};

ChosenMember.defaultProps = {
    locationId: null,
    personId: null,
    groupId: null,
    siteId: null,
    userId: null,
    fixed: false,
};

ChosenMember.displayName = 'ChosenMember';
