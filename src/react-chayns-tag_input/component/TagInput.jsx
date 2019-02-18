import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tag from './Tag';
import Input from '../../react-chayns-input/component/Input';

const KEY_BACKSPACE = 8;
const KEY_ENTER = 13;

export default class TagInput extends Component {
    static propTypes = {
        tags: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string,
        })).isRequired,
        onAddTag: PropTypes.func,
        onRemoveTag: PropTypes.func,
    };

    static defaultProps = {
        onAddTag: null,
        onRemoveTag: null,
    };

    state = {
        inputValue: '',
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
        this.setState({
            inputValue: value,
        });
    }

    handleKeyUp(event) {
        const { inputValue } = this.state;

        if (event.keyCode === KEY_BACKSPACE && !inputValue) {
            this.handleRemoveLast();
            return;
        }

        if (event.keyCode !== KEY_ENTER || !inputValue) {
            return;
        }

        const tag = {
            text: inputValue,
        };

        this.setState({
            inputValue: '',
        });

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

    render() {
        const { tags } = this.props;
        const { inputValue, selectedIndex } = this.state;

        return (
            <div
                onClick={this.handleClick}
                className="cc__tag-input input"
            >
                {tags && tags.map((tag, index) => (
                    <Tag
                        value={tag}
                        onDelete={this.handleTagRemove}
                        selected={selectedIndex === index}
                    >
                        {tag.text}
                    </Tag>
                ))}
                <Input
                    inputRef={this.setInputRef}
                    className="cc__tag-input__input"
                    value={inputValue}
                    onChange={this.handleChange}
                    onKeyUp={this.handleKeyUp}
                />
            </div>
        );
    }
}
