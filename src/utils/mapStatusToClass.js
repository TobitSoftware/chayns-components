export function mapStatusToClass(status, baseClass) {
    switch (status) {
        case 'preEnter':
            return `${baseClass}-enter`;
        case 'entering':
            return `${baseClass}-enter ${baseClass}-enter-active`;
        case 'entered':
            return baseClass;
        case 'exiting':
            return `${baseClass}-exit ${baseClass}-exit-active`;
        case 'exited':
            return `${baseClass}-exit`;
        default:
            return '';
    }
}
