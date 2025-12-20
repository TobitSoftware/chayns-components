/* eslint-disable no-nested-ternary,react/forbid-prop-types */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTransitionState } from 'react-transition-state';
import { mapStatusToClass } from '../../../utils/mapStatusToClass';

import Receiver from './Receiver';

const ReceiverSearchPopup = ({
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
}) => {
    const locationResultState = foundReceivers.locations.state;
    const groupResultState = foundReceivers.groups.state;
    const userResultState = foundReceivers.users.state;

    const tooManyResultsError = (
        <div className="popup-item error-message">
            Zu viele Ergebnisse gefunden
        </div>
    );
    const noMatchError = (
        <div className="popup-item error-message">
            Keine passenden Ergebnisse gefunden
        </div>
    );

    const locations = foundReceivers.locations.values.map((l) => (
        <Receiver
            imgUrl={`https://sub60.tobit.com/l/${l.locationID}?size=30`}
            name={l.appstoreName || l.showName}
            updateReceiverSearchString={updateReceiverSearchString}
            updateChosenReceivers={updateChosenReceivers}
            key={`locationId_${l.locationID}`}
            chosenReceivers={chosenReceivers}
            showIdInPopup={showIdInPopup}
            locationId={l.locationID}
            siteId={l.siteID}
        />
    ));

    const users = foundReceivers.users.values.map((u) => (
        <Receiver
            imgUrl={`https://sub60.tobit.com/u/${u.userId}?size=30`}
            updateReceiverSearchString={updateReceiverSearchString}
            updateChosenReceivers={updateChosenReceivers}
            chosenReceivers={chosenReceivers}
            showIdInPopup={showIdInPopup}
            key={`userId_${u.userId}`}
            personId={u.personId}
            userId={u.userId}
            name={u.name}
        />
    ));

    const groups =
        isLocation &&
        foundReceivers.groups.values.map((g) => (
            <Receiver
                updateReceiverSearchString={updateReceiverSearchString}
                updateChosenReceivers={updateChosenReceivers}
                chosenReceivers={chosenReceivers}
                key={`groupId_${g.groupId}`}
                includedUsers={g.userIds}
                groupId={g.groupId}
                name={g.showName}
            />
        ));

    const receiverPopupStyles = {
        top: position?.top,
        left: position?.left,
        width,
    };

    const showPopup =
        show &&
        (locationResultState !== 3 ||
            userResultState !== 3 ||
            (groupResultState !== 3 && isLocation));

    const [{ status, isMounted }, toggle] = useTransitionState({
        timeout: 300,
        mountOnEnter: true,
        unmountOnExit: true,
        preEnter: true,
    });

    useEffect(() => {
        toggle(showPopup);
    }, [showPopup, toggle]);

    if (!isMounted) return null;

    return (
        <div
            className={`receiver-popup ${mapStatusToClass(status, 'swipe-up')}`}
            style={receiverPopupStyles}
        >
            {!onlyPersons && (
                <>
                    <div className="group-headline popup-item">Sites</div>
                    {locations}
                    {locationResultState > 0 &&
                        (locationResultState === 2
                            ? tooManyResultsError
                            : noMatchError)}
                    {locationResultState === 0 && (
                        <div className="popup-item" />
                    )}
                </>
            )}
            {!onlySites && (
                <>
                    <div className="group-headline popup-item">Personen</div>
                    {users}
                    {userResultState > 0 &&
                        (userResultState === 2
                            ? tooManyResultsError
                            : noMatchError)}
                    {userResultState === 0 && <div className="popup-item" />}
                </>
            )}
            {isLocation && (
                <>
                    <div className="group-headline popup-item">Gruppen</div>
                    {groups}
                    {groupResultState > 0 &&
                        (groupResultState === 2
                            ? tooManyResultsError
                            : noMatchError)}
                    {groupResultState === 0 && <div className="popup-item" />}
                </>
            )}
        </div>
    );
};

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

ReceiverSearchPopup.displayName = 'ReceiverSearchPopup';

export default ReceiverSearchPopup;
