/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import selectFile from '../../utils/selectFile';
import getCompareFunction, { IMAGE_MIME_TYPES } from '../utils/getCompareFunction';

export default class FileUpload extends Component {
    static propTypes = {
        type: PropTypes.oneOf(['images', 'all']),
        multiple: PropTypes.bool,
        onChange: PropTypes.func,
    };

    static defaultProps = {
        type: 'all',
        multiple: true,
        onChange: null,
    };

    static getText(type) {
        switch (type) {
            case 'images':
                return 'Bild hochladen';
            default:
                return 'Datei hochladen';
        }
    }

    constructor() {
        super();

        this.onDrop = this.onDrop.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        const { type, multiple } = this.props;

        selectFile({
            type: (type === 'images') ? IMAGE_MIME_TYPES.join(',') : '*/*',
            multiple,
        }).then((files) => {
            const fileList = !multiple ? [files] : files;
            this.checkFiles(fileList);
        });
    }

    onDrop(event) {
        const { onChange } = this.props;

        event.stopPropagation();
        event.preventDefault();

        const { files } = event.dataTransfer;

        if (onChange) {
            this.checkFiles(files);
        }
    }

    // eslint-disable-next-line class-methods-use-this
    onDragOver(event) {
        event.stopPropagation();
        event.preventDefault();

        // eslint-disable-next-line no-param-reassign
        event.dataTransfer.dropEffect = 'copy';
    }

    checkFiles(files) {
        const { type, multiple, onChange } = this.props;
        const { length } = files;

        const compareFunction = getCompareFunction(type);

        const invalidFiles = [];
        const validFiles = [];

        for (let i = 0; i < length; i += 1) {
            if (!multiple && i > 0) {
                invalidFiles.push(files[i]);
            } else if (!compareFunction(files[i])) {
                invalidFiles.push(files[i]);
            } else {
                validFiles.push(files[i]);
            }
        }

        onChange(files, validFiles, invalidFiles);
    }

    render() {
        const { type } = this.props;

        const classNames = classnames('cc__drop-zone', {
            'chayns__color--70': chayns.env.site.colorMode !== 1,
            'cc__drop-zone--image': (type === 'images'),
            'cc__drop-zone--documents': (!type || type === 'all')
        });

        return (
            <div
                className={classNames}
                onClick={this.onClick}
                onDrop={this.onDrop}
                onDragOver={this.onDragOver}
            >
                <i
                    className="cc__drop-zone__icon"
                    aria-hidden="true"
                />
                <div
                    className="cc__drop-zone__message"
                >
                    {FileUpload.getText(type)}
                </div>
            </div>
        );
    }
}
