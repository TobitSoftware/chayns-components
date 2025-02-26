import React, { FC } from 'react';
import {
    StyledPersonFinderInput,
    StyledPersonFinderInputLeftElement,
} from './PersonFinderInput.styles';
import { Icon, TagInput } from '@chayns-components/core';
import { PersonFinderInputFilterTypes } from '../../types/personFinder';

const DEFAULT_FILTER_TYPES = [
    PersonFinderInputFilterTypes.PERSON,
    PersonFinderInputFilterTypes.SITES,
];

export type PersonFinderInputProps = {
    /**
     *
     */
    shouldAllowMultiple?: boolean;
    /**
     *
     */
    filterTypes?: PersonFinderInputFilterTypes[];
};

const PersonFinderInput: FC<PersonFinderInputProps> = ({
    shouldAllowMultiple = true,
    filterTypes = DEFAULT_FILTER_TYPES,
}) => {
    const leftElement = (
        <StyledPersonFinderInputLeftElement>
            <Icon icons={['fa fa-search']} />
        </StyledPersonFinderInputLeftElement>
    );

    const handleRemove = (id: string) => {
        // ToDo remove with personId
    };

    return (
        <StyledPersonFinderInput>
            <TagInput
                placeholder="Person oder Site finden"
                leftElement={leftElement}
                onRemove={handleRemove}
            />
        </StyledPersonFinderInput>
    );
};

PersonFinderInput.displayName = 'PersonFinderInput';

export default PersonFinderInput;
