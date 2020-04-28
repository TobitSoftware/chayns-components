/* eslint-disable no-nested-ternary,react/forbid-prop-types */
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import React, { Component, Fragment } from 'react';
import isEqual from 'lodash.isequal';
import PropTypes from 'prop-types';

import Receiver from './Receiver';

export default class ReceiverSearchPopup extends Component {
    shouldComponentUpdate(nextProps) {
        const {
            chosenReceivers,
            foundReceivers,
            showIdInPopup,
            onlyPersons,
            isLocation,
            onlySites,
            position,
            width,
            show,
        } = this.props;

        return !isEqual(chosenReceivers, nextProps.chosenReceivers)
            || !isEqual(foundReceivers, nextProps.foundReceivers)
            || showIdInPopup !== nextProps.showIdInPopup
            || !isEqual(position, nextProps.position)
            || onlyPersons !== nextProps.onlyPersons
            || isLocation !== nextProps.isLocation
            || onlySites !== nextProps.onlySites
            || width !== nextProps.width
            || show !== nextProps.show;
    }

    render() {
        const {
            updateReceiverSearchString,
            updateChosenReceivers,
            chosenReceivers,
            foundReceivers,
            showIdInPopup,
            onlyPersons,
            isLocation,
            onlySites,
            position,
            width,
            show,
        } = this.props;

        const locationResultState = foundReceivers.locations.state;
        const groupResultState = foundReceivers.groups.state;
        const userResultState = foundReceivers.users.state;

        const tooManyResultsError = <div className="popup-item error-message">Zu viele Ergebnisse gefunden</div>;
        const noMatchError = <div className="popup-item error-message">Keine passenden Ergebnisse gefunden</div>;

        const locations = [];
        const groups = [];
        const users = [];

        foundReceivers.locations.values.forEach((l) => {
            locations.push(<Receiver
                imgUrl={`https://sub60.tobit.com/l/${l.locationID}?size=30`}
                name={l.appstoreName !== '' ? l.appstoreName : l.showName}
                updateReceiverSearchString={updateReceiverSearchString}
                updateChosenReceivers={updateChosenReceivers}
                key={`locationId_${l.locationID}`}
                chosenReceivers={chosenReceivers}
                showIdInPopup={showIdInPopup}
                locationId={l.locationID}
                siteId={l.siteID}
            />);
        });

        foundReceivers.users.values.forEach((u) => {
            users.push(<Receiver
                imgUrl={`https://sub60.tobit.com/u/${u.userId}?size=30`}
                updateReceiverSearchString={updateReceiverSearchString}
                updateChosenReceivers={updateChosenReceivers}
                chosenReceivers={chosenReceivers}
                showIdInPopup={showIdInPopup}
                key={`userId_${u.userId}`}
                personId={u.personId}
                userId={u.userId}
                name={u.name}
            />);
        });

        if (isLocation) {
            foundReceivers.groups.values.forEach((g) => {
                groups.push(<Receiver
                    updateReceiverSearchString={updateReceiverSearchString}
                    updateChosenReceivers={updateChosenReceivers}
                    chosenReceivers={chosenReceivers}
                    key={`groupId_${g.groupId}`}
                    includedUsers={g.userIds}
                    groupId={g.groupId}
                    name={g.showName}
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

        const showPopup = show && (locationResultState !== 3 || userResultState !== 3 || (groupResultState !== 3 && isLocation));

        return (
            <TransitionGroup>
                <CSSTransition key={showPopup} timeout={300} classNames="swipe-up">
                    {showPopup ? (
                        <div className="receiver-popup" style={receiverPopupStyles}>
                            {onlyPersons ? false : (
                                <Fragment>
                                    <div className="group-headline popup-item">Sites</div>
                                    {locations}
                                    {locationResultState > 0 ? (
                                        locationResultState === 2 ? (
                                            tooManyResultsError
                                        ) : (
                                            noMatchError
                                        )
                                    ) : (
                                        <div className="popup-item"/>
                                    )}
                                </Fragment>
                            )}
                            {onlySites ? false : (
                                <Fragment>
                                    <div className="group-headline popup-item">Personen</div>
                                    {users}
                                    {userResultState > 0 ? (
                                        userResultState === 2 ? (
                                            tooManyResultsError
                                        ) : (
                                            noMatchError
                                        )
                                    ) : (
                                        <div className="popup-item"/>
                                    )}
                                </Fragment>
                            )}
                            {!isLocation ? false : (
                                <Fragment>
                                    <div className="group-headline popup-item">Gruppen</div>
                                    {groups}
                                    {groupResultState > 0 ? (
                                        groupResultState === 2 ? (
                                            tooManyResultsError
                                        ) : (
                                            noMatchError
                                        )
                                    ) : (
                                        <div className="popup-item"/>
                                    )}
                                </Fragment>
                            )}
                        </div>
                    ) : (
                        <div/>
                    )}
                </CSSTransition>
            </TransitionGroup>
        );
    }
}

ReceiverSearchPopup.propTypes = {
    updateReceiverSearchString: PropTypes.func.isRequired,
    updateChosenReceivers: PropTypes.func.isRequired,
    chosenReceivers: PropTypes.array.isRequired,
    foundReceivers: PropTypes.object.isRequired,
    isLocation: PropTypes.bool.isRequired,
    position: PropTypes.object.isRequired,
    width: PropTypes.number.isRequired,
    show: PropTypes.bool.isRequired,
    showIdInPopup: PropTypes.bool,
    onlyPersons: PropTypes.bool,
    onlySites: PropTypes.bool,
};

ReceiverSearchPopup.defaultProps = {
    showIdInPopup: false,
    onlyPersons: false,
    onlySites: false,
};
