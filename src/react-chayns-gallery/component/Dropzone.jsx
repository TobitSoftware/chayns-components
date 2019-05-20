import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './DropZone.scss';

export default class Dropzone extends PureComponent {
    static propTypes = {};

    static defaultProps = {};

    render() {
        return (
            <div className="cc__gallery__dropzone chayns__background-color--101 chayns__border-color--300" />
        );
    }
}
