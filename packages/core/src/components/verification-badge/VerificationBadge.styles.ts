import styled from 'styled-components';

export const StyledVerificationBadge = styled.span`
    @font-face {
        font-family: 'Verified-chaynsID';
        src:
            url(https://api.chayns-static.space/font-vcid/Verified-chaynsID.woff2) format('woff2'),
            url(https://api.chayns-static.space/font-vcid/Verified-chaynsID.woff2) format('woff'),
            url(https://api.chayns-static.space/font-vcid/Verified-chaynsID.woff2) format('woff'),
            url(https://api.chayns-static.space/font-vcid/Verified-chaynsID.ttf) format('truetype'),
            url(https://api.chayns-static.space/font-vcid/Verified-chaynsID.svg) format('svg');
        font-weight: normal;
        font-style: normal;
        font-display: block;
    }

    /*noinspection CssNoGenericFontName*/
    font-family: 'Verified-chaynsID' !important;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    font-size: 0.8em;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    margin-left: 0.2em;

    & > :first-child {
        color: #5890ff;
    }

    & > :nth-child(2),
    & > :nth-child(3) {
        margin-left: -1em;
        color: #fff;
    }
`;
