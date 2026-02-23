import React, { FunctionComponent, PropsWithChildren } from 'react';
import { ContextMenuRef } from '../context-menu/ContextMenu.types';
import SharingContextMenu, {
    SharingContextMenuProps,
} from '../sharing-context-menu/SharingContextMenu';
import { StyledSharingButtonContainer } from './SharingButton.styles';
import Button from '../button/Button';
import { ButtonProps } from '../button/Button.types';

export type SharingButtonProps = PropsWithChildren<
    Pick<SharingContextMenuProps, 'link' | 'alignment' | 'container'> &
        Pick<ButtonProps, 'isDisabled'>
>;

const SharingButton: FunctionComponent<SharingButtonProps> = ({
    link,
    alignment,
    container,
    children,
    isDisabled,
}) => {
    const contextMenuRef = React.useRef<ContextMenuRef>(null);
    const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);

    const handleButtonClick = () => {
        contextMenuRef.current?.show();
    };

    const handleOnShow = () => {
        setIsButtonDisabled(true);
    };

    const handleOnHide = () => {
        setIsButtonDisabled(false);
    };

    return (
        <StyledSharingButtonContainer>
            <SharingContextMenu
                link={link}
                alignment={alignment}
                container={container}
                ref={contextMenuRef}
                onShow={handleOnShow}
                onHide={handleOnHide}
            >
                <Button onClick={handleButtonClick} isDisabled={isButtonDisabled || isDisabled}>
                    {children}
                </Button>
            </SharingContextMenu>
        </StyledSharingButtonContainer>
    );
};

export default SharingButton;
