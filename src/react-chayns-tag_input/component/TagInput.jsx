import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tag from './Tag';
import Input from '../../react-chayns-input/component/Input';
import getInputSize from '../utils/getInputSize';

const KEY_BACKSPACE = 8;
const KEY_ENTER = 13;

const BIGGEST_LETTER = 'm';

export default class TagInput extends Component {
    static propTypes = {
        tags: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string,
        })).isRequired,
        value: PropTypes.string,
        onAddTag: PropTypes.func,
        onRemoveTag: PropTypes.func,
        onChange: PropTypes.func,
        placeholder: PropTypes.string,
    };

    static defaultProps = {
        onAddTag: null,
        onRemoveTag: null,
        placeholder: null,
        onChange: null,
        value: '',
    };

    state = {
        selectedIndex: null,
    };

    constructor(props) {
        super(props);

        this.setInputRef = this.setInputRef.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleTagRemove = this.handleTagRemove.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    setInputRef(ref) {
        this.input = ref;
    }

    handleChange(value) {
        const { onChange } = this.props;

        this.setState({
            selectedIndex: null,
        });

        if (onChange) {
            onChange(value);
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
            ...props
        } = this.props;
        const { selectedIndex } = this.state;

        const { width } = getInputSize(`${value}${BIGGEST_LETTER}`);

        return (
            <div
                onClick={this.handleClick}
                className="cc__tag-input input"
            >
                {tags && tags.map((tag, index) => (
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
                        className="cc__tag-input__input"
                        value={value}
                        onChange={this.handleChange}
                        onKeyUp={this.handleKeyUp}
                        placeholder={(!tags || !tags.length) ? placeholder : null}
                        style={{
                            width,
                        }}
                    />
                </div>
            </div>
        );
    }
}
