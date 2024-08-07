import styled from 'styled-components';
import { Track } from '../slider/Slider.styles';

export const Container = styled(Track)<{
    $color: string;
    $textColor: string;
    $baseFontSize: number;
}>`
    height: ${({ $height }) => $height}px !important;
    background-color: ${({ $color }) => $color};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 4.5vw;
    font-weight: 700;
    cursor: pointer;
    color: white;

    @media (min-width: 450px) {
        font-size: 4vw;
    }

    @media (min-width: 768px) {
        font-size: 2vw;
    }

    @media (min-width: 1024px) {
        font-size: 1.5vw;
    }

    @media (min-width: 1200px) {
        font-size: 25px;
    }
`;
