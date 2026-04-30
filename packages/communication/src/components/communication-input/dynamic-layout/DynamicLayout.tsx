import React, { FC, ReactNode } from 'react';
import {
    StyledDynamicLayout,
    StyledDynamicLayoutChips,
    StyledDynamicLayoutInput,
    StyledDynamicLayoutLeft,
    StyledDynamicLayoutRight,
} from './DynamicLayout.styles';

interface DynamicLayoutProps {
    children: ReactNode;
    shouldShowInputInBottomRow: boolean;
    leftElement?: ReactNode;
    rightElement?: ReactNode;
    chipsElement?: ReactNode;
}

const DynamicLayout: FC<DynamicLayoutProps> = ({
    shouldShowInputInBottomRow,
    children,
    chipsElement,
    leftElement,
    rightElement,
}) => (
    <StyledDynamicLayout $inputInBottomRow={shouldShowInputInBottomRow}>
        <StyledDynamicLayoutInput key="input" layout>
            {children}
        </StyledDynamicLayoutInput>

        {leftElement && <StyledDynamicLayoutLeft>{leftElement}</StyledDynamicLayoutLeft>}

        {chipsElement && <StyledDynamicLayoutChips>{chipsElement}</StyledDynamicLayoutChips>}

        {rightElement && <StyledDynamicLayoutRight>{rightElement}</StyledDynamicLayoutRight>}
    </StyledDynamicLayout>
);

DynamicLayout.displayName = 'DynamicLayout';

export default DynamicLayout;
