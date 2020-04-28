/* eslint-disable no-param-reassign */
import React from 'react';

export function handleImageError(event) {
    event.target.onerror = '';
    event.target.src = 'https://sub54.tobit.com/frontend/app/images/unknownUser.png';
}

export function getGroupImage(groupId, members) {
    const imageUrls = members.map((m) => (m.locationId
        ? `https://sub60.tobit.com/l/${m.locationId}?size=30`
        : `https://sub60.tobit.com/u/${m.userId}?size=30`));

    if (groupId === 0) {
        return (
            <img
                src={`https://sub60.tobit.com/l/${chayns.env.site.locationId}?size=30`}
                onError={handleImageError}
                alt=""
            />
        );
    }

    if (members.length === 1) {
        return (
            <img
                onError={handleImageError}
                src={imageUrls[0]}
                alt=""
            />
        );
    } if (members.length === 2) {
        return (
            <div className="multi-image">
                <div className="half-left" style={{ backgroundImage: `url("${imageUrls[0]}")` }}/>
                <div className="half-right" style={{ backgroundImage: `url("${imageUrls[1]}")` }}/>
            </div>
        );
    }

    return (
        <div className="multi-image">
            <div className="full-left" style={{ backgroundImage: `url("${imageUrls[0]}")` }}/>
            <div className="right-wrapper">
                <div className="top-right" style={{ backgroundImage: `url("${imageUrls[1]}")` }}/>
                <div className="bottom-right" style={{ backgroundImage: `url("${imageUrls[2]}")` }}/>
            </div>
        </div>
    );
}
