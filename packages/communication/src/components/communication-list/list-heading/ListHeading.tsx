import React, { FC } from 'react';
import { StyledListHeading } from './ListHeading.styles';

interface ListHeadingProps {
    label: string;
    shouldAddTopMargin?: boolean;
}

const ListHeading: FC<ListHeadingProps> = ({ label, shouldAddTopMargin = false }) => (
    <StyledListHeading $shouldAddTopMargin={shouldAddTopMargin}>{label}</StyledListHeading>
);

ListHeading.displayName = 'ListHeading';

export default ListHeading;
