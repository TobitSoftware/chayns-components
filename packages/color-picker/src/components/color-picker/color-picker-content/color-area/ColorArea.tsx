import { useDragControls } from 'framer-motion';
import React, {
    CSSProperties,
    FC,
    MouseEvent,
    PointerEventHandler,
    useCallback,
    useEffect,
    useMemo,
    useRef,
} from 'react';
import { getColorFromCoordinates } from '../../../../utils/color';
import {
    StyledColorArea,
    StyledColorAreaCanvas,
    StyledMotionColorAreaPointer,
} from './ColorArea.styles';

export type ColorAreaProps = {
    color: CSSProperties['color'];
    hueColor: CSSProperties['color'];
    onChange: (colorToSelect: CSSProperties['color']) => void;
};

const ColorArea: FC<ColorAreaProps> = ({ onChange, color, hueColor }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const dragControls = useDragControls();

    useEffect(() => {
        const ctx = canvasRef.current?.getContext('2d');

        if (!ctx) {
            return;
        }

        const colorGradiant = ctx.createLinearGradient(0, 0, 300, 0);
        colorGradiant.addColorStop(0, 'white');
        colorGradiant.addColorStop(1, hueColor ?? 'red');

        ctx.fillStyle = colorGradiant;
        ctx.fillRect(0, 0, 300, 150);

        const transparentGradiant = ctx.createLinearGradient(0, 0, 0, 150);

        transparentGradiant.addColorStop(0, 'transparent');
        transparentGradiant.addColorStop(1, '#000');

        ctx.fillStyle = transparentGradiant;
        ctx.fillRect(0, 0, 300, 150);
    }, [color, hueColor]);

    const handleStartDrag: PointerEventHandler = useCallback(
        (event) => {
            dragControls.start(event, { snapToCursor: true });
        },
        [dragControls]
    );

    const handleDrag = useCallback(
        (event: DragEvent) => {
            onChange(
                getColorFromCoordinates({
                    coordinates: { x: event.clientX, y: event.clientY },
                    canvas: canvasRef,
                })
            );
        },
        [onChange]
    );

    const handleClick = useCallback(
        (event: MouseEvent) => {
            onChange(
                getColorFromCoordinates({
                    coordinates: { x: event.clientX, y: event.clientY },
                    canvas: canvasRef,
                })
            );
        },
        [onChange]
    );

    return useMemo(
        () => (
            <StyledColorArea>
                <StyledColorAreaCanvas
                    ref={canvasRef}
                    onPointerDown={handleStartDrag}
                    onClick={handleClick}
                />
                <StyledMotionColorAreaPointer
                    drag
                    dragConstraints={canvasRef}
                    dragElastic={false}
                    dragMomentum={false}
                    dragControls={dragControls}
                    onDrag={handleDrag}
                />
            </StyledColorArea>
        ),
        [dragControls, handleClick, handleDrag, handleStartDrag]
    );
};

ColorArea.displayName = 'ColorArea';

export default ColorArea;
