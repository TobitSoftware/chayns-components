import React, { FunctionComponent } from 'react';
import { ContextMenuRef } from '../context-menu/ContextMenu.types';
import SharingContextMenu, {
    SharingContextMenuProps,
} from '../sharing-context-menu/SharingContextMenu';
import { StyledSharingButtonContainer } from './SharingButton.styles';
import Button from '../button/Button';

export type SharingButtonProps = Pick<SharingContextMenuProps, 'link' | 'alignment' | 'container'>;

const SharingButton: FunctionComponent<SharingButtonProps> = ({ link, alignment, container }) => {
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
                <Button onClick={handleButtonClick} isDisabled={isButtonDisabled}>
                    Teilen
                </Button>
            </SharingContextMenu>
        </StyledSharingButtonContainer>
    );
};

export default SharingButton;
