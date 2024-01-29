interface CheckForValidAmount {
    amount: number;
    maxAmount?: number;
    minAmount: number;
}

export const checkForValidAmount = ({ amount, maxAmount, minAmount }: CheckForValidAmount) => {
    if (maxAmount && amount > maxAmount) {
        return maxAmount;
    }

    if (amount < minAmount) {
        return minAmount;
    }

    return amount;
};
