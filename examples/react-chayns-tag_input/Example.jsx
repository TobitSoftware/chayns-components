import React, { PureComponent } from 'react';

import TagInput from '../../src/react-chayns-tag_input/component/TagInput';
import { Button } from '../../src';

export default class TagInputExample extends PureComponent {
    state = {
        tags: [],
        value: '',
    };

    handleChange = (value) => {
        this.setState({
            value,
        });
    };

    handleTagAdd = (tag) => {
        const { tags } = this.state;

        console.log('add tag', tag);

        if (!tags.find((t) => t.text === tag.text)) {
            this.setState({
                tags: [...tags, tag],
                value: '',
            });
        }
    };

    handleTagRemove = (tag) => {
        const { tags } = this.state;

        this.setState({
            tags: tags.filter((t) => tag.text !== t.text),
        });
    };

    clearValue = () => {
        this.handleChange('');
    };

    clearTags = () => {
        this.setState({ tags: [] });
    };

    focus = () => {
        if (this.input) this.input.focus();
    };

    render() {
        const { tags, value } = this.state;

        return (
            <div>
                <TagInput
                    ref={(ref) => {
                        this.input = ref;
                    }}
                    tags={tags}
                    onAddTag={this.handleTagAdd}
                    onRemoveTag={this.handleTagRemove}
                    onChange={this.handleChange}
                    placeholder="Input tag and hit ENTER"
                    value={value}
                />
                <Button onClick={this.clearValue}>Clear input</Button>
                <Button onClick={this.clearTags}>Clear tags</Button>
                <Button onClick={this.focus}>Focus()</Button>
            </div>
        );
    }
}
