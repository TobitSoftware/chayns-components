import styled from 'styled-components';
import { DYNAMIC_TOOLBAR_HEIGHT_PX } from '../dynamic-toolbar/DynamicToolbar.constants';

export const StyledDynamicToolbarSpacer = styled.div`
    flex: 1 1 auto;
    height: ${DYNAMIC_TOOLBAR_HEIGHT_PX}px;
    width: 100%;
`;
