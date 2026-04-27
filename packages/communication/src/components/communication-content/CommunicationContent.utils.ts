import { OverlaySnapPoint } from './CommunicationContent.types';

export const clamp = (value: number, min: number, max: number): number =>
    Math.min(Math.max(value, min), max);

export const getClosestSnapPoint = (
    value: number,
    snapPoints: Record<OverlaySnapPoint, number>,
): OverlaySnapPoint =>
    Object.entries(snapPoints).reduce<OverlaySnapPoint>((closest, [key, snapValue]) => {
        const currentDistance = Math.abs(value - snapPoints[closest]);
        const nextDistance = Math.abs(value - snapValue);

        return nextDistance < currentDistance ? (key as OverlaySnapPoint) : closest;
    }, OverlaySnapPoint.BOTTOM);
