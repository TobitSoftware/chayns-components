/* eslint-disable jsx-a11y/click-events-have-key-events,react/forbid-prop-types */
import React, { useState, useRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import Button from '../../react-chayns-button/component/Button';
import TappPortal from '../../react-chayns-tapp_portal/component/TappPortal';
import './ComboBox.scss';
import isDescendant from '../../utils/isDescendant';
import Icon from '../../react-chayns-icon/component/Icon';

const ComboBox = ({
    className, label, list, disabled, listValue, listKey, stopPropagation, defaultValue, parent, onSelect, style,
}) => {
    const [position, setPosition] = useState({
        bottom: 0,
        left: 0,
        width: 0,
    });
    const [showOverlay, setShowOverlay] = useState(false);
    const [selected, setSelected] = useState(defaultValue || label ? defaultValue : 0);
    const [minWidth, setMinWidth] = useState('0px');

    const overlayRef = useRef(null);
    const buttonRef = useRef(null);

    const onHide = useCallback((e) => {
        if (!(isDescendant(overlayRef.current, e.target) || buttonRef.current === e.target)) {
            setShowOverlay(false);
        }
    }, []);

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

    const onButtonClick = useCallback((e) => {
        setPosition(e.target.getBoundingClientRect());
        setShowOverlay(!showOverlay);
        setMinWidth(`${buttonRef.current.getBoundingClientRect().width}px`);
        if (stopPropagation) e.stopPropagation();
    }, [setPosition, setShowOverlay, setMinWidth, showOverlay]);

    const onItemClick = useCallback((e) => {
        const selection = e.target.id;
        if (onSelect && list && list.length > 0 && listKey && selection) {
            onSelect(list.find((item) => String(item[listKey]) === selection));
        }
        setSelected(selection);
        setShowOverlay(false);
        if (stopPropagation) e.stopPropagation();
    }, [setSelected, setShowOverlay, onSelect, list, listKey]);

    return [
        <Button
            key="combobox-button"
            secondary
            ref={buttonRef}
            onClick={onButtonClick}
            className={classNames('cc__combo-box', className, { 'cc__combo-box--disabled': disabled })}
            style={{ minWidth, ...style }}
        >
            <div className="cc__combo-box__label">{selected ? list.find((item) => String(item[listKey]) === selected)[listValue] : label}</div>
            <Icon className="cc__combo-box__icon" icon="fa fa-caret-down"/>
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
                    className={classNames('cc__combo-box__overlay scrollbar chayns__background-color--101 chayns__border-color--104', className)}
                    style={{
                        top: position.bottom,
                        left: position.left,
                        width: position.width,
                        ...style,
                    }}
                >
                    {list.map((item) => (
                        <div key={item[listKey]} id={item[listKey]} className="cc__combo-box__overlay__item ellipsis" onClick={onItemClick}>
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
};

ComboBox.displayName = 'ComboBox';
