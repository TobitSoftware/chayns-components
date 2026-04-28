import styled from 'styled-components';

type StyledHeaderMemberProps = { $isContextMenu?: boolean };

export const StyledHeaderMember = styled.div<StyledHeaderMemberProps>`
    cursor: pointer;
    width: fit-content;

    text-decoration: underline;
    text-decoration-style: dotted;

    display: flex;

    line-height: ${({ $isContextMenu }) => (!$isContextMenu ? 'normal' : undefined)};

    span:first-of-type {
        padding: 0;
        display: flex;
        align-items: center;
    }

    &:hover {
        opacity: 0.75;
    }
`;
