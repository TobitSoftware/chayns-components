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
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            selectedIndex: null,
        };
    }

    setInputRef(ref) {
        this.input = ref;
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

    handleKeyUp(event) {
        const { value } = this.props;

        if (event.keyCode === KEY_BACKSPACE && !value) {
            this.handleRemoveLast();
            return;
        }

        if (event.keyCode !== KEY_ENTER || !value) {
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

    handleTagRemove(tag) {
        const { onRemoveTag } = this.props;

        if (onRemoveTag) {
            onRemoveTag(tag);
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
            ...props
        } = this.props;
        const { selectedIndex } = this.state;

        const { width } = getInputSize(
            `${value || tags.length > 0 ? value : placeholder}${BIGGEST_LETTER}`
        );
        const inputStyle = {
            width: `${width}px`,
            minWidth: '20px',
        };

        return (
            <div
                onClick={this.handleClick}
                className={classNames(className, 'cc__tag-input input')}
                style={style}
            >
                {tags &&
                    tags.map((tag, index) => (
                        <Tag
                            key={tag.id || index}
                            value={tag}
                            onDelete={this.handleTagRemove}
                            selected={selectedIndex === index}
                        >
                            {tag.text}
                        </Tag>
                    ))}
                <div className="cc__tag-input__input">
                    <Input
                        {...props}
                        inputRef={this.setInputRef}
                        value={value}
                        onChange={this.handleChange}
                        onKeyUp={this.handleKeyUp}
                        placeholder={!tags || !tags.length ? placeholder : null}
                        style={inputStyle}
                    />
                </div>
            </div>
        );
    }
}

TagInput.propTypes = {
    /**
     * An array of the current tags.
     */
    tags: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string,
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
};

TagInput.displayName = 'TagInput';
