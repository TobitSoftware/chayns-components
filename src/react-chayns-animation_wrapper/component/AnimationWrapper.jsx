import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import './animation-wrapper.scss';

const AnimationWrapper = ({ children, animationTime, setAutoTime }) => {
    const [height, setHeight] = useState(0);
    const childrenRef = useRef(0);

    useEffect(() => {
        const item = document.getElementById('animated__content');
        const styles = getComputedStyle(item);
        const itemMargin = parseInt(styles.marginTop, 10) + parseInt(styles.marginBottom, 10);
        const itemHeight = item.offsetHeight + itemMargin;

        const [element] = Array.from(childrenRef.current.children);

        const childrenMargin = parseInt(window.getComputedStyle(element).marginTop, 10);
        setHeight(itemHeight + childrenMargin);

        const timeout = setTimeout(() => {
            item.parentElement.style.height = `${itemHeight + childrenMargin}px`;
            item.parentElement.style.opacity = '1';

            setTimeout(() => {
                item.parentElement.style.height = 'auto';
            }, setAutoTime || itemHeight ? ((itemHeight + childrenMargin) / 5) * 200 : 400);
        }, 300);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div
            className="animation__wrapper"
            style={{ transition: `height ${animationTime || (height / 40) * 0.2}s, opacity ${animationTime || (height / 40) * 0.3}s ` }}
        >
            <div
                ref={childrenRef}
                id="animated__content"
            >
                {children}
            </div>
        </div>
    );
};

AnimationWrapper.propTypes = {
    children: PropTypes.node,
    animationTime: PropTypes.number,
    setAutoTime: PropTypes.number,
};

AnimationWrapper.defaultProps = {
    children: <div/>,
    animationTime: 0.2,
    setAutoTime: 400,
};

export default AnimationWrapper;
