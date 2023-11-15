import { SWIPEABLE_ACTION_WIDTH } from '../components/swipeable-wrapper/swipeable-action/SwipeableAction';

interface CalcThresholdOptions {
    actionCount: number;
    direction: 'left' | 'right';
    width: number;
}

export const calcThreshold = ({ actionCount, direction, width }: CalcThresholdOptions) =>
    Math.max(width / 2, SWIPEABLE_ACTION_WIDTH * actionCount) * (direction === 'left' ? 1 : -1);
