import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import connectExpandableContext from './connectExpandableContext';
import ExpandableContent from '../../react-chayns-expandable_content/component/ExpandableContent';
import ExpandableContext from './ExpandableContext';

let maxId = 1;
function getId() {
    const id = maxId;
    maxId += 1;

    return id;
}

class ExpandableListItem extends PureComponent {
    static propTypes = {
        onToggle: PropTypes.func.isRequired,
        open: PropTypes.bool,
        children: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.arrayOf(PropTypes.node)
        ]),
        header: PropTypes.node.isRequired,
        onOpen: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired,
    };

    static defaultProps = {
        open: false,
        children: null,
    };

    constructor() {
        super();

        this.id = getId();
        this.onToggle = this.onToggle.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onOpen = this.onOpen.bind(this);

        /* Improve update-performance */
        this.precreated = {
            true: {
                onOpen: this.onOpen,
                onClose: this.onClose,
                onTrigger: this.onToggle,
                open: true,
            },
            false: {
                onOpen: this.onOpen,
                onClose: this.onClose,
                onTrigger: this.onToggle,
                open: false,
            },
        };
    }

    onToggle() {
        const { onToggle } = this.props;

        onToggle(this.id);
    }

    onOpen() {
        const { onOpen } = this.props;

        onOpen(this.id);
    }

    onClose() {
        const { onClose } = this.props;

        onClose(this.id);
    }

    render() {
        const {
            header,
            children,
            open,
        } = this.props;

        return (
            <div onClick={this.onToggle}>
                <ExpandableContext.Provider
                    value={this.precreated[open === this.id]}
                >
                    {header}
                    {children && (
                        <ExpandableContent
                            open={open === this.id}
                        >
                            {children}
                        </ExpandableContent>
                    )}
                </ExpandableContext.Provider>
            </div>
        );
    }
}

export default connectExpandableContext(ExpandableListItem);
