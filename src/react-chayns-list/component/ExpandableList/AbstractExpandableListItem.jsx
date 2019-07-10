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
    static propTypes = {
        onToggle: PropTypes.func.isRequired,
        open: PropTypes.arrayOf(PropTypes.number),
        children: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.arrayOf(PropTypes.node),
        ]),
        header: PropTypes.node.isRequired,
        onOpen: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired,
        className: PropTypes.string,
        clickable: PropTypes.bool,
        noContentClass: PropTypes.bool,
        openProp: PropTypes.bool,
        style: PropTypes.object,
    };

    static defaultProps = {
        open: false,
        children: null,
        className: '',
        clickable: false,
        noContentClass: false,
        openProp: null,
        style: null,
    };

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

export default connectExpandableContext(AbstractExpandableListItem);
