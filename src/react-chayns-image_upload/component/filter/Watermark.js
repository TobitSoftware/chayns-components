import { TextFilter } from 'pixel-flip';
import assign from 'object-assign';

export default class WatermarkFilter extends TextFilter {
    constructor() {
        super(`© ${chayns.env.site.domain}`, {
            color: '#888888',
        });

        this.isEditable = false;
    }

    updateText(...args) {
        super.updateText(...args);

        this.setX(99 - this.getWidth());
        this.setY(100 - this.getHeight());
    }

    render(config) {
        super.render(assign({}, config, {
            editMode: false,
        }));
    }
}
