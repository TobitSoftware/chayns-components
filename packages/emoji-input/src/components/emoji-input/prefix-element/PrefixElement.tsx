import React, {
    type Dispatch,
    type FC,
    type RefObject,
    type SetStateAction,
    useCallback,
    useMemo,
    useState,
} from 'react';
import { convertTextToHTML } from '../../../utils/text';
import {
    StyledPrefixElement,
    StyledPrefixElementLetter,
    StyledPrefixElementLetterWrapper,
    StyledPrefixElementPseudo,
} from './PrefixElement.styles';

export type PrefixElementProps = {
    prefixElementRef: RefObject<HTMLDivElement>;
    element: string;
    setIsPrefixAnimationFinished: Dispatch<SetStateAction<boolean>>;
};

const PrefixElement: FC<PrefixElementProps> = ({
    prefixElementRef,
    element,
    setIsPrefixAnimationFinished,
}) => {
    const [shouldShow, setShouldShow] = useState(true);
    const prefixText = useMemo(() => {
        const wrapper = document.createElement('div');

        wrapper.innerHTML = convertTextToHTML(element);

        return wrapper.textContent ?? '';
    }, [element]);

    const handleAnimationEnd = useCallback(
        (index: number) => {
            if (index === prefixText.length - 1) {
                setShouldShow(false);
                setIsPrefixAnimationFinished(true);
            }
        },
        [prefixText.length, setIsPrefixAnimationFinished],
    );

    const content = useMemo(
        () =>
            prefixText.split('').map((letter, index) => (
                <StyledPrefixElementLetter
                    onAnimationEnd={() => handleAnimationEnd(index)}
                    $index={index}
                >
                    {letter}
                </StyledPrefixElementLetter>
            )),
        [handleAnimationEnd, prefixText],
    );

    return (
        <StyledPrefixElement $shouldShow={shouldShow}>
            <StyledPrefixElementPseudo
                ref={prefixElementRef}
                dangerouslySetInnerHTML={{ __html: convertTextToHTML(element) }}
            />
            {shouldShow && (
                <StyledPrefixElementLetterWrapper>{content}</StyledPrefixElementLetterWrapper>
            )}
        </StyledPrefixElement>
    );
};

PrefixElement.displayName = 'PrefixElement';

export default PrefixElement;
