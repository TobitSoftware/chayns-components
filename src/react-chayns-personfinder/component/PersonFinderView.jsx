import classNames from 'clsx';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import InputBox from '../../react-chayns-input_box/component/InputBox';
import { isServer } from '../../utils/isServer';
import getListLength from '../utils/getListLength';
import getSelectedListItem from '../utils/getSelectedListItem';
import PersonFinderResults from './PersonFinderResults';
import WaitCursor from './WaitCursor';

const LAZY_LOADING_SPACE = 100;

class PersonFinderView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lazyLoading: false,
            focusIndex: props.autoSelectFirst ? 0 : null,
        };
    }

    updateIndex = (index) => {
        const { data, value, orm } = this.props;
        let focusIndex = index;
        if (focusIndex !== null) {
            const listLength = getListLength(data, orm, value);
            if (focusIndex >= listLength) {
                focusIndex = listLength - 1;
            }
            if (focusIndex < 0) {
                focusIndex = 0;
            }
            if (this.animationFrameId) {
                window.cancelAnimationFrame(this.animationFrameId);
            }
            this.animationFrameId = window.requestAnimationFrame(() => {
                if (this.resultList) {
                    this.resultList.scrollTo(0, 63 * (focusIndex - 1));
                }
                this.animationFrameId = null;
            });
        }
        this.setState({ focusIndex });
    };

    handleOnBlur = () => {
        const { autoSelectFirst } = this.props;
        this.updateIndex(autoSelectFirst ? 0 : null);
    };

    handleKeyDown = (ev) => {
        const { focusIndex } = this.state;
        const { onSelect, data, orm, value, onKeyDown, autoSelectFirst } =
            this.props;

        if (onKeyDown) {
            onKeyDown(ev);
        }

        if (!this.resultList) return;

        switch (ev.keyCode) {
            case 40: // Arrow down
                ev.preventDefault();
                if (focusIndex === null) {
                    this.updateIndex(0);
                } else {
                    this.updateIndex(focusIndex + 1);
                }
                break;
            case 38: // Arrow up
                ev.preventDefault();
                if (focusIndex === null) {
                    this.updateIndex(0);
                } else {
                    this.updateIndex(focusIndex - 1);
                }
                break;
            case 27: // Esc
                this.updateIndex(autoSelectFirst ? 0 : null);
                this.boxRef.blur();
                break;
            case 13: // Enter
                if (focusIndex !== null) {
                    const item = getSelectedListItem(
                        data,
                        focusIndex,
                        orm,
                        value
                    );
                    if (item !== undefined) {
                        onSelect(undefined, item);
                    }
                    this.updateIndex(autoSelectFirst ? 0 : null);
                    if (this.resultList) {
                        this.resultList.scrollTo(0, 0);
                    }
                }
                break;
            default:
                // letters, numbers (including numpad) and space
                if (
                    (ev.keyCode === 32 ||
                        (ev.keyCode >= 48 && ev.keyCode <= 106)) &&
                    this.boxRef.getHiddenState()
                ) {
                    this.boxRef.focus();
                }
                break;
        }
    };

    handleLazyLoad = async () => {
        if (!this.resultList) return;

        const { lazyLoading } = this.state;

        const { value, autoLoading, onLoadMore, hasMore, data } = this.props;
        const { scrollTop, offsetHeight, scrollHeight } = this.resultList;

        if (
            onLoadMore &&
            autoLoading &&
            !lazyLoading &&
            scrollHeight - scrollTop - offsetHeight <= LAZY_LOADING_SPACE &&
            Object.keys(hasMore).some((key) => {
                if (data[key].length === 0) {
                    return false;
                }
                return hasMore[key] === true;
            })
        ) {
            this.setState({
                lazyLoading: true,
            });
            await onLoadMore('default', value);
            this.setState({
                lazyLoading: false,
            });
        }
    };

    hasEntries = () => {
        const { data, orm, value, tags, filterSelected, inputValue } =
            this.props;
        const filterValues = ({ type, id }) =>
            tags.every(
                ({ value: tagValue }) =>
                    type !== tagValue.type || id !== tagValue.id
            );
        return Array.isArray(orm.groups)
            ? orm.groups.some(({ key: group, show, filter }) => {
                  if (typeof show === 'function' && !show(value)) {
                      return false;
                  }
                  if (!Array.isArray(data[group])) {
                      return false;
                  }
                  let items = data[group];
                  if (typeof filter === 'function') {
                      items = items.filter(filter(inputValue));
                  }
                  if (filterSelected) {
                      items = items.filter(filterValues);
                  }
                  return items.length;
              })
            : !!(
                  (Array.isArray(data) && data.length) ||
                  Object.values(data).some((d) => Array.isArray(d) && d.length)
              );
    };

    renderChildren() {
        const {
            onSelect,
            onRemoveTag,
            selectedValue,
            data,
            tags,
            orm,
            value,
            hasMore,
            onLoadMore,
            showWaitCursor: waitCursor,
            noBackground,
            filterSelected,
            hideFriendsIcon,
            renderInline,
            inputValue,
            showCheckbox,
            hideVerifiedIcon,
            minCharCount,
        } = this.props;

        const { focusIndex } = this.state;

        const hasEntries = this.hasEntries();

        if (
            typeof minCharCount === 'number' &&
            inputValue.length < minCharCount
        ) {
            return null;
        }

        const showResults = !selectedValue && hasEntries;
        const showWaitCursor =
            waitCursor === true || Object.values(waitCursor).some((x) => x);
        if (showResults || showWaitCursor) {
            return [
                showResults && (
                    <PersonFinderResults
                        key="results"
                        onSelect={onSelect}
                        onRemoveTag={onRemoveTag}
                        data={data}
                        tags={tags}
                        orm={orm}
                        value={value}
                        onLoadMore={async (type) => {
                            if (!onLoadMore) return;
                            await onLoadMore(type, value);
                        }}
                        showWaitCursor={waitCursor}
                        hasMore={hasMore}
                        focusIndex={focusIndex}
                        noBackground={noBackground}
                        filterSelected={filterSelected}
                        hideFriendsIcon={hideFriendsIcon}
                        showCheckbox={showCheckbox}
                        hideVerifiedIcon={hideVerifiedIcon}
                    />
                ),
                showWaitCursor && <WaitCursor key="wait-cursor" />,
            ];
        }

        if (!selectedValue && renderInline) {
            return inputValue ? (
                <div className="cc__person-finder__no-results">{`Für Deine Suche "${inputValue}" gab es keine Ergebnisse`}</div>
            ) : undefined;
        }

        return null;
    }

    render() {
        const {
            onSelect,
            selectedValue,
            value,
            inputComponent,
            boxClassName,
            parent,
            orm,
            boxRef,
            onChange,
            onKeyDown,
            autoSelectFirst,
            ...props
        } = this.props;

        return (
            <InputBox
                onBlur={this.handleOnBlur}
                parent={
                    parent ||
                    (isServer() ? null : document.querySelector('.tapp'))
                }
                key="single"
                ref={(ref) => {
                    if (boxRef) {
                        boxRef(ref);
                    }
                    this.boxRef = ref;
                }}
                inputComponent={inputComponent}
                onKeyDown={this.handleKeyDown}
                onAddTag={(data) => {
                    if (data.text !== undefined) {
                        return onSelect(undefined, {
                            [orm.identifier]: data.text,
                            [orm.showName]: data.text,
                        });
                    }
                    return null;
                }}
                value={value}
                boxClassName={classNames(
                    'cc__person-finder__overlay',
                    boxClassName
                )}
                overlayProps={{
                    ref: (ref) => {
                        this.resultList = ref;
                    },
                    onScroll: this.handleLazyLoad,
                }}
                onChange={(...e) => {
                    onChange(...e);
                    this.updateIndex(autoSelectFirst ? 0 : null);
                }}
                {...props}
            >
                {this.renderChildren()}
            </InputBox>
        );
    }
}

PersonFinderView.propTypes = {
    orm: PropTypes.shape({
        identifier: PropTypes.string,
        showName: PropTypes.string,
        search: PropTypes.arrayOf(PropTypes.string),
        imageUrl: PropTypes.string,
        groups: PropTypes.arrayOf(
            PropTypes.shape({
                key: PropTypes.string.isRequired,
                show: PropTypes.func,
            })
        ),
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
    autoLoading: PropTypes.bool,
    hasMore: PropTypes.oneOfType([
        PropTypes.objectOf(PropTypes.bool),
        PropTypes.bool,
    ]),
    onSelect: PropTypes.func.isRequired,
    onLoadMore: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    selectedValue: PropTypes.bool,
    inputComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.node])
        .isRequired,
    boxClassName: PropTypes.string,
    parent:
        typeof Element !== 'undefined'
            ? PropTypes.instanceOf(Element)
            : () => {},
    boxRef: PropTypes.func,
    showWaitCursor: PropTypes.oneOfType([
        PropTypes.objectOf(PropTypes.bool),
        PropTypes.bool,
    ]),
    onChange: PropTypes.func,
    autoSelectFirst: PropTypes.bool,
    onKeyDown: PropTypes.func,
    noBackground: PropTypes.bool,
    filterSelected: PropTypes.bool,
    hideFriendsIcon: PropTypes.bool,
    inputValue: PropTypes.string,
    renderInline: PropTypes.bool,
    showCheckbox: PropTypes.bool,
    onRemoveTag: PropTypes.func.isRequired,
    hideVerifiedIcon: PropTypes.bool,
    minCharCount: PropTypes.number,
};

PersonFinderView.defaultProps = {
    value: '',
    data: [],
    tags: [],
    autoLoading: false,
    hasMore: false,
    onLoadMore: null,
    selectedValue: false,
    boxClassName: null,
    parent: null,
    boxRef: null,
    showWaitCursor: false,
    onChange: null,
    autoSelectFirst: false,
    onKeyDown: null,
    noBackground: false,
    filterSelected: false,
    hideFriendsIcon: false,
    inputValue: '',
    renderInline: false,
    showCheckbox: false,
    hideVerifiedIcon: false,
    minCharCount: null,
};

PersonFinderView.displayName = 'PersonFinderView';

export default PersonFinderView;
