import { useDragControls } from 'framer-motion';
import React, {
    CSSProperties,
    FC,
    PointerEventHandler,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import {
    StyledColorArea,
    StyledColorAreaCanvas,
    StyledMotionColorAreaPointer,
} from './ColorArea.styles';

interface Coordinates {
    x: number;
    y: number;
}

export type ColorAreaProps = {
    color: CSSProperties['color'];
    onChange: (colorToSelect: CSSProperties['color']) => void;
};

const ColorArea: FC<ColorAreaProps> = ({ onChange, color }) => {
    const [selectedColor, setSelectedColor] = useState<CSSProperties['color']>();
    const [coordinates, setCoordinates] = useState<Coordinates>({
        x: 0,
        y: 0,
    });
    const [imageData, setImageData] = useState<ImageData>();

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const dragControls = useDragControls();

    useEffect(() => {
        const ctx = canvasRef.current?.getContext('2d');

        if (!ctx) {
            return;
        }

        const colorGradiant = ctx.createLinearGradient(0, 0, 300, 0);
        colorGradiant.addColorStop(0, 'white');
        colorGradiant.addColorStop(1, color ?? 'red');

        ctx.fillStyle = colorGradiant;
        ctx.fillRect(0, 0, 300, 150);

        const transparentGradiant = ctx.createLinearGradient(0, 0, 0, 150);

        transparentGradiant.addColorStop(0, 'transparent');
        transparentGradiant.addColorStop(1, '#000');

        ctx.fillStyle = transparentGradiant;
        ctx.fillRect(0, 0, 300, 150);

        setImageData(ctx.getImageData(0, 0, 300, 150));
    }, [color]);

    const getColorFromCoordinates = useCallback(
        (selectedCoordinates: Coordinates) => {
            if (!imageData) {
                return;
            }

            const { data } = imageData;
            const { y, x } = selectedCoordinates;

            const pixel = 300 * x + y;
            const position = pixel * 4;

            const red = data[position];
            const green = data[position + 1];
            const blue = data[position + 2];
            const alpha = data[position + 3];

            const rGBAColor = `rgba(${red}, ${green}, ${blue}, ${alpha})`;

            console.log({ rGBAColor, selectedCoordinates });
        },
        [imageData]
    );

    const handleStartDrag: PointerEventHandler = useCallback(
        (event) => {
            dragControls.start(event, { snapToCursor: true });
        },
        [dragControls]
    );

    const handleDrag = useCallback(
        (event: DragEvent) => {
            setCoordinates({ x: event.clientX, y: event.clientY });
            getColorFromCoordinates({ x: event.clientX, y: event.clientY });
        },
        [getColorFromCoordinates]
    );

    return useMemo(
        () => (
            <StyledColorArea>
                <StyledColorAreaCanvas ref={canvasRef} onPointerDown={handleStartDrag} />
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
        [dragControls, handleDrag, handleStartDrag]
    );
};

ColorArea.displayName = 'ColorArea';

export default ColorArea;
