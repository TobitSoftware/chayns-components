let lastPageY;

const requestAnimationFrameFallback = window.requestAnimationFrame.bind(window) || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || (c => setTimeout(c, 0));

export default class ScrollViewHelper {
    constructor(el, { wrapper, content, bar }) {
        this.target = el;
        this.bar = bar;
        this.wrapper = wrapper;
        this.content = content;

        this.direction = window.getComputedStyle(this.target).direction;

        if (this.direction === 'rtl') {
            this.content.classList.add('rtl');
        }

        this.dragDealer(this.bar);
        this.refresh();

        if (!chayns.env.isMobile) {
            this.content.addEventListener('scroll', this.moveBar.bind(this));
            this.content.addEventListener('mouseenter', this.moveBar.bind(this));
        }
    }

    dragDealer() {
        const drag = (e) => {
            const delta = e.pageY - lastPageY;
            lastPageY = e.pageY;

            requestAnimationFrameFallback(() => {
                this.content.scrollTop += delta / this.scrollRatio;
            });
        };

        const stop = () => {
            this.target.classList.remove('cc__scroll-view--grabbed');
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', stop);
        };

        this.bar.addEventListener('mousedown', (e) => {
            lastPageY = e.pageY;

            this.target.classList.add('cc__scroll-view--grabbed');

            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', stop);

            return false;
        });
    }

    moveBar() {
        const totalHeight = this.content.scrollHeight;
        const ownHeight = this.content.clientHeight;

        this.scrollRatio = ownHeight / totalHeight;

        const right = (this.target.clientWidth - this.bar.clientWidth) * -1;

        requestAnimationFrameFallback(() => {
            if(this.scrollRatio >= 1) {
                this.target.classList.add('cc__scroll-view--hidden');
            } else {
                this.target.classList.remove('cc__scroll-view--hidden');

                this.bar.style.height = `${Math.max(this.scrollRatio, 0.1) * ownHeight}px`;
                this.bar.style.top = `${(this.content.scrollTop / totalHeight) * ownHeight}px`;
                this.bar.style.right = `${right}px`;
            }
        });
    }

    refresh() {
        this.moveBar();
    }
}
