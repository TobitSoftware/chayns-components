/* eslint-disable no-nested-ternary */
import { CSSTransition, TransitionGroup } from 'react-transition-group';
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
        showIdInPopup: PropTypes.bool,
        onlyPersons: PropTypes.bool,
        onlySites: PropTypes.bool
    };

    static defaultProps = {
        showIdInPopup: false,
        onlyPersons: false,
        onlySites: false
    };

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
            show
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
            show
        } = this.props;

        const isDarkMode = chayns.env.site.colorMode === 1;

        const locationResultState = foundReceivers.locations.state;
        const groupResultState = foundReceivers.groups.state;
        const userResultState = foundReceivers.users.state;

        const headlineClasses = classNames('group-headline popup-item', {
            'chayns__background-color--white-3': !isDarkMode,
            'chayns__background-color-dark-3': isDarkMode
        });

        const receiverPopupClasses = classNames('receiver-popup', {
            'chayns__border-color--white-3 chayns__border-color--white-2': !isDarkMode,
            'chayns__border-color--dark-3 chayns__border-color--dark-2': isDarkMode
        });

        const popupItemClasses = classNames('popup-item error-message', {
            'chayns__background-color--white-2': !isDarkMode,
            'chayns__background-color--dark-2': isDarkMode,
        });

        const tooManyResultsError = <div className={popupItemClasses}>Zu viele Ergebnisse gefunden</div>;
        const noMatchError = <div className={popupItemClasses}>Keine passenden Ergebnisse gefunden</div>;

        const locations = [];
        const groups = [];
        const users = [];

        foundReceivers.locations.values.forEach((l, i) => {
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
                index={i}
            />);
        });

        foundReceivers.users.values.forEach((u, i) => {
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
                index={i}
            />);
        });

        if (isLocation) {
            foundReceivers.groups.values.forEach((g, i) => {
                groups.push(<Receiver
                    updateReceiverSearchString={updateReceiverSearchString}
                    updateChosenReceivers={updateChosenReceivers}
                    chosenReceivers={chosenReceivers}
                    key={`groupId_${g.groupId}`}
                    includedUsers={g.userIds}
                    groupId={g.groupId}
                    name={g.showName}
                    index={i}
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
                        <div className={receiverPopupClasses} style={receiverPopupStyles}>
                            {onlyPersons ? false : (
                                <Fragment>
                                    <div className={headlineClasses}>Sites</div>
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
                                    <div className={headlineClasses}>Personen</div>
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
                                    <div className={headlineClasses}>Gruppen</div>
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
