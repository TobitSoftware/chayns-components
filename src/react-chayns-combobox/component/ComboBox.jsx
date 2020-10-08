/* eslint-disable jsx-a11y/click-events-have-key-events,react/forbid-prop-types */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Button from '../../react-chayns-button/component/Button';
import Icon from '../../react-chayns-icon/component/Icon';
import TappPortal from '../../react-chayns-tapp_portal/component/TappPortal';
import isDescendant from '../../utils/isDescendant';
import './ComboBox.scss';

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

    return [
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
        </Button>,
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
        </TappPortal>,
    ];
};

export default ComboBox;

ComboBox.propTypes = {
    onSelect: PropTypes.func,
    disabled: PropTypes.bool,
    label: PropTypes.string,
    list: PropTypes.array.isRequired,
    listKey: PropTypes.string.isRequired,
    listValue: PropTypes.string.isRequired,
    className: PropTypes.string,
    defaultValue: PropTypes.string,
    stopPropagation: PropTypes.bool,
    parent: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    style: PropTypes.object,
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
