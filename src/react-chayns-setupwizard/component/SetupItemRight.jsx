import React from 'react';
import { PropTypes } from 'prop-types';
import Badge from '../../react-chayns-badge/component/Badge';

const SetupItemRight = ({ right, ready }) => {
    const getReady = () => {
        if (right) {
            if (right.complete) {
                return right.complete;
            }
            return right;
        }
        return (
            <Badge>
                <i
                    className="ts-check chayns__color--headline "
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '1rem',
                    }}
                />
            </Badge>
        );
    };

    const getNotReady = () => {
        if (right) {
            if (right.notComplete) {
                return right.notComplete;
            }
            return right;
        }
        return null;
    };

    return (
        <div className="accordion__head__right">
            {ready ? getReady() : getNotReady()}
        </div>
    );
};

SetupItemRight.propTypes = {
    ready: PropTypes.bool,
    right: PropTypes.oneOfType([
        PropTypes.node.isRequired,
        PropTypes.shape({
            complete: PropTypes.node.isRequired,
            notComplete: PropTypes.node.isRequired,
        }).isRequired,
    ]),
};

SetupItemRight.defaultProps = {
    ready: false,
    right: null,
};

export default SetupItemRight;
