export function isDisabled(enabledSteps, step) {
    for (let i = 0; i <= step; i += 1) {
        if (enabledSteps.indexOf(i) < 0) {
            return true;
        }
    }
    return false;
}
