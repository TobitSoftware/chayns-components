import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import PersonFinderResultsCustom from './PersonFinderResultsCustom';
import InputBox from '../../react-chayns-input_box/component/InputBox';
import WaitCursor from './WaitCursor';

class PersonFinderView extends Component {
    state = {
        showWaitCursor: false,
    }

    hasEntries() {
        const { data } = this.props;
        return !!(data && data.length);
    }

    renderChildren() {
        const {
            onSelect,
            selectedValue,
            data,
            orm,
            hasMore,
            value,
            onLoadMore,
        } = this.props;

        const {
            showWaitCursor,
        } = this.state;

        const hasEntries = this.hasEntries();

        if (!selectedValue && hasEntries) {
            const results = (
                <PersonFinderResultsCustom
                    key="results"
                    sites={[]}
                    onSelect={onSelect}
                    data={data.filter((v) => {
                        if (orm.search && orm.search.length) {
                            return orm.search.some(key => v[key] && v[key].toUpperCase().includes(value.toUpperCase()));
                        }
                        return v[orm.identifier].toUpperCase().includes(value.toUpperCase()) || v[orm.showName].toUpperCase().includes(value.toUpperCase());
                    })}
                    orm={orm}
                    onLoadMore={async (...args) => {
                        if (!onLoadMore) return;
                        this.setState({ showWaitCursor: true });
                        await onLoadMore(...args);
                        this.setState({ showWaitCursor: false });
                    }}
                    showWaitCursor={showWaitCursor}
                    hasMore={hasMore}
                />
            );

            return [
                results,
            ];
        }

        if (showWaitCursor) {
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
                inputComponent={inputComponent}
                ref={boxRef}
                onAddTag={data => onSelect(undefined, { [orm.identifier]: data.text, [orm.showName]: data.text })}
                value={value}
                onChange={this.handleOnChange}
                onFocus={this.handleOnFocus}
                boxClassName={classnames('cc__person-finder__overlay', boxClassName)}
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
    }).isRequired,
    data: PropTypes.arrayOf(PropTypes.object),
    hasMore: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
    onLoadMore: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    selectedValue: PropTypes.bool,
    inputComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
    boxClassName: PropTypes.string,
    parent: PropTypes.instanceOf(Element),
    boxRef: PropTypes.func,
};

PersonFinderView.defaultProps = {
    value: '',
    data: [],
    hasMore: false,
    onLoadMore: null,
    selectedValue: false,
    boxClassName: null,
    parent: document.querySelector('.tapp'),
    boxRef: null,
};

export default PersonFinderView;
