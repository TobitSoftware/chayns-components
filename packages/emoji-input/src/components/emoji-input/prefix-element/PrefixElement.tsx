import React, {
    useCallback,
    useEffect,
    useMemo,
    useState,
    type Dispatch,
    type FC,
    type RefObject,
    type SetStateAction,
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
    const [prefixText, setPrefixText] = useState('');

    useEffect(() => {
        if (prefixElementRef.current) {
            setPrefixText(prefixElementRef.current.textContent ?? '');
        }
    }, [prefixElementRef]);

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
                    index={index}
                >
                    {letter}
                </StyledPrefixElementLetter>
            )),
        [handleAnimationEnd, prefixText],
    );

    return (
        <StyledPrefixElement shouldShow={shouldShow}>
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
