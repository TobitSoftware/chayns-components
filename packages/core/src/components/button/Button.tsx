import React, { FC } from 'react';
import styled from 'styled-components';

type ButtonProps = {
    children: JSX.Element
};

const StyledButton = styled.button`color:white;`;

const Button: FC<ButtonProps> = ({ children }) => (
    <StyledButton className='button'>
        {children}
    </StyledButton>
);

Button.displayName = 'Button';

export default Button;
