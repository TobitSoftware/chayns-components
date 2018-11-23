/* eslint-disable no-nested-ternary */
import React, { Component, Fragment } from 'react';
import isEqual from 'lodash.isequal';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Receiver from './Receiver';

export default class ReceiverSearchPopup extends Component {
    static propTypes = {
        updateReceiverSearchString: PropTypes.func.isRequired,
        updateChosenReceivers: PropTypes.func.isRequired,
        chosenReceivers: PropTypes.array.isRequired,
        foundReceivers: PropTypes.object.isRequired,
        isLocation: PropTypes.bool.isRequired,
        position: PropTypes.object.isRequired,
        width: PropTypes.number.isRequired,
        show: PropTypes.bool.isRequired,
        onlyPersons: PropTypes.bool,
        onlySites: PropTypes.bool,
        showIdInPopup: PropTypes.bool
    };

    static defaultProps = {
        onlyPersons: false,
        onlySites: false,
        showIdInPopup: false
    };

    shouldComponentUpdate(nextProps) {
        const {
            chosenReceivers,
            foundReceivers,
            isLocation,
            position,
            width,
            show,
            onlyPersons,
            onlySites,
            showIdInPopup
        } = this.props;

        return !isEqual(chosenReceivers, nextProps.chosenReceivers)
            || !isEqual(foundReceivers, nextProps.foundReceivers)
            || !isEqual(position, nextProps.position)
            || onlyPersons !== nextProps.onlyPersons
            || isLocation !== nextProps.isLocation
            || onlySites !== nextProps.onlySites
            || width !== nextProps.width
            || show !== nextProps.show
            || showIdInPopup !== nextProps.showIdInPopup;
    }

    render() {
        const {
            show,
            position,
            width,
            chosenReceivers,
            foundReceivers,
            isLocation,
            updateChosenReceivers,
            updateReceiverSearchString,
            onlyPersons,
            onlySites,
            showIdInPopup
        } = this.props;

        const isDarkMode = chayns.env.site.colorMode === 1;

        const locationResultState = foundReceivers.locations.state;
        const groupResultState = foundReceivers.groups.state;
        const userResultState = foundReceivers.users.state;

        const headlineClasses = classNames('group-headline popup-item chayns__background-color--20', {
            dark: isDarkMode
        });

        const receiverPopupClasses = classNames('receiver-popup chayns__border-color--20 tapp__content is-dark', {
            hide: !show || (locationResultState === 3 && userResultState === 3 && (groupResultState === 3 || !isLocation)),
            dark: isDarkMode
        });

        const tooManyResultsError = <div className="error-message popup-item">Zu viele Ergebnisse gefunden</div>;
        const noMatchError = <div className="error-message popup-item">Keine passenden Ergebnisse gefunden</div>;

        const locations = [];
        const users = [];
        const groups = [];

        foundReceivers.locations.values.forEach((l, i) => {
            locations.push(<Receiver
                index={i}
                name={l.appstoreName !== '' ? l.appstoreName : l.showName}
                updateChosenReceivers={updateChosenReceivers}
                updateReceiverSearchString={updateReceiverSearchString}
                locationId={l.locationID}
                siteId={l.siteID}
                showIdInPopup={showIdInPopup}
                chosenReceivers={chosenReceivers}
                key={`locationId_${l.locationID}`}
                imgUrl={`https://sub60.tobit.com/l/${l.locationID}?size=30`}
            />);
        });

        foundReceivers.users.values.forEach((u, i) => {
            users.push(<Receiver
                index={i}
                name={u.name}
                personId={u.personId}
                userId={u.userId}
                showIdInPopup={showIdInPopup}
                updateChosenReceivers={updateChosenReceivers}
                updateReceiverSearchString={updateReceiverSearchString}
                key={`userId_${u.userId}`}
                chosenReceivers={chosenReceivers}
                imgUrl={`https://sub60.tobit.com/u/${u.userId}?size=30`}
            />);
        });

        if (isLocation) {
            foundReceivers.groups.values.forEach((g, i) => {
                groups.push(<Receiver
                    index={i}
                    name={g.showName}
                    groupId={g.groupId}
                    updateChosenReceivers={updateChosenReceivers}
                    updateReceiverSearchString={updateReceiverSearchString}
                    includedUsers={g.userIds}
                    key={`groupId_${g.groupId}`}
                    chosenReceivers={chosenReceivers}
                />);
            });
        }

        const receiverPopupStyles = {};

        if (position) {
            if (position.top) {
                receiverPopupStyles.top = position.top;
            }

            if (position.left) {
                receiverPopupStyles.left = position.left;
            }

            if (width) {
                receiverPopupStyles.width = width;
            }
        }

        return (
            <div className={receiverPopupClasses} style={receiverPopupStyles}>
                {onlyPersons ? false : (
                    <Fragment>
                        <div className={headlineClasses}>Sites</div>
                        {locations}
                        {locationResultState > 0 ? (locationResultState === 2 ? tooManyResultsError : noMatchError) : <div className="popup-item"/>}
                    </Fragment>
                )}
                {onlySites ? false : (
                    <Fragment>
                        <div className={headlineClasses}>Personen</div>
                        {users}
                        {userResultState > 0 ? (userResultState === 2 ? tooManyResultsError : noMatchError) : <div className="popup-item"/>}
                    </Fragment>
                )}
                {!isLocation ? false : (
                    <Fragment>
                        <div className={headlineClasses}>Gruppen</div>
                        {groups}
                        {groupResultState > 0 ? (groupResultState === 2 ? tooManyResultsError : noMatchError) : <div className="popup-item"/>}
                    </Fragment>
                )}
            </div>
        );
    }
}
