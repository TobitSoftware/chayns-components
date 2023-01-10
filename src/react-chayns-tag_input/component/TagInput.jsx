/**
 * @component
 */

import classNames from 'clsx';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Input from '../../react-chayns-input/component/Input';
import getInputSize from '../utils/getInputSize';
import Tag from './Tag';

const KEY_BACKSPACE = 8;
const KEY_ENTER = 13;
const KEY_COMMA = 188;

const BIGGEST_LETTER = 'm';

/**
 * A text input that allows values to be grouped as tags.
 */
export default class TagInput extends Component {
    constructor(props) {
        super(props);

        this.setInputRef = this.setInputRef.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleTagRemove = this.handleTagRemove.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            selectedIndex: null,
        };
    }

    componentDidUpdate(prevProps) {
        const { value, triggerEventOnValueChange } = this.props;

        if (triggerEventOnValueChange && value !== prevProps.value) {
            this.handleChange(value);
        }
    }

    handleChange(...value) {
        const { onChange } = this.props;

        this.setState({
            selectedIndex: null,
        });

        if (onChange) {
            onChange(...value);
        }
    }

    handleKeyDown = (event) => {
        const { onKeyDown } = this.props;
        if (onKeyDown) {
            onKeyDown(event);
        }
        if (event.keyCode === KEY_COMMA) {
            event.preventDefault();
        }
    };

    handleKeyUp(event) {
        const { value, disableRemove } = this.props;

        if (event.keyCode === KEY_BACKSPACE && !value && !disableRemove) {
            this.handleRemoveLast();
            return;
        }

        if (![KEY_ENTER, KEY_COMMA].includes(event.keyCode) || !value) {
            return;
        }

        const tag = {
            text: value,
        };

        this.handleTagAdd(tag);
    }

    handleTagAdd(tag) {
        const { onAddTag } = this.props;

        if (onAddTag) {
            onAddTag(tag);
        }
    }

    handleTagRemove(tag, ev) {
        const { onRemoveTag } = this.props;

        if (onRemoveTag) {
            onRemoveTag(tag, ev);
        }
    }

    handleRemoveLast() {
        const { tags } = this.props;
        const { selectedIndex } = this.state;

        const lastTagIndex = tags.length - 1;

        if (selectedIndex !== lastTagIndex) {
            this.setState({
                selectedIndex: lastTagIndex,
            });
            return;
        }

        this.setState({
            selectedIndex: null,
        });

        this.handleTagRemove(tags[lastTagIndex]);
    }

    handleClick() {
        if (this.input) {
            this.input.focus();
        }
    }

    handleBlur() {
        const { value } = this.props;

        if (value) {
            const tag = {
                text: value,
            };

            this.handleTagAdd(tag);
        }
    }

    setInputRef(ref) {
        this.input = ref;
    }

    focus() {
        if (!this.input) {
            return false;
        }

        this.input.focus();
        return true;
    }

    render() {
        const {
            tags,
            placeholder,
            value,
            className,
            style,
            disableRemove,
            design,
            max,
            addTagOnBlur,
            left,
            ...props
        } = this.props;
        const { selectedIndex } = this.state;

        const { width } = getInputSize(
            `${value || tags.length > 0 ? value : placeholder}${BIGGEST_LETTER}`
        );
        const inputStyle = {
            width: `${width + 20}px`,
            minWidth: '20px',
        };

        return (
            <div
                onClick={this.handleClick}
                className={classNames(className, 'cc__tag-input input', {
                    'cc__tag-input--border-design':
                        design === Input.BORDER_DESIGN,
                })}
                style={style}
            >
                {left}
                {tags &&
                    tags.map((tag, index) => (
                        <Tag
                            key={tag.id || index}
                            value={tag}
                            onDelete={this.handleTagRemove}
                            selected={selectedIndex === index}
                            disableRemove={disableRemove}
                        >
                            {tag.text}
                        </Tag>
                    ))}
                {max && tags && max === tags?.length ? (
                    false
                ) : (
                    <div className="cc__tag-input__input">
                        <Input
                            {...props}
                            inputRef={this.setInputRef}
                            value={value}
                            onChange={this.handleChange}
                            onKeyUp={this.handleKeyUp}
                            onKeyDown={this.handleKeyDown}
                            placeholder={
                                !tags || !tags.length ? placeholder : null
                            }
                            style={inputStyle}
                            onBlur={addTagOnBlur ? this.handleBlur : undefined}
                        />
                    </div>
                )}
            </div>
        );
    }
}

TagInput.DEFAULT_DESIGN = 0;
TagInput.BORDER_DESIGN = 1;

TagInput.propTypes = {
    /**
     * An array of the current tags.
     */
    tags: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        })
    ),

    /**
     * The text value of the tag input.
     */
    value: PropTypes.string,

    /**
     * A callback that is invoked when the user adds a new tag (hits the
     * `enter`-key).
     */
    onAddTag: PropTypes.func,

    /**
     * A callback that is invoked when the user removes a tag.
     */
    onRemoveTag: PropTypes.func,

    /**
     * A callback that is invoked when the user changes the text inside the tag
     * input.
     */
    onChange: PropTypes.func,

    /**
     * A placeholder that is shown when the tag input is empty (does neither
     * container a tag or text).
     */
    placeholder: PropTypes.string,

    /**
     * A classname string that will be applied to the outer-most wrapper of the
     * input.
     */
    className: PropTypes.string,

    /**
     * A React style object that will be applied to the outer-most wrapper of
     * the input.
     */
    style: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),
    triggerEventOnValueChange: PropTypes.bool,
    /**
     * Prevents removal of selected users and hides remove icon.
     */
    disableRemove: PropTypes.bool,
    /**
     * The design of the input. Use either `TagInput.DEFAULT_DESIGN` or
     * `TagInput.BORDER_DESIGN`.
     */
    design: PropTypes.number,
    /**
     * The maximum number of tags selected at once.
     */
    max: PropTypes.number,
    /**
     * Adds a tag on blur
     */
    addTagOnBlur: PropTypes.bool,

    /**
     * A string or `ReactNode` that will be rendered on the left side of the
     * tag input.
     */
    left: PropTypes.node,
    /**
     * A callback for the `keydown`-event.
     */
    onKeyDown: PropTypes.func,
};

TagInput.defaultProps = {
    tags: null,
    onAddTag: null,
    onRemoveTag: null,
    placeholder: null,
    onChange: null,
    value: '',
    className: null,
    style: null,
    triggerEventOnValueChange: false,
    disableRemove: false,
    design: TagInput.DEFAULT_DESIGN,
    max: null,
    addTagOnBlur: false,
    left: null,
    onKeyDown: null,
};

TagInput.displayName = 'TagInput';
