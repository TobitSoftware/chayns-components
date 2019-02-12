import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import connectExpandableContext from './connectExpandableContext';

let maxId = 1;
function getId() {
    const id = maxId;
    maxId += 1;

    return id;
}

class ExpandableListItem extends PureComponent {
    static propTypes = {
        onToggle: PropTypes.func.isRequired,
        open: PropTypes.number,
    };

    static defaultProps = {
        open: null,
    };

    constructor() {
        super();

        this.id = getId();
        this.onToggle = this.onToggle.bind(this);
    }

    onToggle() {
        const { onToggle } = this.props;

        onToggle(this.id);
    }

    render() {
        const { open } = this.props;

        return (
            <div onClick={this.onToggle}>
                {'Test'}
                {open === this.id && (
                    <div>
                        {'open'}
                    </div>
                )}
            </div>
        );
    }
}

export default connectExpandableContext(ExpandableListItem);
