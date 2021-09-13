import { useRect } from '@reach/rect';
import classnames from 'clsx';
import PropTypes from 'prop-types';
import React, {
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import Overlay from '../../components/overlay/Overlay';
import Input from '../../react-chayns-input/component/Input';
import { isFunction } from '../../utils/is';
import { isServer } from '../../utils/isServer';

const InputBox = React.forwardRef((props, ref) => {
    const {
        inputComponent: InputComponent,
        children,
        parent,
        inputRef,
        onFocus,
        className,
        overlayProps,
        boxClassName,
        style,
        onBlur,
        hasOpenCloseIcon,
        renderInline,
        hideInput,
        ...restProps
    } = props;

    const wrapperRef = useRef();
    const boxRef = useRef();

    const [isHidden, setIsHidden] = useState(true);

    const rect = useRect(wrapperRef);

    useImperativeHandle(
        ref,
        () => ({
            focus() {
                setIsHidden(false);
            },
            blur() {
                setIsHidden(true);
            },
            getHiddenState() {
                return isHidden;
            },
        }),
        [isHidden]
    );

    useEffect(() => {
        function handleBlur(event) {
            if (isHidden) return;

            if (
                wrapperRef.current?.contains(event.target) ||
                boxRef.current?.contains(event.target)
            ) {
                return;
            }

            setIsHidden(true);

            if (onBlur && isFunction(onBlur)) {
                onBlur(event);
            }
        }

        function hide() {
            setIsHidden(true);
        }

        function handleKeyDown({ keyCode, target }) {
            if (keyCode === 9 && wrapperRef.current?.contains(target)) {
                hide();
            }
        }

        document.addEventListener('mousedown', handleBlur);
        document.addEventListener('touchstart', handleBlur);

        window.addEventListener('blur', hide);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('mousedown', handleBlur);
            document.removeEventListener('touchstart', handleBlur);

            window.removeEventListener('blur', hide);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isHidden, onBlur]);

    const handleFocus = (e) => {
        setIsHidden(false);

        if (onFocus) {
            return onFocus(e);
        }
        return null;
    };

    const setBoxRef = useCallback(
        (node) => {
            boxRef.current = node;

            if (overlayProps?.ref) {
                overlayProps.ref(node);
            }
        },
        [overlayProps]
    );

    const toggle = useCallback((event) => {
        setIsHidden((hidden) => !hidden);
        event.stopPropagation();
    }, []);

    if (!InputComponent) {
        return null;
    }

    const parentElement = !isServer() ? parent || document.body : null;
    const parentRect = parentElement?.getBoundingClientRect();

    const positionStyles = rect
        ? {
              width: `${rect.width}px`,
              top: `${rect.bottom - (parentRect?.top ?? 0)}px`,
              left: `${rect.left - (parentRect?.left ?? 0)}px`,
          }
        : null;

    return (
        <div
            style={{
                display: renderInline ? 'flex' : 'inline-block',
                ...(renderInline
                    ? { height: '100%', flexDirection: 'column' }
                    : {}),
                ...style,
            }}
            className={classnames(
                { 'cc__input-box': !renderInline },
                className
            )}
            ref={wrapperRef}
        >
            <InputComponent
                {...restProps}
                icon={hasOpenCloseIcon ? 'fa fa-chevron-down' : restProps.icon}
                onIconClick={hasOpenCloseIcon ? toggle : restProps.onIconClick}
                style={
                    renderInline && hideInput
                        ? { position: 'absolute', visibility: 'hidden' }
                        : undefined
                }
                ref={inputRef}
                onFocus={handleFocus}
            />
            {renderInline ? (
                <div
                    className="cc__input-box--inline-wrapper scrollbar"
                    style={{
                        marginTop: !hideInput ? 20 : 0,
                        overflow: 'hidden auto',
                    }}
                >
                    {children}
                </div>
            ) : (
                <Overlay parent={parent}>
                    {!!(rect && !isHidden && children) && (
                        <div
                            onClick={(e) => e.preventDefault()}
                            className={classnames(
                                'cc__input-box__overlay',
                                'scrollbar',
                                boxClassName
                            )}
                            style={{
                                ...positionStyles,
                                ...overlayProps?.style,
                            }}
                            {...overlayProps}
                            ref={setBoxRef}
                        >
                            {children}
                        </div>
                    )}
                </Overlay>
            )}
        </div>
    );
});

InputBox.propTypes = {
    onBlur: PropTypes.func,
    inputComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    parent:
        typeof Element !== 'undefined'
            ? PropTypes.instanceOf(Element)
            : () => {},
    onFocus: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
    className: PropTypes.string,
    boxClassName: PropTypes.string,
    inputRef: PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    overlayProps: PropTypes.object,
    style: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),
    hasOpenCloseIcon: PropTypes.bool,
    renderInline: PropTypes.bool,
    hideInput: PropTypes.bool,
};

InputBox.defaultProps = {
    onBlur: null,
    inputComponent: Input,
    parent: null,
    onFocus: null,
    children: null,
    className: null,
    boxClassName: null,
    inputRef: null,
    overlayProps: null,
    style: null,
    hasOpenCloseIcon: false,
    renderInline: false,
    hideInput: false,
};

InputBox.displayName = 'InputBox';

export default InputBox;
