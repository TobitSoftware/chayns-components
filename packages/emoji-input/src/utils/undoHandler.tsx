import type { Selection } from './cursor';

type BbValueWithSelection = {
    selection: Selection | null;
    bbValue: string;
};

export default class UndoHandler {
    private inputStack: BbValueWithSelection[] = [];
    private currentIndex: number = -1;

    addInputHistory = (input: BbValueWithSelection) => {
        console.log('add', input);
        if (this.currentIndex < this.inputStack.length - 1 && this.currentIndex > -1) {
            this.inputStack = this.inputStack.splice(0, this.currentIndex + 1); // remove values after currentIndex
        }
        this.inputStack.push({
            bbValue: input.bbValue,
            selection: !input.selection ? null : { ...input.selection },
        });
        this.currentIndex = this.inputStack.length - 1;
        if (this.inputStack.length > 10000) {
            // Max Steps saved
            this.inputStack.shift();
            this.currentIndex--;
        }
    };
    undoValue = (currentInput: BbValueWithSelection): BbValueWithSelection | null => {
        if (this.currentIndex > 0) {
            const oldInput = this.inputStack[this.currentIndex];
            if (oldInput && currentInput.bbValue !== oldInput.bbValue) {
                console.log('add current as InputValue');
                this.addInputHistory(currentInput);
            }
            this.currentIndex--;
            const currentItem = this.inputStack[this.currentIndex];
            console.log('undo', [...this.inputStack], this.currentIndex, currentItem);
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
