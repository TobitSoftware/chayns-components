import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import connectExpandableContext from './connectExpandableContext';
import ExpandableContent from '../../../react-chayns-expandable_content/component/ExpandableContent';
import ExpandableContext from './ExpandableContext';

let maxId = 1;

function getId() {
    const id = maxId;
    maxId += 1;

    return id;
}

class AbstractExpandableListItem extends PureComponent {
    constructor(props) {
        super(props);

        this.id = getId();
        this.onToggle = this.onToggle.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onOpen = this.onOpen.bind(this);

        /* Improve update-performance */
        this.precreated = {
            true: {
                onOpen: this.onOpen,
                onClose: this.onClose,
                onToggle: this.onToggle,
                open: true,
            },
            false: {
                onOpen: this.onOpen,
                onClose: this.onClose,
                onToggle: this.onToggle,
                open: false,
            },
        };
    }

    componentDidUpdate(prevProps) {
        const { open: openIds, openProp } = this.props;
        const prevOpen = prevProps.openProp !== null
            ? prevProps.openProp
            : (prevProps.open && prevProps.open.indexOf && prevProps.open.indexOf(this.id) !== -1);
        const open = openProp !== null ? openProp : (openIds && openIds.indexOf && openIds.indexOf(this.id) !== -1);

        if (prevOpen !== open && openProp === null) {
            if (open) {
                this.onOpen();
            } else {
                this.onClose();
            }
        }
    }

    onToggle() {
        const {
            openProp,
            onToggle,
        } = this.props;

        if (openProp !== null) {
            if (openProp) {
                this.onClose();
            } else {
                this.onOpen();
            }
        }

        onToggle(this.id);
    }

    onOpen() {
        const { onOpenProp } = this.props;
        if (onOpenProp) onOpenProp(this.id);
    }

    onClose() {
        const { onCloseProp } = this.props;
        if (onCloseProp) onCloseProp(this.id);
    }

    render() {
        const {
            header,
            children,
            className,
            clickable,
            open: openIds,
            noContentClass,
            openProp,
            style,
        } = this.props;

        const open = openProp !== null ? openProp : (openIds && openIds.indexOf && openIds.indexOf(this.id) !== -1);

        return (
            <div
                className={classnames('list-item', className, {
                    'list-item--expanded': open,
                    'list-item--clickable': clickable,
                })}
                style={style}
            >
                <ExpandableContext.Provider
                    value={this.precreated[open]}
                >
                    {header}
                    {children && (
                        <ExpandableContent
                            open={open}
                            style={style ? style.body : null}
                        >
                            <div className={classnames({ 'list-item__content': !noContentClass })}>
                                {children}
                            </div>
                        </ExpandableContent>
                    )}
                </ExpandableContext.Provider>
            </div>
        );
    }
}

AbstractExpandableListItem.propTypes = {
    onToggle: PropTypes.func.isRequired,
    open: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.bool]),
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),
    header: PropTypes.node.isRequired,
    // onOpen: PropTypes.func.isRequired,
    // onClose: PropTypes.func.isRequired,
    onOpenProp: PropTypes.func,
    onCloseProp: PropTypes.func,
    className: PropTypes.string,
    clickable: PropTypes.bool,
    noContentClass: PropTypes.bool,
    openProp: PropTypes.bool,
    // eslint-disable-next-line react/forbid-prop-types
    style: PropTypes.object,
};

AbstractExpandableListItem.defaultProps = {
    open: false,
    children: null,
    className: '',
    clickable: false,
    noContentClass: false,
    openProp: null,
    style: null,
    onOpenProp: null,
    onCloseProp: null,
};

AbstractExpandableListItem.displayName = 'AbstractExpandableListItem';

export default connectExpandableContext(AbstractExpandableListItem);
