import type { SliderButtonItem } from '../../types/slider-button';

export type SliderButtonProps = {
    /**
     * Whether the button is disabled and cannot be clicked anymore.
     */
    isDisabled?: boolean;
    /**
     * Displays the button in the secondary style.
     */
    isSecondary?: boolean;
    /**
     * The items that should be displayed in the slider button.
     */
    items: SliderButtonItem[];
    /**
     * Function to be executed when a button is selected. The id of the selected button is passed as an argument.
     * @param id
     */
    onChange?: (id: string) => void;
    /**
     * The id of the button that should be selected.
     */
    selectedButtonId?: string;
    /**
     *
     */
    isRounded?: boolean;
    /**
     * Enables keyboard-only focus highlighting.
     */
    shouldEnableKeyboardHighlighting?: boolean;
};
