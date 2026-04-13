import styled from 'styled-components';
import { WithTheme } from '@chayns-components/core';

export const StyledUserImage = styled.div``;

type StyledUserImageUserProps = WithTheme<{ $size: number }>;

export const StyledUserImageUser = styled.img<StyledUserImageUserProps>`
    height: ${({ $size }) => $size}px;

    aspect-ratio: 1;

    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    cursor: pointer;
`;
