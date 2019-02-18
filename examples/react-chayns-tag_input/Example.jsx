import React, { PureComponent } from 'react';

import ExampleContainer from '../ExampleContainer';
import TagInput from '../../src/react-chayns-tag_input/component/TagInput';

export default class TagInputExample extends PureComponent {
    state = {
        tags: [],
    };

    handleTagAdd = (tag) => {
        const { tags } = this.state;

        if (tags.indexOf(tag) === -1) {
            this.setState({
                tags: [...tags, tag],
            });
        }
    };

    handleTagRemove = (tag) => {
        const { tags } = this.state;

        this.setState({
            tags: tags.filter(t => tag.text !== t.text),
        });
    };

    render() {
        const { tags } = this.state;

        return (
            <ExampleContainer
                headline="TagInput"
                id="react-chayns-tag_input"
            >
                <TagInput
                    tags={tags}
                    onAddTag={this.handleTagAdd}
                    onRemoveTag={this.handleTagRemove}
                />
            </ExampleContainer>
        );
    }
}
