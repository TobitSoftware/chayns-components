import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import AccordionSearch from './AccordionSearch';
import AccordionRightAnimate from './AccordionRightAnimate';

const OPEN = 2;
const CLOSE = 1;

export default class AccordionHeadRight extends PureComponent {
    static propTypes = {
        right: PropTypes.oneOfType([
            PropTypes.node.isRequired,
            PropTypes.shape({
                open: PropTypes.node.isRequired,
                close: PropTypes.node.isRequired
            }).isRequired
        ]),
        onSearch: PropTypes.func,
        onSearchEnter: PropTypes.func,
        searchPlaceholder: PropTypes.string,
        state: PropTypes.oneOf([OPEN, CLOSE]),
    };

    static defaultProps = {
        right: null,
        onSearch: null,
        onSearchEnter: null,
        searchPlaceholder: '',
        state: null,
    };

    renderOpen(openChildren) {
        const {
            onSearch,
            onSearchEnter,
            searchPlaceholder,
            state,
        } = this.props;

        if (openChildren) {
            return (
                <AccordionRightAnimate currentState={state}>
                    {openChildren}
                </AccordionRightAnimate>
            );
        }

        if (onSearch || onSearchEnter) {
            return (
                <AccordionSearch
                    onSearch={onSearch}
                    onSearchEnter={onSearchEnter}
                    currentState={state}
                    searchPlaceholder={searchPlaceholder}
                />
            );
        }

        return null;
    }

    render() {
        const {
            right,
            onSearch,
            onSearchEnter,
            state,
        } = this.props;

        if (!(right || onSearch || onSearchEnter)) {
            return null;
        }

        const rightHasState = !!(right.open || right.close);
        const openChildren = rightHasState ? right.open : null;
        const closeChildren = rightHasState ? right.close : right;

        return (
            <div className="accordion__head__right">
                <div
                    className={classNames({
                        'right--animate': onSearch || onSearchEnter || rightHasState
                    })}
                    style={{ opacity: (onSearch || onSearchEnter || rightHasState) && state === OPEN ? 0 : 1 }}
                >
                    {closeChildren}
                </div>
                {this.renderOpen(openChildren)}
            </div>
        );
    }
}
