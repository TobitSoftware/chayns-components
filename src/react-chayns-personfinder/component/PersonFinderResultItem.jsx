/* eslint-disable jsx-a11y/alt-text */

import classNames from 'clsx';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import FriendsIndicator from './result-item/FriendsIndicator';
import VerificationIcon from '../../react-chayns-verification_icon/component/VerificationIcon';
import Checkbox from '../../react-chayns-checkbox/component/Checkbox';
import getText from '../utils/getText';
import { personIdRegex } from '../../utils/constants';

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
    inputValue,
    hideVerifiedIcon,
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

    const subtitleParts = [];
    if (
        typeof data[orm.identifier] === 'string' &&
        data[orm.identifier].match(personIdRegex) &&
        inputValue
    ) {
        subtitleParts.push(`chaynsID: ${data[orm.identifier]}`);
    }
    if (hasRelations) {
        subtitleParts.push(
            `${data.relationCount} ${getText(
                data.relationCount === 1 ? 'COMMON_SITE' : 'COMMON_SITES'
            )}`
        );
    } else if (orm.subtitle) {
        subtitleParts.push(`(${data[orm.subtitle]})`);
    } else if (data.isFriend && inputValue) {
        subtitleParts.push('befreundet');
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
                        {orm.verified && hideVerifiedIcon !== true ? (
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
                <span className="relation">{subtitleParts.join(' - ')}</span>
            </div>
            {data.personId && !hideFriendsIcon && (
                <FriendsIndicator
                    personId={data.personId}
                    userId={data.userId}
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
    inputValue: PropTypes.string,
    hideVerifiedIcon: PropTypes.bool,
};

PersonFinderResultItem.defaultProps = {
    roundIcons: false,
    hideFriendsIcon: false,
    tags: [],
    showCheckbox: false,
    inputValue: '',
    hideVerifiedIcon: false,
};

PersonFinderResultItem.displayName = 'PersonFinderResultItem';

export default PersonFinderResultItem;
