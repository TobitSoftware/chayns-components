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
    cursor: pointer;
    color: white;
    container-type: inline-size;
`;

export const Time = styled.div`
    font-size: 5cqw;
    font-weight: 700;
    color: white;
`;
