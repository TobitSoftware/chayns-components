/**
 * @component
 */

import classnames from 'clsx';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';

const DEFAULT_STYLE = {
    width: '100%',
    paddingBottom: '12px',
};

/**
 * A multiline text input that can automatically grow with its content.
 */
const TextArea = ({
    style: styleProp,
    className,
    placeholder,
    defaultValue,
    design,
    onChange,
    autogrow,
    onBlur,
    onKeyUp,
    onKeyDown,
    value,
    disabled,
    required,
    stopPropagation,
    reference,
    ...props
}) => {
    const ref = useRef(null);
    const [offset, setOffset] = useState(0);

    const grow = useCallback(() => {
        ref.current.style.height = '0px';
        ref.current.style.height = `${ref.current.scrollHeight + offset}px`;
    }, [offset]);

    // update in value prop
    useEffect(() => {
        if (autogrow) {
            grow();
        }
    }, [grow, autogrow, value]);

    // reference or prop change executes initialisation code
    const setRef = useCallback(
        (node) => {
            ref.current = node;

            if (node) {
                if (required) {
                    node.setAttribute('required', '');
                }

                node.setAttribute('row', '1');
                // eslint-disable-next-line no-param-reassign
                node.style.overflow = 'hidden';

                if (autogrow) {
                    setOffset(node.offsetHeight - node.clientHeight);

                    grow();
                }
            }

            if (reference) {
                reference(node);
            }
        },
        [reference, required, autogrow, grow]
    );

    // autogrows on change and pass value to onChange-prop
    const handleChange = useCallback(() => {
        if (onChange) {
            onChange(ref.current.value);
        }

        if (autogrow) {
            grow();
        }
    }, [grow, onChange, autogrow]);

    // pass only value to onBlur-prop
    const handleBlur = useCallback(() => {
        if (onBlur) {
            onBlur(ref.current.value); // TODO: Get data from event
        }
    }, [onBlur]);

    const style = {
        ...DEFAULT_STYLE,
        ...styleProp,
    };

    const classNames = classnames(
        'input',
        {
            'input--disabled': disabled,
            'input--border-design': design === TextArea.BORDER_DESIGN,
        },
        className
    );

    return (
        <textarea
            className={classNames}
            ref={setRef}
            placeholder={placeholder}
            style={style}
            defaultValue={defaultValue}
            onChange={handleChange}
            onBlur={onBlur ? handleBlur : null}
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}
            value={value}
            disabled={disabled}
            onClick={
                stopPropagation ? (event) => event.stopPropagation() : null
            }
            {...props}
        />
    );
};

TextArea.DEFAULT_DESIGN = 0;
TextArea.BORDER_DESIGN = 1;

TextArea.propTypes = {
    /**
     * A React style object that will be applied to the text area.
     */
    style: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),

    /**
     * Wether the component ignores any user interaction and is rendered with a
     * disabled style.
     */
    disabled: PropTypes.bool,

    /**
     * A classname string that will be applied to the `<textarea>`-element.
     */
    className: PropTypes.string,

    /**
     * A placeholder, that will be displayed if the text area is empty.
     */
    placeholder: PropTypes.string,

    /**
     * Wether the text area is required for a form to complete. Renders the text
     * area with an error style when its empty.
     */
    required: PropTypes.bool,

    /**
     * The design of the input. Use either `TextArea.DEFAULT_DESIGN` or
     * `TextArea.BORDER_DESIGN`.
     */
    design: PropTypes.number,

    /**
     * A callback that is invoked when the value of the `<textarea>` changes.
     */
    onChange: PropTypes.func,

    /**
     * A callback that is invoked when the text area loses focus.
     */
    onBlur: PropTypes.func,

    /**
     * The default value of the text area. Has no effect when the `value` prop
     * is used.
     */
    defaultValue: PropTypes.string,

    /**
     * The current text value of the area.
     */
    value: PropTypes.string,

    /**
     * A callback that will be called when the `keyup`-event is fired from the
     * `<textarea>`-element.
     */
    onKeyUp: PropTypes.func,

    /**
     * A callback that will be called when the `keydown`-event is fired from the
     * `<textarea>`-element.
     */
    onKeyDown: PropTypes.func,

    /**
     * Wether the text area should automatically grow with its content.
     */
    autogrow: PropTypes.bool,

    /**
     * A function that will be invoked with a reference to the
     * `<textarea>`-element or `null`.
     */
    reference: PropTypes.func,

    /**
     * Wether click events should be stopped from propagating to parent
     * elements.
     */
    stopPropagation: PropTypes.bool,
};

TextArea.defaultProps = {
    style: null,
    className: null,
    placeholder: null,
    design: TextArea.DEFAULT_DESIGN,
    required: null,
    onChange: null,
    onBlur: null,
    defaultValue: undefined,
    value: undefined,
    onKeyUp: null,
    onKeyDown: null,
    autogrow: null,
    reference: null,
    disabled: false,
    stopPropagation: false,
};

TextArea.displayName = 'TextArea';

export default TextArea;
