import React, { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';

interface IColorPickerContext {
    selectedColor?: string;
    updateSelectedColor?: (color: string | undefined) => void;
    tmpColor?: string;
    updateTmpColor?: (color: string | undefined) => void;
    hueColor?: string;
    updateHueColor?: (color: string | undefined) => void;
    isPresetColor?: boolean;
    updateIsPresetColor?: (isPresetColor: boolean) => void;
    shouldGetCoordinates?: boolean;
    updateShouldGetCoordinates?: (shouldGetCoordinates: boolean) => void;
}

export const ColorPickerContext = React.createContext<IColorPickerContext>({
    selectedColor: undefined,
    updateSelectedColor: undefined,
    tmpColor: undefined,
    updateTmpColor: undefined,
    hueColor: undefined,
    updateHueColor: undefined,
    isPresetColor: undefined,
    updateIsPresetColor: undefined,
    shouldGetCoordinates: undefined,
    updateShouldGetCoordinates: undefined,
});

ColorPickerContext.displayName = 'ColorPickerContext';

interface ColorPickerProviderProps {
    /**
     * The children of the provider.
     */
    children: ReactNode;
    /**
     * Function to be executed when a color is selected.
     */
    onSelect?: (color: string) => void;
    /**
     * The color that should be preselected.
     */
    selectedColor?: string;
}

const ColorPickerProvider = ({ children, selectedColor, onSelect }: ColorPickerProviderProps) => {
    const [internalSelectedColor, setInternalSelectedColor] = useState<string>();
    const [internalTmpColor, setInternalTmpColor] = useState<string>();
    const [internalHueColor, setInternalHueColor] = useState<string>();
    const [internalIsPresetColor, setInternalIsPresetColor] = useState<boolean>(false);
    const [internalShouldGetCoordinates, setInternalShouldGetCoordinates] = useState<boolean>(true);

    const updateSelectedColor = useCallback(
        (color: string | undefined) => {
            setInternalSelectedColor(color);

            if (typeof onSelect === 'function' && color) {
                onSelect(color);
            }
        },
        [onSelect],
    );

    const updateTmpColor = useCallback((color: string | undefined) => {
        setInternalTmpColor(color);
    }, []);

    const updateHueColor = useCallback((color: string | undefined) => {
        setInternalHueColor(color);
    }, []);

    const updateIsPresetColor = useCallback((isPresetColor: boolean) => {
        setInternalIsPresetColor(isPresetColor);
    }, []);

    const updateShouldGetCoordinates = useCallback((shouldGetCoordinates: boolean) => {
        setInternalShouldGetCoordinates(shouldGetCoordinates);
    }, []);

    useEffect(() => {
        setInternalSelectedColor(selectedColor);
    }, [selectedColor]);

    const providerValue = useMemo<IColorPickerContext>(
        () => ({
            selectedColor: internalSelectedColor,
            updateSelectedColor,
            hueColor: internalHueColor,
            updateHueColor,
            isPresetColor: internalIsPresetColor,
            updateIsPresetColor,
            shouldGetCoordinates: internalShouldGetCoordinates,
            updateShouldGetCoordinates,
            tmpColor: internalTmpColor,
            updateTmpColor,
        }),
        [
            internalHueColor,
            internalIsPresetColor,
            internalSelectedColor,
            internalShouldGetCoordinates,
            internalTmpColor,
            updateHueColor,
            updateIsPresetColor,
            updateSelectedColor,
            updateShouldGetCoordinates,
            updateTmpColor,
        ],
    );

    return (
        <ColorPickerContext.Provider value={providerValue}>{children}</ColorPickerContext.Provider>
    );
};

ColorPickerProvider.displayName = 'ColorPickerProvider';

export default ColorPickerProvider;
