import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledEmojiPickerCategories = styled.div`
    align-items: center;
    border-top: 1px solid rgba(160, 160, 160, 0.3);
    display: flex;
    flex: 0 0 auto;
    justify-content: space-between;
    padding-top: 10px;
    width: 100%;
`;

export const StyledMotionEmojiPickerCategory = styled(motion.div)`
    cursor: pointer;
    font-family: 'Noto Color Emoji', 'Roboto Regular', 'Tahoma', serif;
    font-size: 20px;
`;
