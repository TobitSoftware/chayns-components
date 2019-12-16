/* eslint-disable jsx-a11y/alt-text */

import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import FriendsIndicator from './result-item/FriendsIndicator';
import Relation from './result-item/Relation';

const PersonFinderResultItem = ({ onClick, data, orm }) => {
    const handleClick = useCallback(() => {
        onClick({
            relation: data,
        });
    }, [onClick, data]);

    const onKeyDown = useCallback((ev) => {
        ev.preventDefault();
        switch (ev.keyCode) {
        case 9: {
            const next = ev.shiftKey ? ev.target.previousSibling || ev.target.parentElement.lastChild : ev.target.nextSibling || ev.target.parentElement.firstChild;
            if (next) {
                next.focus();
            }
            break;
        }
        case 13:
            handleClick();
            break;
        case 38:
            if (ev.target.previousSibling) ev.target.previousSibling.focus();
            break;
        case 40:
            if (ev.target.nextSibling) ev.target.nextSibling.focus();
            break;
        default:
            break;
        }
    }, []);

    const hasRelations = orm.relations && Array.isArray(data[orm.relations]) ? data[orm.relations].length > 0 : false;

    return (
        <div
            className="result-item"
            tabIndex="-1"
            onClick={handleClick}
            onKeyDown={onKeyDown}
        >
            {orm.imageUrl ? (<div className="img" style={{ backgroundImage: `url(${data[orm.imageUrl]})` }} />) : null}
            <div className="text">
                <div
                    className="title"
                >
                    <div className="name">{data[orm.showName]}</div>
                    {hasRelations && (
                        <div className="identifier">
                            {`(${data[orm.identifier]})`}
                        </div>
                    )}
                </div>
                {hasRelations && (
                    <Relation relation={data} />
                )}
                {!hasRelations && (
                    <div className="identifier">
                        {`(${data[orm.identifier]})`}
                    </div>
                )}
            </div>
            {data.personId && (
                <FriendsIndicator
                    personId={data.personId}
                    name={data[orm.showName]}
                />
            )}
        </div>
    );
};

PersonFinderResultItem.propTypes = {
    orm: PropTypes.shape({
        identifier: PropTypes.string,
        showName: PropTypes.string,
        imageUrl: PropTypes.string,
        relations: PropTypes.string,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};

export default PersonFinderResultItem;
