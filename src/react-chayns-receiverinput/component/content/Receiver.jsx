/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import isEqual from 'lodash.isequal';
import PropTypes from 'prop-types';

import { getGroupImage, handleImageError } from '../../utils/image';
import { getTextstring } from '../../utils/textstring';

export default class Receiver extends Component {
    static propTypes = {
        updateReceiverSearchString: PropTypes.func.isRequired,
        updateChosenReceivers: PropTypes.func.isRequired,
        chosenReceivers: PropTypes.array.isRequired,
        index: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        includedUsers: PropTypes.array,
        locationId: PropTypes.number,
        groupId: PropTypes.number,
        userId: PropTypes.number,
        imgUrl: PropTypes.string,
        personId: PropTypes.string,
        siteId: PropTypes.string,
        showIdInPopup: PropTypes.bool
    };

    static defaultProps = {
        includedUsers: [],
        locationId: null,
        groupId: null,
        showIdInPopup: false,
        userId: null,
        imgUrl: '',
        personId: null,
        siteId: null
    };

    shouldComponentUpdate(nextProps) {
        const {
            chosenReceivers,
            includedUsers,
            locationId,
            groupId,
            userId,
            imgUrl,
            index,
            name,
            personId,
            siteId,
            showIdInPopup
        } = this.props;

        return !isEqual(chosenReceivers, nextProps.chosenReceivers)
            || !isEqual(includedUsers, nextProps.includedUsers)
            || locationId !== nextProps.locationId
            || groupId !== nextProps.groupId
            || userId !== nextProps.userId
            || imgUrl !== nextProps.imgUrl
            || index !== nextProps.index
            || name !== nextProps.name
            || personId !== nextProps.personId
            || siteId !== nextProps.siteId
            || showIdInPopup !== nextProps.showIdInPopup;
    }

    chooseReceiver(name, locationId, userId, groupId, personId, siteId) {
        const {
            chosenReceivers,
            includedUsers,
            updateChosenReceivers,
            updateReceiverSearchString
        } = this.props;

        let newReceiver = {};
        let receivers = [];

        if (locationId) {
            newReceiver = { name, locationId, siteId };
            receivers = chosenReceivers.filter(r => r.locationId !== locationId);
        } else if (userId) {
            newReceiver = { name, userId, personId };
            receivers = chosenReceivers.filter(r => r.userId !== userId);
        } else {
            newReceiver = { name, groupId, includedUsers };
            receivers = chosenReceivers.filter(r => r.groupId !== groupId);
        }

        receivers.push(newReceiver);

        const locationReceivers = receivers.filter(r => r.locationId !== undefined && r.locationId !== null);

        if (locationReceivers.length > 1) {
            receivers = receivers.filter(r => (r.locationId === undefined || r.locationId === null) || r.locationId === locationReceivers[locationReceivers.length - 1].locationId);

            chayns.dialog.alert(null, getTextstring('txt_chayns_interCom2_newThread_toManyLocations'));
        }

        updateChosenReceivers(receivers);
        updateReceiverSearchString('');
    }

    render() {
        const {
            includedUsers,
            locationId,
            groupId,
            userId,
            imgUrl,
            index,
            name,
            personId,
            siteId,
            showIdInPopup
        } = this.props;

        // eslint-disable-next-line no-nested-ternary
        const memberId = showIdInPopup && siteId !== null ? siteId : (showIdInPopup && personId !== null ? personId : null);
        const memberName = memberId !== null ? `${name} (${memberId})` : name;
        const receiverStyles = {};
        const receiverWrapperStyles = {};

        const isDarkMode = chayns.env.site.colorMode === 1;

        if (isDarkMode) {
            receiverStyles.backgroundColor = 'rgba(125, 125, 125, 0.30)';

            if (index % 2 > 0) {
                receiverWrapperStyles.backgroundColor = 'rgba(125, 125, 125, 0.1)';
            }
        } else {
            receiverStyles.backgroundColor = chayns.getSchemeColor(15);

            if (index % 2 > 0) {
                receiverWrapperStyles.backgroundColor = chayns.getSchemeColor(5);
            }
        }

        return (
            <div className="receiver-wrapper popup-item" style={receiverWrapperStyles} onClick={this.chooseReceiver.bind(this, name, locationId, userId, groupId, personId, siteId)}>
                <div className="receiver popup-item" style={receiverStyles}>
                    <div className="pic popup-item">
                        {
                            groupId !== null ? getGroupImage(groupId, includedUsers.map((id) => {
                                return { userId: id };
                            })) : <img className="popup-item" src={imgUrl} alt="" onError={handleImageError}/>
                        }
                    </div>
                    <div className="receiver-name popup-item notranslate">
                        {memberName}
                    </div>
                </div>
            </div>
        );
    }
}
