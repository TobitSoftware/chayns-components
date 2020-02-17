import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import AccordionSearch from './AccordionSearch';

const OPEN = 2;
const CLOSE = 1;

export default class AccordionHeadRight extends PureComponent {
    renderOpen(openChildren) {
        const {
            onSearch,
            onSearchEnter,
            searchPlaceholder,
            searchValue,
            state,
        } = this.props;

        if (openChildren) {
            return openChildren;
        }

        if (onSearch || onSearchEnter) {
            return (
                <AccordionSearch
                    onSearch={onSearch}
                    onSearchEnter={onSearchEnter}
                    currentState={state}
                    searchPlaceholder={searchPlaceholder}
                    searchValue={searchValue}
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

        const rightHasState = right && !!(right.open || right.close);
        const openChildren = rightHasState ? right.open : null;
        const closeChildren = rightHasState ? right.close : right;

        if (!(onSearch || onSearchEnter || rightHasState)) {
            return (
                <div className="accordion__head__right">
                    {closeChildren}
                </div>
            );
        }

        return (
            <div className="accordion__head__right">
                <CSSTransition
                    key="closed"
                    classNames="right--background"
                    timeout={520}
                    in={state === CLOSE}
                    unmountOnExit
                >
                    <div>
                        {closeChildren}
                    </div>
                </CSSTransition>
                <CSSTransition
                    key="open"
                    classNames="right--foreground"
                    timeout={500}
                    in={state === OPEN}
                    unmountOnExit
                >
                    <div>{this.renderOpen(openChildren)}</div>
                </CSSTransition>
            </div>
        );
    }
}

AccordionHeadRight.propTypes = {
    right: PropTypes.oneOfType([
        PropTypes.node.isRequired,
        PropTypes.shape({
            open: PropTypes.node.isRequired,
            close: PropTypes.node.isRequired,
        }).isRequired,
    ]),
    onSearch: PropTypes.func,
    onSearchEnter: PropTypes.func,
    searchPlaceholder: PropTypes.string,
    searchValue: PropTypes.string,
    state: PropTypes.oneOf([OPEN, CLOSE]),
};

AccordionHeadRight.defaultProps = {
    right: null,
    onSearch: null,
    onSearchEnter: null,
    searchPlaceholder: '',
    searchValue: null,
    state: null,
};
