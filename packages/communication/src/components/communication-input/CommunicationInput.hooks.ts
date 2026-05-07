import { EmojiInputProps, EmojiInputRef, ReplaceTextOptions } from '@chayns-components/emoji-input';
import {
    FocusEvent,
    ForwardedRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';
import {
    CommunicationInputCornerType,
    CommunicationInputRef,
    CommunicationInputSize,
} from './CommunicationInput.types';
import { TargetAndTransition, Transition } from 'motion/react';
import { AudioInputProps, AudioInputRef } from '../audio-input/AudioInput.types';

interface UseCommunicationInputRefOptions {
    startInitialAnimation: VoidFunction;
    ref: ForwardedRef<CommunicationInputRef>;
}

export const useCommunicationInputRef = ({
    ref,
    startInitialAnimation,
}: UseCommunicationInputRefOptions) => {
    const emojiInputRef = useRef<EmojiInputRef>(null);
    const audioInputRef = useRef<AudioInputRef>(null);

    useImperativeHandle(
        ref,
        () => ({
            // CommunicationInput
            startAnimation: startInitialAnimation,
            // EmojiInput
            focus: () => emojiInputRef.current?.focus(),
            setCursorPosition: (position?: number) =>
                emojiInputRef.current?.setCursorPosition(position),
            blur: () => emojiInputRef.current?.blur(),
            insertTextAtCursorPosition: (text: string) =>
                emojiInputRef.current?.insertTextAtCursorPosition(text),
            replaceText: (searchText: string, replaceText: string, options?: ReplaceTextOptions) =>
                emojiInputRef.current?.replaceText(searchText, replaceText, options),
            startProgress: (durationInSeconds: number) =>
                emojiInputRef.current?.startProgress(durationInSeconds),
            stopProgress: () => emojiInputRef.current?.stopProgress(),
            // AudioInput
            getStream: () => audioInputRef.current?.getStream() ?? null,
            start: () => audioInputRef.current?.start() ?? Promise.resolve(null),
            stop: () => audioInputRef.current?.stop(),
        }),
        [startInitialAnimation],
    );

    return { emojiInputRef, audioInputRef };
};

interface UseCommunicationInputEventsOptions {
    inputConfig: EmojiInputProps;
    audioInputConfig?: AudioInputProps;
    disableEvents: boolean;
}

export const useCommunicationInputEvents = ({
    inputConfig,
    audioInputConfig,
    disableEvents,
}: UseCommunicationInputEventsOptions) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isAudioInputOpen, setIsAudioInputOpen] = useState(false);
    const [isMultiLine, setIsMultiLine] = useState(false);
    const [isFullHeight, setIsFullHeight] = useState(false);
    const [shouldShowFullHeightToggle, setShouldShowFullHeightToggle] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    const handleFocus = useCallback(
        (event: FocusEvent<HTMLDivElement>) => {
            setIsFocused(true);

            if (typeof inputConfig.onFocus === 'function') {
                inputConfig.onFocus(event);
            }
        },
        [inputConfig],
    );

    const handleBlur = useCallback(
        (event: FocusEvent<HTMLDivElement>) => {
            setIsFocused(false);

            if (typeof inputConfig.onBlur === 'function') {
                inputConfig.onBlur(event);
            }
        },
        [inputConfig],
    );

    const handleStart = useCallback(
        (stream: MediaStream) => {
            setIsAudioInputOpen(true);

            if (typeof audioInputConfig?.onStart === 'function') {
                audioInputConfig.onStart(stream);
            }
        },
        [audioInputConfig],
    );

    const handleStop = useCallback(() => {
        setIsAudioInputOpen(false);

        if (typeof audioInputConfig?.onStop === 'function') {
            audioInputConfig.onStop();
        }
    }, [audioInputConfig]);

    const checkMultiLine = useCallback(
        (element: HTMLDivElement) => {
            const currentValue = inputConfig.value ?? '';

            if (currentValue.length === 0 || currentValue === '<br>') {
                setIsMultiLine(false);
                return;
            }

            if (isMultiLine) {
                return;
            }

            if (currentValue.includes('\n') || currentValue.includes('<br>')) {
                setIsMultiLine(true);
                return;
            }

            const hasWrapped = element.clientHeight > 48;

            if (hasWrapped) {
                setIsMultiLine(true);
            }
        },
        [inputConfig.value, isMultiLine],
    );

    const toggleFullHeight = useCallback((fullHeight: boolean) => {
        setIsFullHeight(fullHeight);
    }, []);

    const checkFullHeightToggle = useCallback((element: HTMLDivElement) => {
        setShouldShowFullHeightToggle(element.clientHeight > 75);
    }, []);

    useEffect(() => {
        const element = ref.current;

        if (!element || disableEvents) {
            return;
        }

        requestAnimationFrame(() => checkMultiLine(element));
        requestAnimationFrame(() => checkFullHeightToggle(element));
    }, [checkFullHeightToggle, checkMultiLine, disableEvents]);

    useEffect(() => {
        const element = ref.current;

        if (!element || isMultiLine || disableEvents) {
            return undefined;
        }

        const resizeObserver = new ResizeObserver(() => {
            requestAnimationFrame(() => checkMultiLine(element));
            requestAnimationFrame(() => checkFullHeightToggle(element));
        });

        resizeObserver.observe(element);

        return () => {
            resizeObserver.disconnect();
        };
    }, [checkFullHeightToggle, checkMultiLine, disableEvents, isMultiLine]);

    return useMemo(
        () => ({
            isFocused,
            isMultiLine,
            isFullHeight,
            isAudioInputOpen,
            shouldShowFullHeightToggle,
            onBlur: handleBlur,
            onFocus: handleFocus,
            onStart: handleStart,
            onStop: handleStop,
            onFullHeightToggle: toggleFullHeight,
            ref,
        }),
        [
            handleBlur,
            handleFocus,
            handleStart,
            handleStop,
            isAudioInputOpen,
            isFocused,
            isFullHeight,
            isMultiLine,
            shouldShowFullHeightToggle,
            toggleFullHeight,
        ],
    );
};

interface UseCommunicationInputStylesOptions {
    cornerType: CommunicationInputCornerType;
    size: CommunicationInputSize;
    isMultiLine: boolean;
    isInputInBottomRow: boolean;
}

const CORNER_SIZES = {
    [CommunicationInputSize.MEDIUM]: {
        [CommunicationInputCornerType.ROUNDED]: 8,
        [CommunicationInputCornerType.ROUND]: 26,
    },
    [CommunicationInputSize.SMALL]: {
        [CommunicationInputCornerType.ROUNDED]: 6,
        [CommunicationInputCornerType.ROUND]: 21,
    },
};

export const useCommunicationInputStyles = ({
    cornerType,
    size,
    isMultiLine,
    isInputInBottomRow,
}: UseCommunicationInputStylesOptions) =>
    useMemo(() => {
        let borderRadius: number;
        let fontSize = 16;
        let innerHeight = 48;

        if (cornerType === CommunicationInputCornerType.DYNAMIC) {
            if (isMultiLine || !isInputInBottomRow) {
                borderRadius = CORNER_SIZES[size][CommunicationInputCornerType.ROUNDED];
            } else {
                borderRadius = CORNER_SIZES[size][CommunicationInputCornerType.ROUND];
            }
        } else {
            borderRadius = CORNER_SIZES[size][cornerType];
        }

        if (size === CommunicationInputSize.MEDIUM) {
            fontSize = 18;
            innerHeight = 48;
        }

        if (size === CommunicationInputSize.SMALL) {
            fontSize = 16;
            innerHeight = 38;
        }

        return {
            borderRadius,
            fontSize,
            innerHeight,
            outerHeight: innerHeight + 4,
        };
    }, [cornerType, isInputInBottomRow, isMultiLine, size]);

interface UseCommunicationInputAnimationOptions {
    shouldUseInitialAnimation: boolean;
    borderRadius: number;
    height: number;
    isAudioInputOpen: boolean;
}

export const useCommunicationInputAnimation = ({
    shouldUseInitialAnimation,
    borderRadius,
    height,
    isAudioInputOpen,
}: UseCommunicationInputAnimationOptions) => {
    const [hasStartedInitialAnimation, setHasStartedInitialAnimation] = useState(false);

    const startInitialAnimation = useCallback(() => {
        setHasStartedInitialAnimation(true);
    }, []);

    return useMemo(() => {
        const initial: TargetAndTransition = {
            borderRadius,
            width: '100%',
            opacity: 1,
        };
        const animate: TargetAndTransition = {
            borderRadius,
            width: '100%',
            opacity: 1,
        };
        const transition: Transition = {
            type: 'tween',
            duration: 0.5,
        };

        if (shouldUseInitialAnimation) {
            // noinspection JSSuspiciousNameCombination - width equals height because the element uses aspect-ratio: 1 (circle)
            initial.width = height;
            initial.x = '-50%';
            initial.left = '50%';

            animate.width = hasStartedInitialAnimation ? '100%' : initial.width;
            animate.x = hasStartedInitialAnimation ? 0 : initial.x;
            animate.left = hasStartedInitialAnimation ? 0 : initial.left;
        }

        if (isAudioInputOpen) {
            animate.opacity = 0;
            animate.transition = { duration: 0.15 };
        }

        return {
            startInitialAnimation,
            animate,
            initial,
            transition,
            shouldShowOnlyRightElement: shouldUseInitialAnimation && !hasStartedInitialAnimation,
        };
    }, [
        borderRadius,
        hasStartedInitialAnimation,
        height,
        isAudioInputOpen,
        shouldUseInitialAnimation,
        startInitialAnimation,
    ]);
};
