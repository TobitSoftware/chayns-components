import React, {
    FC,
    useCallback,
    useEffect,
    useMemo,
    useState,
    type ChangeEvent,
    type KeyboardEvent,
    type ReactElement,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Tag } from '../../types/tagInput';
import Badge from '../badge/Badge';
import Icon from '../icon/Icon';
import {
    StyledTagInput,
    StyledTagInputTagInput,
    StyledTagInputTagWrapper,
    StyledTagInputTagWrapperText,
} from './TagInput.styles';

export type TagInputProps = {
    /**
     * Function to be executed when a tag is added.
     */
    onAdd?: (tag: Tag) => void;
    /**
     * Function to be executed when a tag is removed.
     */
    onRemove?: (id: string) => void;
    /**
     * The placeholder that should be displayed.
     */
    placeholder?: string;
    /**
     * The tags that should be displayed.
     */
    tags?: Tag[];
};

const TagInput: FC<TagInputProps> = ({ placeholder, tags, onRemove, onAdd }) => {
    const [internalTags, setInternalTags] = useState<Tag[]>();
    const [currentValue, setCurrentValue] = useState('');

    useEffect(() => {
        if (tags) {
            setInternalTags(tags);
        }
    }, [tags]);

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                setCurrentValue((prevValue) => {
                    if (!prevValue) {
                        return '';
                    }

                    setInternalTags((prevTags) => {
                        const newTag = { id: uuidv4(), text: prevValue };

                        if (typeof onAdd === 'function') {
                            onAdd(newTag);
                        }

                        return prevTags ? [...prevTags, newTag] : [newTag];
                    });

                    return '';
                });
            }
        },
        [onAdd],
    );

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCurrentValue(event.target.value);
    };

    const handleIconClick = useCallback(
        (id: string) => {
            setInternalTags((prevState) => {
                const updatedTags = (prevState ?? []).filter((tag) => tag.id !== id);

                if (typeof onRemove === 'function') {
                    onRemove(id);
                }

                return updatedTags;
            });
        },
        [onRemove],
    );

    const content = useMemo(() => {
        const items: ReactElement[] = [];

        if (!internalTags) {
            return items;
        }

        internalTags.forEach(({ text, id }) => {
            items.push(
                <Badge key={`tag-input-${id}`}>
                    <StyledTagInputTagWrapper>
                        <StyledTagInputTagWrapperText>{text}</StyledTagInputTagWrapperText>
                        <Icon icons={['ts-wrong']} onClick={() => handleIconClick(id)} />
                    </StyledTagInputTagWrapper>
                </Badge>,
            );
        });

        return items;
    }, [handleIconClick, internalTags]);

    return useMemo(
        () => (
            <StyledTagInput>
                {content}
                <StyledTagInputTagInput
                    placeholder={tags && tags.length > 0 ? undefined : placeholder}
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                    value={currentValue}
                />
            </StyledTagInput>
        ),
        [content, currentValue, handleKeyDown, placeholder, tags],
    );
};

export default TagInput;
