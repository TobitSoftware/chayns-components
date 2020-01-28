import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import PersonFinderResults from './PersonFinderResults';
import InputBox from '../../react-chayns-input_box/component/InputBox';
import WaitCursor from './WaitCursor';

const LAZY_LOADING_SPACE = 100;

class PersonFinderView extends Component {
    handleKeyDown = (ev) => {
        if (!this.resultList) return;

        if ((ev.keyCode === 9 || ev.keyCode === 40)) {
            const item = this.resultList.querySelector('.result-item');
            if (item) {
                ev.preventDefault();
                item.focus();
            }
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
            ? orm.groups.some(({ key: group, show }) => (typeof show !== 'function' || show(value)) && Array.isArray(data[group]) && data[group].length)
            : !!((Array.isArray(data) && data.length) || Object.values(data).some(d => Array.isArray(d) && d.length));
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
                />
            );
        }

        if (waitCursor === true || Object.values(waitCursor).some(x => x)) {
            return (
                <WaitCursor key="wait-cursor" />
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
                ref={boxRef}
                inputComponent={inputComponent}
                onKeyDown={this.handleKeyDown}
                onAddTag={data => onSelect(undefined, { [orm.identifier]: data.text, [orm.showName]: data.text })}
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
