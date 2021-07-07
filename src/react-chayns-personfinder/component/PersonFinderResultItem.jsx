/* eslint-disable jsx-a11y/alt-text */

import classNames from 'clsx';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import FriendsIndicator from './result-item/FriendsIndicator';
import Relation from './result-item/Relation';
import VerificationIcon from '../../react-chayns-verification_icon/component/VerificationIcon';
import Checkbox from '../../react-chayns-checkbox/component/Checkbox';

const PersonFinderResultItem = ({
    onClick,
    data,
    orm,
    isFocused,
    roundIcons,
    hideFriendsIcon,
    showCheckbox,
    tags,
    onRemoveTag,
}) => {
    const selectedValue = tags?.find(
        ({ value }) => value[orm.identifier] === data[orm.identifier]
    );

    const handleClick = useCallback(() => {
        if (selectedValue) {
            onRemoveTag(selectedValue);
        } else {
            onClick({
                relation: data,
            });
        }
    }, [onClick, data, selectedValue, onRemoveTag]);

    let hasRelations =
        orm.relations && Array.isArray(data[orm.relations])
            ? data[orm.relations].length > 0
            : false;
    if (data.relationCount !== undefined && data.relationCount !== null) {
        hasRelations = true;
    }

    return (
        <div
            className={classNames('result-item', {
                'result-item--focused': isFocused,
            })}
            tabIndex="-1"
            onClick={handleClick}
        >
            {showCheckbox ? (
                <Checkbox
                    checked={!!selectedValue}
                    onChange={handleClick}
                    stopPropagation
                    className="checkbox"
                />
            ) : null}
            {orm.imageUrl ? (
                <div
                    className={classNames('img', { circle: roundIcons })}
                    style={{ backgroundImage: `url(${data[orm.imageUrl]})` }}
                />
            ) : null}
            <div className="text" style={{ justifyContent: 'center' }}>
                <div className="title">
                    <div className="name">
                        {orm.verified ? (
                            <VerificationIcon
                                name={data[orm.showName]}
                                verified={data[orm.verified]}
                            />
                        ) : (
                            data[orm.showName]
                        )}
                    </div>
                    {hasRelations && orm.subtitle && (
                        <div className="identifier">
                            {`(${data[orm.subtitle]})`}
                        </div>
                    )}
                </div>
                {hasRelations && <Relation relation={data} />}
                {!hasRelations && orm.subtitle && (
                    <div className="identifier">
                        {`(${data[orm.subtitle]})`}
                    </div>
                )}
            </div>
            {data.personId && !hideFriendsIcon && (
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
        subtitle: PropTypes.string,
        verified: PropTypes.string,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    data: PropTypes.object.isRequired,
    isFocused: PropTypes.bool.isRequired,
    roundIcons: PropTypes.bool,
    hideFriendsIcon: PropTypes.bool,
    tags: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.shape({}),
        })
    ),
    showCheckbox: PropTypes.bool,
    onRemoveTag: PropTypes.func.isRequired,
};

PersonFinderResultItem.defaultProps = {
    roundIcons: false,
    hideFriendsIcon: false,
    tags: [],
    showCheckbox: false,
};

PersonFinderResultItem.displayName = 'PersonFinderResultItem';

export default PersonFinderResultItem;
