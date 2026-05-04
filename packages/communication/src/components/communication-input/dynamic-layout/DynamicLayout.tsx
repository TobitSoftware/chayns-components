import React, { FC, ReactNode, useMemo, useState } from 'react';
import {
    StyledDynamicLayout,
    StyledDynamicLayoutChips,
    StyledDynamicLayoutFullHeightToggle,
    StyledDynamicLayoutInput,
    StyledDynamicLayoutLeft,
    StyledDynamicLayoutRight,
} from './DynamicLayout.styles';
import { Icon } from '@chayns-components/core';

interface DynamicLayoutProps {
    children: ReactNode;
    shouldShowInputInBottomRow: boolean;
    shouldShowFullHeightToggle: boolean;
    isFullHeight: boolean;
    onFullHeightToggle: (isFullHeight: boolean) => void;
    leftElement?: ReactNode;
    rightElement?: ReactNode;
    chipsElement?: ReactNode;
}

const DynamicLayout: FC<DynamicLayoutProps> = ({
    shouldShowInputInBottomRow,
    shouldShowFullHeightToggle,
    isFullHeight,
    onFullHeightToggle,
    children,
    chipsElement,
    leftElement,
    rightElement,
}) => (
    <StyledDynamicLayout
        $inputInBottomRow={shouldShowInputInBottomRow}
        $isFullHeight={isFullHeight}
    >
        {shouldShowFullHeightToggle && (
            <StyledDynamicLayoutFullHeightToggle>
                <Icon
                    size={18}
                    onClick={() => onFullHeightToggle(!isFullHeight)}
                    icons={[
                        isFullHeight
                            ? 'fa fa-down-left-and-up-right-to-center'
                            : 'fa fa-up-right-and-down-left-from-center',
                    ]}
                />
            </StyledDynamicLayoutFullHeightToggle>
        )}
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
