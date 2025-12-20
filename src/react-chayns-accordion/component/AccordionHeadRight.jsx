import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTransitionState } from 'react-transition-state';
import { mapStatusToClass } from '../../utils/mapStatusToClass';
import AccordionSearch from './AccordionSearch';

const OPEN = 2;
const CLOSE = 1;

const AccordionHeadRight = ({
    right,
    onSearch,
    onSearchEnter,
    searchPlaceholder,
    searchValue,
    state,
}) => {
    const rightHasState = right && !!(right.open || right.close);
    const openChildren = rightHasState ? right.open : null;
    const closeChildren = rightHasState ? right.close : right;

    const [{ status: closeStatus, isMounted: closeMounted }, toggleClose] =
        useTransitionState({
            timeout: 500,
            mountOnEnter: true,
            unmountOnExit: true,
            preEnter: true,
            initialEntered: state === CLOSE,
        });

    const [{ status: openStatus, isMounted: openMounted }, toggleOpen] =
        useTransitionState({
            timeout: 500,
            mountOnEnter: true,
            unmountOnExit: true,
            preEnter: true,
            initialEntered: state === OPEN,
        });

    // Trigger transitions
    useEffect(() => {
        toggleClose(state === CLOSE);
        toggleOpen(state === OPEN);
    }, [state, toggleClose, toggleOpen]);

    const renderOpen = () => {
        if (openChildren) return openChildren;

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
    };

    if (!(right || onSearch || onSearchEnter)) {
        return null;
    }

    if (!(onSearch || onSearchEnter || rightHasState)) {
        return <div className="accordion__head__right">{closeChildren}</div>;
    }

    return (
        <div className="accordion__head__right">
            {closeMounted && (
                <div
                    key="closed"
                    className={mapStatusToClass(
                        closeStatus,
                        'right--background'
                    )}
                >
                    {closeChildren}
                </div>
            )}
            {openMounted && (
                <div
                    key="open"
                    className={mapStatusToClass(
                        openStatus,
                        'right--foreground'
                    )}
                >
                    {renderOpen()}
                </div>
            )}
        </div>
    );
};

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
    searchValue: undefined,
    state: null,
};

AccordionHeadRight.displayName = 'AccordionHeadRight';

export default AccordionHeadRight;
