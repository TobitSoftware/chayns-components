import React, { FC } from 'react';
import { PersonFinderFilterTypes } from '../../types/personFinder';
import PersonFinderProvider from '../PersonFinderProvider';

const DEFAULT_FILTER_TYPES = [PersonFinderFilterTypes.PERSON, PersonFinderFilterTypes.SITES];

export type PersonFinderProps = {
    /**
     *
     */
    shouldAllowMultiple?: boolean;
    /**
     *
     */
    filterTypes?: PersonFinderFilterTypes[];
};

const PersonFinder: FC<PersonFinderProps> = ({
    shouldAllowMultiple = true,
    filterTypes = DEFAULT_FILTER_TYPES,
}) => {
    return <PersonFinderProvider>Test</PersonFinderProvider>;
};

PersonFinder.displayName = 'PersonFinder';

export default PersonFinder;
