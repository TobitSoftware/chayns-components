import { motion, Variant, Variants } from 'framer-motion';
import styled from 'styled-components';

interface IBaseVariant extends Variants {
    base: Variant;
}

interface IDraggingVariant extends Variants {
    dragging: Variant;
}

interface ICompletedVariant extends Variants {
    completed: Variant;
}

interface ILeavingVariant extends Variants {
    leaving: Variant;
}

export const Container = styled(motion.div)``;

export type TrackProps = {
    $height: number;
    $borderSize: number;
    $backgroundColor: string;
};

export const Track = styled(motion.div)<TrackProps>`
    user-select: none;
    position: relative;
    z-index: 3;
    height: ${({ $height }) => $height}px;
    border-radius: ${({ $height }) => $height / 2}px;
    background-color: ${({ $backgroundColor }) => $backgroundColor};
`;

export const TrackBackground = styled(motion.div)<{ $height: number }>`
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: ${({ $height }) => $height / 2}px;
    z-index: 2;
`;

export const Thumb = styled(motion.div)<{
    $size: number;
    $trackHeight: number;
}>`
    height: ${({ $size }) => $size}px;
    width: ${({ $size }) => $size}px;
    border-radius: 50%;
    background-color: white;
    left: ${({ $size, $trackHeight }) => ($trackHeight - $size - 2) / 2}px;
    bottom: ${({ $size, $trackHeight }) => ($trackHeight - $size - 2) / 2 + 1}px;
    position: absolute;
    z-index: 3;
    box-shadow: rgba(0, 0, 0, 0.2) 1px 1px 2px 0;
`;

export const TrackText = styled(motion.div)<{ $color: string; $baseFontSize: number }>`
    position: absolute;
    line-height: 1.15;
    font-size: ${({ $baseFontSize }) => $baseFontSize}px;
    font-weight: 700;
    color: ${({ $color }) => $color};
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
    text-overflow: ellipsis;
    z-index: 1;
    font-family:
        Roboto Regular,
        sans-serif;

    @font-face {
        font-family: 'Roboto Regular';
        font-style: normal;
        font-weight: normal;
        src:
            local('Roboto Regular'),
            local('Roboto Regular'),
            url(https://api.chayns-static.space/font/Roboto%20Regular/Regular.woff2) format('woff2'),
            url(https://api.chayns-static.space/font/Roboto%20Regular/Regular.woff) format('woff'),
            url(https://api.chayns-static.space/font/Roboto%20Regular/Regular.ttf)
                format('truetype'),
            url(https://api.chayns-static.space/font/Roboto%20Regular/Regular.svg) format('svg');
        unicode-range: U+0020-00FF, U+20A0-20CF, U+2122, U+2000-206F;
    }

    @font-face {
        font-family: 'Roboto Regular';
        font-style: italic;
        font-weight: normal;
        src:
            local('Roboto Regular Italic'),
            local('Roboto Regular-Italic'),
            url(https://api.chayns-static.space/font/Roboto%20Regular/Italic.woff2) format('woff2'),
            url(https://api.chayns-static.space/font/Roboto%20Regular/Italic.woff) format('woff'),
            url(https://api.chayns-static.space/font/Roboto%20Regular/Italic.ttf) format('truetype'),
            url(https://api.chayns-static.space/font/Roboto%20Regular/Italic.svg) format('svg');
        unicode-range: U+0020-00FF, U+20A0-20CF, U+2122, U+2000-206F;
    }

    @font-face {
        font-family: 'Roboto Regular';
        font-style: normal;
        font-weight: bold;
        src:
            local('Roboto Regular Bold'),
            local('Roboto Regular-Bold'),
            url(https://api.chayns-static.space/font/Roboto%20Regular/Bold.woff2) format('woff2'),
            url(https://api.chayns-static.space/font/Roboto%20Regular/Bold.woff) format('woff'),
            url(https://api.chayns-static.space/font/Roboto%20Regular/Bold.ttf) format('truetype'),
            url(https://api.chayns-static.space/font/Roboto%20Regular/Bold.svg) format('svg');
        unicode-range: U+0020-00FF, U+20A0-20CF, U+2122, U+2000-206F;
    }

    @font-face {
        font-family: 'Roboto Regular';
        font-style: italic;
        font-weight: bold;
        src:
            local('Roboto Regular Bold Italic'),
            local('Roboto Regular-BoldItalic'),
            url(https://api.chayns-static.space/font/Roboto%20Regular/ItalicBold.woff2)
                format('woff2'),
            url(https://api.chayns-static.space/font/Roboto%20Regular/ItalicBold.woff)
                format('woff'),
            url(https://api.chayns-static.space/font/Roboto%20Regular/ItalicBold.ttf)
                format('truetype'),
            url(https://api.chayns-static.space/font/Roboto%20Regular/ItalicBold.svg) format('svg');
        unicode-range: U+0020-00FF, U+20A0-20CF, U+2122, U+2000-206F;
    }

    @font-face {
        font-family: 'Roboto Bold';
        font-style: normal;
        font-weight: normal;
        src:
            local('Roboto Bold'),
            local('Roboto Bold'),
            url(https://api.chayns-static.space/font/Roboto%20Bold/Regular.woff2) format('woff2'),
            url(https://api.chayns-static.space/font/Roboto%20Bold/Regular.woff) format('woff'),
            url(https://api.chayns-static.space/font/Roboto%20Bold/Regular.ttf) format('truetype'),
            url(https://api.chayns-static.space/font/Roboto%20Bold/Regular.svg) format('svg');
        unicode-range: U+0020-00FF, U+20A0-20CF, U+2122, U+2000-206F;
    }

    @font-face {
        font-family: 'Roboto Bold';
        font-style: italic;
        font-weight: normal;
        src:
            local('Roboto Bold Italic'),
            local('Roboto Bold-Italic'),
            url(https://api.chayns-static.space/font/Roboto%20Bold/Italic.woff2) format('woff2'),
            url(https://api.chayns-static.space/font/Roboto%20Bold/Italic.woff) format('woff'),
            url(https://api.chayns-static.space/font/Roboto%20Bold/Italic.ttf) format('truetype'),
            url(https://api.chayns-static.space/font/Roboto%20Bold/Italic.svg) format('svg');
        unicode-range: U+0020-00FF, U+20A0-20CF, U+2122, U+2000-206F;
    }

    @font-face {
        font-family: 'Roboto Bold';
        font-style: normal;
        font-weight: bold;
        src:
            local('Roboto Bold Bold'),
            local('Roboto Bold-Bold'),
            url(https://api.chayns-static.space/font/Roboto%20Bold/Bold.woff2) format('woff2'),
            url(https://api.chayns-static.space/font/Roboto%20Bold/Bold.woff) format('woff'),
            url(https://api.chayns-static.space/font/Roboto%20Bold/Bold.ttf) format('truetype'),
            url(https://api.chayns-static.space/font/Roboto%20Bold/Bold.svg) format('svg');
        unicode-range: U+0020-00FF, U+20A0-20CF, U+2122, U+2000-206F;
    }

    @font-face {
        font-family: 'Roboto Bold';
        font-style: italic;
        font-weight: bold;
        src:
            local('Roboto Bold Bold Italic'),
            local('Roboto Bold-BoldItalic'),
            url(https://api.chayns-static.space/font/Roboto%20Bold/ItalicBold.woff2) format('woff2'),
            url(https://api.chayns-static.space/font/Roboto%20Bold/ItalicBold.woff) format('woff'),
            url(https://api.chayns-static.space/font/Roboto%20Bold/ItalicBold.ttf)
                format('truetype'),
            url(https://api.chayns-static.space/font/Roboto%20Bold/ItalicBold.svg) format('svg');
        unicode-range: U+0020-00FF, U+20A0-20CF, U+2122, U+2000-206F;
    }
`;

export const ThumbIconContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const ThumbIcon = styled(motion.i).attrs<{ icon: string }>(({ icon }) => ({
    className: `react-chayns-icon ${icon}`,
}))`
    font-size: 22px;
    z-index: 1;
    color: black;
    padding: 5px;
`;

export type CreateThumbVariantsArgs = {
    trackWidth: number;
    thumbSize: number;
    scaleFactor: number;
};

export const createThumbVariants = ({
    thumbSize,
    trackWidth,
    scaleFactor,
}: CreateThumbVariantsArgs): IBaseVariant & ICompletedVariant & ILeavingVariant => ({
    base: {
        x: 0,
        backgroundColor: 'white',
        transition: { duration: 0.2 },
    },
    completed: {
        x: (trackWidth - thumbSize * scaleFactor) / 2,
        backgroundColor: 'transparent',
        boxShadow: 'none',
        transition: { duration: 0.3 },
    },
    leaving: {
        scale: [1, 2.4, 1],
        boxShadow: 'none',
    },
});

export const THUMB_ICON_VARIANTS: IBaseVariant &
    IDraggingVariant &
    ICompletedVariant &
    ILeavingVariant = {
    base: {
        x: [0, 8, 0, 8, 0],
        transition: {
            duration: 1,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: 5,
        },
    },
    dragging: {
        x: 0,
    },
    completed: {
        opacity: 1,
        transition: { duration: 0 },
    },
    leaving: {
        opacity: 1,
        scale: [1, 2.4, 1],
        transition: { duration: 0.4, ease: 'easeInOut' },
    },
};
