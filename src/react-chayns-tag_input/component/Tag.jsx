import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Icon from '../../react-chayns-icon/component/Icon';

export default class Tag extends PureComponent {
    handleDelete = () => {
        const { value, onDelete } = this.props;

        if (onDelete) {
            onDelete(value);
        }
    };

    render() {
        const { children, selected } = this.props;

        return (
            <div
                className={classnames('cc__tag', {
                    'cc__tag--selected': selected,
                })}
            >
                {children}
                <Icon
                    className="icon"
                    icon="fa fa-times"
                    onClick={this.handleDelete}
                />
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
};

Tag.defaultProps = {
    onDelete: null,
    selected: false,
};

Tag.displayName = 'Tag';
