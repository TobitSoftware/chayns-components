import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import PersonFinderResults from './PersonFinderResults';
import InputBox from '../../react-chayns-input_box/component/InputBox';
import WaitCursor from './WaitCursor';
import getListLength from '../utils/getListLength';
import mod from '../../utils/modulo';
import getSelectedListItem from '../utils/getSelectedListItem';

const LAZY_LOADING_SPACE = 100;

class PersonFinderView extends Component {
    state = {
        lazyLoading: false,
        focusIndex: null,
    };

    updateIndex = (focusIndex) => {
        this.setState({ focusIndex });
        const { data } = this.props;
        if (focusIndex !== null) this.resultList.scrollTo(0, (63 * (mod(focusIndex, getListLength(data)) - 1)));
    };

    handleKeyDown = (ev) => {
        if (!this.resultList) return;
        const { focusIndex } = this.state;
        const {
            onSelect,
            data,
        } = this.props;

        if (ev.keyCode === 40) { // Arrow down
            if (focusIndex === null) {
                this.updateIndex(0);
            } else {
                this.updateIndex(focusIndex + 1);
            }
        } else if (ev.keyCode === 38) { // Arrow up
            if (focusIndex === null) {
                this.updateIndex(0);
            } else {
                this.updateIndex(focusIndex - 1);
            }
        } else if (ev.keyCode === 27) { // Esc
            this.updateIndex(null);
            this.boxRef.blur();
        } else if (ev.keyCode === 13) { // Enter
            onSelect(undefined, getSelectedListItem(data, mod(focusIndex, getListLength(data))));
        }
    };

    handleLazyLoad = async () => {
        if (!this.resultList) return;

        const { lazyLoading } = this.state;

        const { value, autoLoading, onLoadMore } = this.props;
        const { scrollTop, offsetHeight, scrollHeight } = this.resultList;

        if (onLoadMore && autoLoading && !lazyLoading && (scrollHeight - scrollTop - offsetHeight) <= LAZY_LOADING_SPACE) {
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
        const { data, orm, value } = this.props;
        return Array.isArray(orm.groups)
            ? orm.groups.some(({ key: group, show }) => (typeof show !== 'function' || show(value))
                && Array.isArray(data[group]) && data[group].length)
            : !!((Array.isArray(data) && data.length) || Object.values(data)
                .some((d) => Array.isArray(d) && d.length));
    };

    renderChildren() {
        const {
            onSelect,
            selectedValue,
            data,
            orm,
            value,
            hasMore,
            onLoadMore,
            showWaitCursor: waitCursor,
        } = this.props;

        const { focusIndex } = this.state;

        const hasEntries = this.hasEntries();

        if (!selectedValue && hasEntries) {
            return (
                <PersonFinderResults
                    key="results"
                    onSelect={onSelect}
                    data={data}
                    orm={orm}
                    value={value}
                    onLoadMore={async (type) => {
                        if (!onLoadMore) return;
                        await onLoadMore(type, value);
                    }}
                    showWaitCursor={waitCursor}
                    hasMore={hasMore}
                    focusIndex={focusIndex}
                />
            );
        }

        if (waitCursor === true || Object.values(waitCursor)
            .some((x) => x)) {
            return (
                <WaitCursor key="wait-cursor"/>
            );
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
            ...props
        } = this.props;

        return (
            <InputBox
                parent={parent}
                key="single"
                ref={(ref) => {
                    if (boxRef) {
                        boxRef(ref);
                    }
                    this.boxRef = ref;
                }}
                inputComponent={inputComponent}
                onKeyDown={this.handleKeyDown}
                onAddTag={(data) => onSelect(undefined, {
                    [orm.identifier]: data.text,
                    [orm.showName]: data.text,
                })}
                value={value}
                boxClassName={classNames('cc__person-finder__overlay', boxClassName)}
                overlayProps={{
                    ref: (ref) => {
                        this.resultList = ref;
                    },
                    onScroll: this.handleLazyLoad,
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
        groups: PropTypes.arrayOf(PropTypes.shape({
            key: PropTypes.string.isRequired,
            show: PropTypes.func,
        })),
    }).isRequired,
    data: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.object),
        PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object)),
    ]),
    autoLoading: PropTypes.bool,
    hasMore: PropTypes.oneOfType([
        PropTypes.objectOf(PropTypes.bool),
        PropTypes.bool,
    ]),
    onSelect: PropTypes.func.isRequired,
    onLoadMore: PropTypes.func,
    value: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string,
    ]),
    selectedValue: PropTypes.bool,
    inputComponent: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.node,
    ]).isRequired,
    boxClassName: PropTypes.string,
    parent: PropTypes.instanceOf(Element),
    boxRef: PropTypes.func,
    showWaitCursor: PropTypes.oneOfType([
        PropTypes.objectOf(PropTypes.bool),
        PropTypes.bool,
    ]),
};

PersonFinderView.defaultProps = {
    value: '',
    data: [],
    autoLoading: false,
    hasMore: false,
    onLoadMore: null,
    selectedValue: false,
    boxClassName: null,
    parent: document.querySelector('.tapp'),
    boxRef: null,
    showWaitCursor: false,
};

export default PersonFinderView;
