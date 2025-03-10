import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { PersonFinderFilterTypes, Priority } from '../../types/personFinder';
import PersonFinderProvider from '../PersonFinderProvider';
import PersonFinderWrapper, {
    PersonFinderWrapperProps,
    PersonFinderWrapperRef,
} from './person-finder-wrapper/PersonFinderWrapper';

const DEFAULT_FILTER_TYPES = [PersonFinderFilterTypes.PERSON, PersonFinderFilterTypes.SITE];

export type PersonFinderProps = PersonFinderWrapperProps;

export type PersonFinderRef = PersonFinderWrapperRef;

const PersonFinder = forwardRef<PersonFinderRef, PersonFinderProps>(
    (
        {
            container,
            filterTypes = DEFAULT_FILTER_TYPES,
            friendsPriority = Priority.HIGH,
            placeholder = 'Person oder Site finden',
            shouldAllowMultiple = true,
            maxEntries,
            onRemove,
            onAdd,
        },
        ref,
    ) => {
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
                        ref={ref}
                        container={newContainer}
                        filterTypes={filterTypes}
                        friendsPriority={friendsPriority}
                        maxEntries={maxEntries}
                        onAdd={onAdd}
                        onRemove={onRemove}
                        placeholder={placeholder}
                        shouldAllowMultiple={shouldAllowMultiple}
                    />
                </div>
            </PersonFinderProvider>
        );
    },
);

PersonFinder.displayName = 'PersonFinder';

export default PersonFinder;
