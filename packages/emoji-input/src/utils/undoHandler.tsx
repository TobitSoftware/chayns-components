import type { Selection } from './cursor';

type BbValueWithSelection = {
    selection: Selection | null;
    bbValue: string;
};

const MAX_STEPS_SAVED = 10000;

export default class UndoHandler {
    private inputStack: BbValueWithSelection[] = [];
    private currentIndex: number = -1;

    /*
        Steps saved in EmojiInput.tsx after:
        -> " " (Space/Word)
        -> after Ctrl + V
        -> after Enter / AddEmoji

        -> in undoValue() if currentInputText != last saved value
    */
    addInputHistory = (input: BbValueWithSelection) => {
        if (this.currentIndex < this.inputStack.length - 1 && this.currentIndex > -1) {
            this.inputStack = this.inputStack.splice(0, this.currentIndex + 1); // remove values after currentIndex
        }
        this.currentIndex = this.inputStack.length - 1;
        // const lastItem = this.inputStack[this.currentIndex];
        // if (lastItem?.bbValue === input.bbValue) {
        //     if (!lastItem.selection) {
        //         this.inputStack.pop();
        //     } else {
        //         return;
        //     }
        // }
        this.inputStack.push({
            bbValue: input.bbValue,
            selection: !input.selection ? null : { ...input.selection },
        });
        this.currentIndex++;
        if (this.inputStack.length > MAX_STEPS_SAVED) {
            this.inputStack.shift();
            this.currentIndex--;
        }
        console.log('AddHistory after', input, [...this.inputStack], this.currentIndex);
    };
    undoValue = (
        currentInput: BbValueWithSelection,
        lasInputSpace: boolean = false
    ): BbValueWithSelection | null => {
        if (this.currentIndex > 0) {
            const oldInput = this.inputStack[this.currentIndex];
            console.log(
                '------Undo before',
                currentInput,
                [...this.inputStack],
                this.currentIndex,
                lasInputSpace
            );
            if (oldInput && currentInput.bbValue !== oldInput.bbValue && !lasInputSpace) {
                this.addInputHistory(currentInput);
            }
            this.currentIndex--;
            const currentItem = this.inputStack[this.currentIndex];
            console.log('------Undo after', [...this.inputStack], this.currentIndex, currentItem);
            return currentItem
                ? ({
                      bbValue: currentItem.bbValue,
                      selection: currentItem.selection ? { ...currentItem.selection } : null,
                  } as BbValueWithSelection)
                : null;
        }
        return null;
    };
    redoValue = (): BbValueWithSelection | null => {
        if (this.currentIndex > -1 && this.currentIndex < this.inputStack.length - 1) {
            this.currentIndex++;
            const currentItem = this.inputStack[this.currentIndex];
            console.log('------Redo after', currentItem, [...this.inputStack], this.currentIndex);
            return currentItem
                ? ({
                      bbValue: currentItem.bbValue,
                      selection: currentItem.selection ? { ...currentItem.selection } : null,
                  } as BbValueWithSelection)
                : null;
        }
        return null;
    };
}
