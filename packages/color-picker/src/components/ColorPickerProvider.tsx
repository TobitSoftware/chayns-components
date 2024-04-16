import React, { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';

interface IColorPickerContext {
    selectedColor?: string;
    updateSelectedColor?: (color: string | undefined) => void;
    hueColor?: string;
    updateHueColor?: (color: string | undefined) => void;
    isPresetColor?: boolean;
    updateIsPresetColor?: (isPresetColor: boolean) => void;
    shouldGetCoordinates?: boolean;
    updateShouldGetCoordinates?: (shouldGetCoordinates: boolean) => void;
    shouldCallOnSelect?: boolean;
    updateShouldCallOnSelect?: (shouldCallOnSelect: boolean) => void;
}

export const ColorPickerContext = React.createContext<IColorPickerContext>({
    selectedColor: undefined,
    updateSelectedColor: undefined,
    hueColor: undefined,
    updateHueColor: undefined,
    isPresetColor: undefined,
    updateIsPresetColor: undefined,
    shouldGetCoordinates: undefined,
    updateShouldGetCoordinates: undefined,
    shouldCallOnSelect: undefined,
    updateShouldCallOnSelect: undefined,
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
    const [internalHueColor, setInternalHueColor] = useState<string>();
    const [internalIsPresetColor, setInternalIsPresetColor] = useState<boolean>(false);
    const [internalShouldGetCoordinates, setInternalShouldGetCoordinates] = useState<boolean>(true);
    const [internalShouldCallOnSelect, setInternalShouldCallOnSelect] = useState<boolean>(false);

    const updateSelectedColor = useCallback((color: string | undefined) => {
        setInternalSelectedColor(color);
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

    const updateShouldCallOnSelect = useCallback((shouldCallOnSelect: boolean) => {
        setInternalShouldCallOnSelect(shouldCallOnSelect);
    }, []);

    useEffect(() => {
        setInternalSelectedColor(selectedColor);
        setInternalHueColor(selectedColor);
        setInternalIsPresetColor(true);
    }, [selectedColor]);

    useEffect(() => {
        if (typeof onSelect === 'function' && internalShouldCallOnSelect && internalSelectedColor) {
            onSelect(internalSelectedColor);

            setInternalShouldCallOnSelect(false);
        }
    }, [internalSelectedColor, internalShouldCallOnSelect, onSelect]);

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
            shouldCallOnSelect: internalShouldCallOnSelect,
            updateShouldCallOnSelect,
        }),
        [
            internalHueColor,
            internalIsPresetColor,
            internalSelectedColor,
            internalShouldCallOnSelect,
            internalShouldGetCoordinates,
            updateHueColor,
            updateIsPresetColor,
            updateSelectedColor,
            updateShouldCallOnSelect,
            updateShouldGetCoordinates,
        ],
    );

    return (
        <ColorPickerContext.Provider value={providerValue}>{children}</ColorPickerContext.Provider>
    );
};

ColorPickerProvider.displayName = 'ColorPickerProvider';

export default ColorPickerProvider;
