const ORIENTATION_PORTRAIT = 0;
const ORIENTATION_LANDSCAPE = 1;

const HTML = document.documentElement;

class OrientationHelper {
    constructor() {
        if (chayns.env.isMobile || chayns.env.isApp) {
            window.addEventListener('orientationchange', this.update);
            this.update();
        }
    }

    // eslint-disable-next-line class-methods-use-this
    getOrientation() {
        if (
            window.screen &&
            window.screen.orientation &&
            (window.screen.orientation.angle ||
                window.screen.orientation.angle === 0)
        ) {
            const angle = window.screen.orientation.angle % 360;

            if (angle === 90 || angle === 270 || angle === -90) {
                return ORIENTATION_LANDSCAPE;
            }

            return ORIENTATION_PORTRAIT;
        }

        if (window.orientation || window.orientation === 0) {
            return window.orientation === -90 || window.orientation === 90
                ? ORIENTATION_LANDSCAPE
                : ORIENTATION_PORTRAIT;
        }

        if (window.innerHeight > window.innerWidth) {
            return ORIENTATION_LANDSCAPE;
        }

        return ORIENTATION_PORTRAIT;
    }

    update = () => {
        const orientation = this.getOrientation();

        if (orientation === ORIENTATION_LANDSCAPE) {
            HTML.classList.add('chayns--landscape');
            HTML.classList.remove('chayns--portrait');
        } else {
            HTML.classList.add('chayns--portrait');
            HTML.classList.remove('chayns--landscape');
        }
    };
}

export default new OrientationHelper();
