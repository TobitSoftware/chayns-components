import { useRect } from '@reach/rect';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Input from '../../react-chayns-input/component/Input';
import TappPortal from '../../react-chayns-tapp_portal/component/TappPortal';
import { isFunction } from '../../utils/is';
import { isServer } from '../../utils/isServer';

const InputBox = ({
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
    ...props
}) => {
    const wrapperRef = useRef();
    const boxRef = useRef();

    const [parentElement, setParentElement] = useState(() =>
        isServer() ? null : document.createElement('div')
    );

    useEffect(
        function populateParentElement() {
            if (!parentElement) {
                setParentElement(document.createElement('div'));
            }
        },
        [parentElement]
    );

    useEffect(
        // eslint-disable-next-line consistent-return
        function mountParentDiv() {
            if (parentElement) {
                parentElement.style.position = 'absolute';
                parentElement.style.top = 0;
                parentElement.style.right = 0;
                parentElement.style.bottom = 0;
                parentElement.style.left = 0;
                parentElement.style.pointerEvents = 'none';

                document.body.appendChild(parentElement);

                return () => {
                    parentElement.remove();
                };
            }
        },
        [parentElement]
    );

    const [isHidden, setIsHidden] = useState(true);

    const rect = useRect(wrapperRef);

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

    function handleFocus(e) {
        setIsHidden(false);

        if (onFocus) {
            return onFocus(e);
        }
        return null;
    }

    const setBoxRef = useCallback(
        (node) => {
            boxRef.current = node;

            if (overlayProps?.ref) {
                overlayProps.ref(node);
            }
        },
        [overlayProps]
    );

    if (!InputComponent) {
        return null;
    }

    const positionStyles = rect
        ? {
              width: `${rect.width}px`,
              top: `${rect.bottom}px`,
              left: `${rect.left}px`,
          }
        : null;

    return (
        <div
            style={{
                display: 'inline-block',
                ...style,
            }}
            className={classnames('cc__input-box', className)}
            ref={wrapperRef}
        >
            <InputComponent {...props} ref={inputRef} onFocus={handleFocus} />
            <TappPortal parent={parentElement}>
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
                            pointerEvents: 'auto',
                            ...overlayProps?.style,
                        }}
                        {...overlayProps}
                        ref={setBoxRef}
                    >
                        {children}
                    </div>
                )}
            </TappPortal>
        </div>
    );
};

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
};

InputBox.displayName = 'InputBox';

export default InputBox;
