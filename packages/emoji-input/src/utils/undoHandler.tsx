import type { Selection } from './cursor';

type BbValueWithSelection = {
    selection: Selection | null;
    bbValue: string;
};

export default class UndoHandler {
    private inputStack: BbValueWithSelection[] = [];
    private currentIndex: number = -1;

    addInputHistory = (input: BbValueWithSelection) => {
        this.inputStack = this.inputStack.splice(0, this.currentIndex + 1); // remove values after currentIndex
        this.inputStack.push({
            bbValue: input.bbValue,
            selection: !input.selection ? null : { ...input.selection },
        });
        this.currentIndex++;
        if (this.inputStack.length > 100000) {
            // Max Steps saved
            this.inputStack.shift();
            this.currentIndex--;
        }
        console.log('addInput', this.inputStack, this.currentIndex);
    };
    undoValue = (): BbValueWithSelection | null => {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            return this.inputStack[this.currentIndex] || null;
        }
        return null;
    };
    redoValue = (): BbValueWithSelection | null => {
        if (this.currentIndex > -1 && this.currentIndex < this.inputStack.length - 1) {
            this.currentIndex++;
            return this.inputStack[this.currentIndex] || null;
        }
        return null;
    };
}
