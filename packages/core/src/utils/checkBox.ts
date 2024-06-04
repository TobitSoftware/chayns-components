export const getCheckBoxPosition = (fontSize: number) => {
    const position: { [key: number]: number } = {
        30: 17,
        25.5: 14,
        24: 12,
        20: 8,
        19: 8,
        18: 6,
        17: 7,
        16: 5,
        15: 4,
        14: 4,
        13: 3,
        12: 1,
        11: 1,
        10: 0,
        9: -1,
        8: -1,
    };

    return position[fontSize];
};
