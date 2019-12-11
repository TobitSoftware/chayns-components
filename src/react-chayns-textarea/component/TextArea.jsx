import React, {
    useRef,
    useCallback,
    useState,
    useEffect,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const DEFAULT_STYLE = {
    width: '100%',
    paddingBottom: '12px',
};

const TextArea = ({
    style: styleProp,
    className,
    placeholder,
    defaultValue,
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

    const grow = useCallback((initHeight = '0px') => {
        if (initHeight) {
            ref.current.style.height = initHeight;
        }

        if (ref.current.scrollHeight + offset > 0) {
            ref.current.style.height = `${ref.current.scrollHeight + offset}px`;
        }
    }, [offset]);

    // update in value prop
    useEffect(() => {
        if (autogrow) {
            grow();
        }
    }, [grow, autogrow, value]);

    // reference or prop change executes initialisation code
    const setRef = useCallback((node) => {
        ref.current = node;

        if (node) {
            if (required) {
                node.setAttribute('required', '');
            }

            node.setAttribute('row', '1');
            node.style.overflow = 'hidden'; /* eslint-disable-line no-param-reassign */

            if (autogrow) {
                setOffset(node.offsetHeight - node.clientHeight);

                grow();
            }
        }

        if (reference) {
            reference(node);
        }
    }, [reference, setOffset, required, autogrow]);

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

    const classNames = classnames('input', {
        'input--disabled': disabled,
        className,
    });

    return (
        <textarea
            className={classNames}
            ref={setRef}
            placeholder={placeholder}
            style={style}
            defaultValue={defaultValue}
            onChange={(onChange || autogrow) ? handleChange : null}
            onBlur={onBlur ? handleBlur : null}
            onKeyUp={onKeyUp}
            onKeyDown={onKeyDown}
            value={value}
            disabled={disabled}
            onClick={stopPropagation ? event => event.stopPropagation() : null}
            {...props}
        />
    );
};

TextArea.defaultProps = {
    style: null,
    className: null,
    placeholder: null,
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

TextArea.propTypes = {
    style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    disabled: PropTypes.bool,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    defaultValue: PropTypes.string,
    value: PropTypes.string,
    onKeyUp: PropTypes.func,
    onKeyDown: PropTypes.func,
    autogrow: PropTypes.bool,
    reference: PropTypes.func,
    stopPropagation: PropTypes.bool,
};

export default TextArea;
