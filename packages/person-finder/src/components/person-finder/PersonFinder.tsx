import React, { FC, useEffect, useRef, useState } from 'react';
import { PersonFinderFilterTypes } from '../../types/personFinder';
import PersonFinderProvider from '../PersonFinderProvider';
import PersonFinderWrapper, {
    PersonFinderWrapperProps,
} from './person-finder-wrapper/PersonFinderWrapper';

const DEFAULT_FILTER_TYPES = [PersonFinderFilterTypes.PERSON, PersonFinderFilterTypes.SITES];

export type PersonFinderProps = PersonFinderWrapperProps;

const PersonFinder: FC<PersonFinderProps> = ({
    shouldAllowMultiple = true,
    filterTypes = DEFAULT_FILTER_TYPES,
    container,
}) => {
    const [newContainer, setNewContainer] = useState<Element | null>(container ?? null);

    const personFinderRef = useRef<HTMLDivElement>(null);

    // Get the closest container if none is set
    useEffect(() => {
        if (personFinderRef.current && !container) {
            const el = personFinderRef.current as HTMLElement;

            const element = el.closest('.dialog-inner, .page-provider, .tapp, body');

            setNewContainer(element);
        }
    }, [container]);

    useEffect(() => {
        if (container instanceof Element) {
            setNewContainer(container);
        }
    }, [container]);

    return (
        <PersonFinderProvider>
            <div className="beta-chayns-person-finder" ref={personFinderRef}>
                <PersonFinderWrapper
                    filterTypes={filterTypes}
                    shouldAllowMultiple={shouldAllowMultiple}
                    container={newContainer}
                />
            </div>
        </PersonFinderProvider>
    );
};

PersonFinder.displayName = 'PersonFinder';

export default PersonFinder;
