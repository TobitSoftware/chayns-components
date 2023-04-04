import styled from 'styled-components';
import { getFontFamily } from '../../../../utils/font';

export const StyledEmoji = styled.div`
    align-items: center;
    cursor: pointer;
    display: flex;
    font-family: ${getFontFamily};
    font-size: 32px;
    justify-content: center;
    width: 48px;
    height: 48px;
`;
