import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import ResultItemList from './ResultItemList';
import PersonsContext from './data/persons/PersonsContext';

const PersonFinderResults = ({
    data,
    tags,
    orm,
    value: inputValue,
    hasMore,
    onLoadMore,
    showWaitCursor,
    onSelect,
    onRemoveTag,
    focusIndex,
    noBackground,
    filterSelected,
    hideFriendsIcon,
    showCheckbox,
}) => {
    const handleClick = useCallback(
        (value) => {
            if (onSelect) {
                onSelect(value.type, value.relation);
            }
        },
        [onSelect]
    );

    const users = new Map();

    let length = 0;
    if (Array.isArray(orm.groups)) {
        return (
            <div
                className={classNames('cc__person-finder__results', {
                    'no-background': noBackground,
                })}
                key="resultList"
            >
                <div
                    className={classNames('cc__person-finder__results-list', {
                        'cc__person-finder__results-list--noTransition':
                            focusIndex !== null,
                    })}
                >
                    {orm.groups.map(
                        ({ key: group, show, roundIcons, filter }) => {
                            if (
                                typeof show === 'function' &&
                                !show(inputValue)
                            ) {
                                return null;
                            }

                            // Prevent duplicates from knownPersons and persons
                            let groupData = [];
                            if (
                                orm === PersonsContext.ObjectMapping &&
                                [
                                    'knownPersons',
                                    'personsRelated',
                                    'personsUnrelated',
                                ].includes(group)
                            ) {
                                (data[group] || []).forEach((value) => {
                                    if (users.has(value.id)) return;
                                    users.set(value.id, true);
                                    groupData.push(value);
                                });
                            } else {
                                groupData = data[group] || [];
                            }

                            groupData =
                                typeof (filter || orm.filter) === 'function'
                                    ? groupData.filter(
                                          (filter || orm.filter)(inputValue)
                                      )
                                    : groupData;
                            if (filterSelected) {
                                groupData = groupData.filter(({ type, id }) =>
                                    tags.every(
                                        ({ value }) =>
                                            type !== value.type ||
                                            id !== value.id
                                    )
                                );
                            }
                            const groupLength = groupData.length;
                            length += groupLength;
                            let groupFocusIndex = null;
                            if (
                                length - groupLength <= focusIndex &&
                                focusIndex < length &&
                                focusIndex !== null
                            ) {
                                groupFocusIndex =
                                    focusIndex - (length - groupLength);
                            }
                            return (
                                <div
                                    className={classNames(
                                        'cc__person-finder__results',
                                        {
                                            'no-background': noBackground,
                                        }
                                    )}
                                    key={`resultList_${group}`}
                                >
                                    <ResultItemList
                                        key={group}
                                        data={groupData}
                                        orm={orm}
                                        group={group}
                                        hasMore={hasMore[group]}
                                        onLoadMore={onLoadMore}
                                        showWaitCursor={showWaitCursor[group]}
                                        onClick={handleClick}
                                        onRemoveTag={onRemoveTag}
                                        focusIndex={groupFocusIndex}
                                        roundIcons={roundIcons}
                                        hideFriendsIcon={hideFriendsIcon}
                                        tags={tags}
                                        showCheckbox={showCheckbox}
                                        inputValue={inputValue}
                                    />
                                </div>
                            );
                        }
                    )}
                </div>
            </div>
        );
    }

    return (
        <div
            className={classNames('cc__person-finder__results', {
                'no-background': noBackground,
            })}
        >
            <ResultItemList
                data={
                    typeof orm.filter === 'function'
                        ? data.filter(orm.filter(inputValue))
                        : data
                }
                orm={orm}
                hasMore={hasMore}
                onLoadMore={onLoadMore}
                showWaitCursor={showWaitCursor}
                onClick={handleClick}
                focusIndex={focusIndex}
                roundIcons={orm.roundIcons}
            />
        </div>
    );
};

PersonFinderResults.propTypes = {
    orm: PropTypes.shape({
        identifier: PropTypes.string,
        showName: PropTypes.string,
        imageUrl: PropTypes.string,
        // eslint-disable-next-line react/forbid-prop-types
        groups: PropTypes.array,
        filter: PropTypes.func,
        roundIcons: PropTypes.bool,
    }).isRequired,
    data: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.object),
        PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object)),
    ]),
    tags: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.shape({}),
        })
    ),
    value: PropTypes.string,
    onSelect: PropTypes.func,
    onLoadMore: PropTypes.func.isRequired,
    hasMore: PropTypes.oneOfType([
        PropTypes.objectOf(PropTypes.bool),
        PropTypes.bool,
    ]),
    showWaitCursor: PropTypes.oneOfType([
        PropTypes.objectOf(PropTypes.bool),
        PropTypes.bool,
    ]),
    focusIndex: PropTypes.number,
    noBackground: PropTypes.bool,
    filterSelected: PropTypes.bool,
    hideFriendsIcon: PropTypes.bool,
    showCheckbox: PropTypes.bool,
    onRemoveTag: PropTypes.func.isRequired,
};

PersonFinderResults.defaultProps = {
    data: [],
    tags: [],
    value: '',
    onSelect: null,
    hasMore: false,
    showWaitCursor: false,
    focusIndex: null,
    noBackground: false,
    filterSelected: false,
    hideFriendsIcon: false,
    showCheckbox: false,
};

PersonFinderResults.displayName = 'PersonFinderResults';

export default PersonFinderResults;
