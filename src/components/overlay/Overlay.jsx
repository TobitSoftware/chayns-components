import { any, instanceOf, node } from 'prop-types';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { isServer } from '../../utils/isServer';
import './overlay.scss';

const Overlay = ({ parent, children }) => {
    const [parentElement, setParentElement] = useState(() => {
        if (!parent && !isServer()) {
            return document.createElement('div');
        }
        return null;
    });

    useEffect(() => {
        if (parent) {
            setParentElement(null);
        } else if (!parentElement) {
            setParentElement(document.createElement('div'));
        }
    }, [parent, parentElement]);

    useEffect(
        // eslint-disable-next-line consistent-return
        () => {
            if (parentElement) {
                parentElement.className = 'cc_overlay-parent';
                document.body.appendChild(parentElement);

                return () => {
                    parentElement.remove();
                };
            }
        },
        [parentElement]
    );

    return isServer()
        ? null
        : ReactDOM.createPortal(children, parent || parentElement);
};

Overlay.propTypes = {
    parent: isServer() ? any : instanceOf(Element),
    children: node.isRequired,
};

Overlay.defaultProps = {
    parent: null,
};

export default Overlay;
