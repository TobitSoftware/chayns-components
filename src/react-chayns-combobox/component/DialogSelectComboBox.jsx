/* eslint-disable jsx-a11y/click-events-have-key-events,react/forbid-prop-types */
import classNames from 'clsx';
import PropTypes from 'prop-types';
import React, {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { CSSTransition } from 'react-transition-group';
import Button from '../../react-chayns-button/component/Button';
import Icon from '../../react-chayns-icon/component/Icon';
import TappPortal from '../../react-chayns-tapp_portal/component/TappPortal';
import isDescendant from '../../utils/isDescendant';
import ComboBoxItem from './ComboBoxItem';

const DialogSelectComboBox = ({
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
    const [width, setWidth] = useState(null);
    const mounted = useRef(false);

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

    const getItem = useCallback(
        (key) => {
            if (key === null || key === undefined) {
                return list[0];
            }
            return list.find((item) => String(item[listKey]) === String(key));
        },
        [list, listKey]
    );

    useLayoutEffect(() => {
        const resize = () => {
            let max = 0;
            const clonedButton = buttonRef.current.cloneNode(true);
            clonedButton.style.position = 'absolute';
            clonedButton.style.visibility = 'hidden';
            clonedButton.style.width = '';
            clonedButton.style.maxWidth = '';
            buttonRef.current.parentElement.insertBefore(
                clonedButton,
                buttonRef.current
            );
            max = Math.max(max, clonedButton.getBoundingClientRect().width);
            list.forEach((item) => {
                clonedButton.children[0].innerHTML = React.isValidElement(
                    item[listValue]
                )
                    ? renderToStaticMarkup(item[listValue])
                    : item[listValue];
                max = Math.max(max, clonedButton.getBoundingClientRect().width);
            });
            buttonRef.current.parentElement.removeChild(clonedButton);
            setWidth(max);
        };
        // check if font awesome is loaded and resize again
        // required cause calculated width might be wrong before font is loaded
        if (!document.fonts.check('15px "Font Awesome 6 Pro"')) {
            document.fonts.addEventListener('loadingdone', () => {
                resize();
            });
        }
        resize();
    }, [list, listValue, selected, label]);

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

    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
        } else {
            setSelected(value);
        }
    }, [value]);

    const select = useCallback(
        (selection) => {
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
        },
        [getItem, list, listKey, onSelect]
    );

    const onButtonClick = useCallback(
        (e) => {
            if (stopPropagation) {
                e.stopPropagation();
            }

            if (chayns.env.isMobile) {
                const items = list.map((item) => ({
                    name: React.isValidElement(item[listValue])
                        ? renderToStaticMarkup(item[listValue])
                        : item[listValue],
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
                const parentElement = parent || document.querySelector('.tapp');
                if (
                    parentElement &&
                    window.getComputedStyle(parentElement).position ===
                        'relative'
                ) {
                    const rect = e.target.getBoundingClientRect();
                    const parentRect = parentElement.getBoundingClientRect();
                    setPosition({
                        bottom: rect.bottom - parentRect.top,
                        left: rect.left - parentRect.left,
                        width: rect.width,
                    });
                } else {
                    setPosition(e.target.getBoundingClientRect());
                }
                setShowOverlay(!showOverlay);
            }
        },
        [
            setPosition,
            setShowOverlay,
            showOverlay,
            selected,
            stopPropagation,
            list,
            listKey,
            listValue,
            select,
            value,
            parent,
        ]
    );

    return [
        <Button
            key="combobox-button"
            secondary
            ref={buttonRef}
            onClick={onButtonClick}
            className={classNames('cc__combo-box', className, {
                'cc__combo-box--disabled': disabled,
            })}
            style={{ width, ...style }}
        >
            <div className="cc__combo-box__label ellipsis">
                {(selected === null ||
                    selected === undefined ||
                    !getItem(selected)) &&
                value === null &&
                label
                    ? label
                    : (getItem(value !== null ? value : selected) ??
                          getItem(selected))[listValue]}
            </div>
            <Icon className="cc__combo-box__icon" icon="fa fa-chevron-down" />
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
                        <ComboBoxItem
                            key={item[listKey]}
                            id={item[listKey]}
                            value={item[listValue]}
                            setShowOverlay={setShowOverlay}
                            onSelect={select}
                        />
                    ))}
                </div>
            </CSSTransition>
        </TappPortal>,
    ];
};

export default DialogSelectComboBox;

DialogSelectComboBox.propTypes = {
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

DialogSelectComboBox.defaultProps = {
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
