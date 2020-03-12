/* eslint-disable jsx-a11y/alt-text */

import React, { useCallback } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import FriendsIndicator from './result-item/FriendsIndicator';
import Relation from './result-item/Relation';

const PersonFinderResultItem = ({ onClick, data, orm, isFocused }) => {
    const handleClick = useCallback(() => {
        onClick({
            relation: data,
        });
    }, [onClick, data]);

    const onKeyDown = useCallback((ev) => {
        ev.preventDefault();
        switch (ev.keyCode) {
            case 9: {
                let next = ev.shiftKey ? ev.target.previousSibling : ev.target.nextSibling;
                let list = ev.target.parentElement.parentElement[ev.shiftKey ? 'previousSibling' : 'nextSibling'];
                while ((!next || !next.classList.contains('result-item')) && list) {
                    next = list.querySelector(ev.shiftKey ? '.result-item:last-child' : '.result-item');
                    list = ev.shiftKey ? list.previousSibling : list.nextSibling;
                }
                if (next) {
                    next.focus();
                }
                break;
            }
            case 13:
                handleClick();
                break;
            case 38: {
                let next = ev.target.previousSibling;
                let list = ev.target.parentElement.parentElement.previousSibling;
                while ((!next || !next.classList.contains('result-item')) && list) {
                    next = list.querySelector('.result-item:last-child');
                    list = list.previousSibling;
                }
                if (next) {
                    next.focus();
                }
                break;
            }
            case 40: {
                let next = ev.target.nextSibling;
                let list = ev.target.parentElement.parentElement.nextSibling;
                while (!next && list) {
                    next = list.querySelector('.result-item');
                    list = list.nextSibling;
                }
                if (next) {
                    next.focus();
                }
                break;
            }
            default:
                break;
        }
    }, []);

    const hasRelations = orm.relations && Array.isArray(data[orm.relations]) ? data[orm.relations].length > 0 : false;

    return (
        <div
            className={classNames('result-item', { 'result-item--focused': isFocused })}
            tabIndex="-1"
            onClick={handleClick}
            onKeyDown={onKeyDown}
        >
            {orm.imageUrl ? (<div className="img" style={{ backgroundImage: `url(${data[orm.imageUrl]})` }}/>) : null}
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
                    <Relation relation={data}/>
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
    // eslint-disable-next-line react/forbid-prop-types
    data: PropTypes.object.isRequired,
    isFocused: PropTypes.bool.isRequired,
};

export default PersonFinderResultItem;
