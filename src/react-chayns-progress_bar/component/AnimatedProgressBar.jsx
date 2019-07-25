import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import ProgressBar from './ProgressBar';

const AnimatedProgressBar = ({ value, ready, children }) => {
    return (
        <div className="cc__animated-progress-bar">
            <CSSTransition
                timeout={300}
                classNames="cc__progress-bar--animation-1"
                in={!ready}
                unmountOnExit
            >
                <ProgressBar value={value} />
            </CSSTransition>
            <CSSTransition
                timeout={300}
                classNames="cc__progress-bar--animation-2"
                in={ready}
            >
                <div
                    className="chayns__color--headline"
                    style={{ fontSize: '85%' }}
                >
                    {children}
                </div>
            </CSSTransition>
        </div>
    );
};

AnimatedProgressBar.propTypes = {
    value: PropTypes.number,
    ready: PropTypes.bool,
    children: PropTypes.node,
};

AnimatedProgressBar.defaultProps = {
    value: null,
    ready: null,
    children: null,
};

export default AnimatedProgressBar;
