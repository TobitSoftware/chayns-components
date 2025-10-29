import { InternalFileItem, SmallWaitCursor } from '@chayns-components/core';
import React, { FC } from 'react';
import {
    StyledMotionPreviewItem,
    StyledPreviewItemImage,
    StyledPreviewItemImageWrapper,
    StyledPreviewItemLoadingIcon,
} from './PreviewItem.styles';

export type PreviewItemProps = {
    /**
     *  Images and videos which should be displayed
     */
    fileItem: InternalFileItem;
    /**
     * The ratio of the image
     */
    ratio: number;
};

const PreviewItem: FC<PreviewItemProps> = ({ fileItem, ratio }) => (
    <StyledMotionPreviewItem
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{
            opacity: 0,
            transition: { duration: 3.2, delay: 3.2 },
        }}
        transition={{ duration: 3.2 }}
        style={{ position: 'absolute' }}
    >
        <StyledPreviewItemImageWrapper $ratio={ratio}>
            <StyledPreviewItemLoadingIcon>
                <SmallWaitCursor shouldHideWaitCursor={false} shouldHideBackground />
            </StyledPreviewItemLoadingIcon>
            <StyledPreviewItemImage draggable={false} src={fileItem.previewUrl} />
        </StyledPreviewItemImageWrapper>
    </StyledMotionPreviewItem>
);

PreviewItem.displayName = 'PreviewItem';

export default PreviewItem;
