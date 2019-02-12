import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import connectExpandableContext from './connectExpandableContext';
import ExpandableContent from '../../react-chayns-expandable_content/component/ExpandableContent';

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
        children: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.arrayOf(PropTypes.node)
        ]),
        header: PropTypes.node.isRequired,
    };

    static defaultProps = {
        open: null,
        children: null,
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
        const { header, children, open } = this.props;

        return (
            <div onClick={this.onToggle}>
                {header}
                {children && (
                    <ExpandableContent
                        open={open === this.id}
                    >
                        {children}
                    </ExpandableContent>
                )}
            </div>
        );
    }
}

export default connectExpandableContext(ExpandableListItem);
