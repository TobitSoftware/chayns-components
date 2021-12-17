import classnames from 'clsx';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Icon from '../../react-chayns-icon/component/Icon';

export default class Tag extends PureComponent {
    handleDelete = (ev) => {
        const { value, onDelete } = this.props;

        if (onDelete) {
            onDelete(value, ev);
        }
    };

    render() {
        const { children, selected, disableRemove } = this.props;

        return (
            <div
                className={classnames('cc__tag', {
                    'cc__tag--selected': selected,
                })}
                style={disableRemove ? { paddingRight: 10 } : undefined}
            >
                {children}
                {!disableRemove && (
                    <Icon
                        className="icon"
                        icon="fa fa-times"
                        onClick={this.handleDelete}
                    />
                )}
            </div>
        );
    }
}

Tag.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    value: PropTypes.object.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
    onDelete: PropTypes.func,
    selected: PropTypes.bool,
    disableRemove: PropTypes.bool,
};

Tag.defaultProps = {
    onDelete: null,
    selected: false,
    disableRemove: false,
};

Tag.displayName = 'Tag';
