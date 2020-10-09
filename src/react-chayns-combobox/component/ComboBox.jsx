/**
 * @component
 */

import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Button from '../../react-chayns-button/component/Button';
import Icon from '../../react-chayns-icon/component/Icon';
import TappPortal from '../../react-chayns-tapp_portal/component/TappPortal';
import isDescendant from '../../utils/isDescendant';
import './ComboBox.scss';

/**
 * A custom select component that allows the user to select one of a list of
 * options.
 */
const ComboBox = ({
    className,
    label,
    list,
    disabled,
    listValue,
    listKey,
    stopPropagation,
    defaultValue,
    parent,
    onSelect,
    style,
    value,
}) => {
    const [position, setPosition] = useState({
        bottom: 0,
        left: 0,
        width: 0,
    });
    const [showOverlay, setShowOverlay] = useState(false);
    const [selected, setSelected] = useState(defaultValue);
    const [minWidth, setMinWidth] = useState('0px');

    const overlayRef = useRef(null);
    const buttonRef = useRef(null);

    const onHide = useCallback((e) => {
        if (
            !(
                isDescendant(overlayRef.current, e.target) ||
                buttonRef.current === e.target
            )
        ) {
            setShowOverlay(false);
        }
    }, []);

    const getItem = (key) => {
        if (key === null || key === undefined) {
            return list[0];
        }
        return list.find((item) => String(item[listKey]) === String(key));
    };

    useEffect(() => {
        if (showOverlay) {
            window.addEventListener('click', onHide);
            window.addEventListener('blur', onHide);
        }
        return () => {
            window.removeEventListener('click', onHide);
            window.removeEventListener('blur', onHide);
        };
    }, [showOverlay, onHide]);

    const select = (selection) => {
        setSelected(selection);
        if (
            onSelect &&
            list &&
            list.length > 0 &&
            listKey &&
            selection !== null &&
            selection !== undefined
        ) {
            onSelect(getItem(selection));
        }
    };

    const onButtonClick = (e) => {
        if (stopPropagation) e.stopPropagation();
        setMinWidth(`${buttonRef.current.getBoundingClientRect().width}px`);
        if (chayns.env.isMobile) {
            const items = list.map((item) => ({
                name: item[listValue],
                value: item[listKey],
                isSelected:
                    item[listKey] === (value !== null ? value : selected),
            }));
            chayns.dialog
                .select({
                    list: items,
                    buttons: [],
                })
                .then((result) => {
                    if (
                        result.buttonType === 1 &&
                        result.selection &&
                        result.selection[0]
                    ) {
                        select(result.selection[0].value);
                    }
                });
        } else {
            setPosition(e.target.getBoundingClientRect());
            setShowOverlay(!showOverlay);
        }
    };

    const onItemClick = (e) => {
        select(e.target.id);
        setShowOverlay(false);
        if (stopPropagation) e.stopPropagation();
    };

    return (
        <>
            <Button
                key="combobox-button"
                secondary
                ref={buttonRef}
                onClick={onButtonClick}
                className={classNames('cc__combo-box', className, {
                    'cc__combo-box--disabled': disabled,
                })}
                style={{ minWidth, ...style }}
            >
                <div className="cc__combo-box__label ellipsis">
                    {(selected === null || selected === undefined) &&
                    value === null &&
                    label
                        ? label
                        : getItem(value !== null ? value : selected)[listValue]}
                </div>
                <Icon className="cc__combo-box__icon" icon="fa fa-caret-down" />
            </Button>
            <TappPortal parent={parent} key="combobox-portal">
                <CSSTransition
                    in={!!(position && showOverlay)}
                    timeout={200}
                    mountOnEnter
                    classNames="fade"
                >
                    <div
                        ref={overlayRef}
                        className={classNames(
                            'cc__combo-box__overlay scrollbar chayns__background-color--101 chayns__border-color--104',
                            className
                        )}
                        style={{
                            top: position.bottom,
                            left: position.left,
                            width: position.width,
                            ...style,
                        }}
                    >
                        {list.map((item) => (
                            <div
                                key={item[listKey]}
                                id={item[listKey]}
                                className="cc__combo-box__overlay__item ellipsis"
                                onClick={onItemClick}
                            >
                                {item[listValue]}
                            </div>
                        ))}
                    </div>
                </CSSTransition>
            </TappPortal>
        </>
    );
};

export default ComboBox;

ComboBox.propTypes = {
    /**
     * This callback is called when an item is selected.
     */
    onSelect: PropTypes.func,

    /**
     * Disables any interactions and styles the combobox with a disabled style.
     */
    disabled: PropTypes.bool,

    /**
     * A placeholder value shown inside the combobox.
     */
    label: PropTypes.string,

    /**
     * An array of values to select from.
     */
    list: PropTypes.array.isRequired,

    /**
     * The name of the property on the list objects that uniquely identifies an
     * item.
     */
    listKey: PropTypes.string.isRequired,

    /**
     * The name of the property on the list objects that is shown as its name.
     */
    listValue: PropTypes.string.isRequired,

    /**
     * A classname string that will be applied to the Button component and the
     * overlay.
     */
    className: PropTypes.string,

    /**
     * The default value of the combobox. This does not work in combination with
     * the `label` or `value` props.
     */
    defaultValue: PropTypes.string,

    /**
     * Wether to stop the propagation of click events.
     */
    stopPropagation: PropTypes.bool,

    /**
     * The parent component of the combobox overlay.
     */
    parent: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),

    /**
     * A React style object that will be applied to the Button component and the
     *  overlay.
     */
    style: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),

    /**
     * The value of the combobox. This does not work in combination with the `
     * label`-prop.
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ComboBox.defaultProps = {
    label: null,
    className: null,
    onSelect: null,
    disabled: false,
    stopPropagation: false,
    defaultValue: null,
    parent: null,
    style: null,
    value: null,
};

ComboBox.displayName = 'ComboBox';
