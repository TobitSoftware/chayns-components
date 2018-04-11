/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import selectFile from '../../utils/selectFile';
import getCompareFunction from '../utils/getCompareFunction';
import getMimeTypes from '../utils/getMimeTypes';

export default class FileUpload extends Component {
    static propTypes = {
        type: PropTypes.oneOf(['image', 'video', 'audio', 'all']),
        multiple: PropTypes.bool,
        onChange: PropTypes.func,
        className: PropTypes.string,
        children: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.arrayOf(PropTypes.node),
        ]),
        upload: PropTypes.bool,
        uploadText: PropTypes.string,
    };

    static defaultProps = {
        type: 'all',
        multiple: true,
        onChange: null,
        className: '',
        upload: false,
        children: null,
        uploadText: null,
    };

    static TYPE_IMAGE = 'image';
    static TYPE_VIDEO = 'video';
    static TYPE_AUDIO = 'audio';
    static TYPE_ALL = 'all';

    static getText(type) {
        switch (type) {
            case 'image':
                return 'Bild hochladen';
            case 'video':
                return 'Video hochladen';
            case 'audio':
                return 'Song hochladen';
            default:
                return 'Datei hochladen';
        }
    }

    constructor() {
        super();

        this.state = {
            hover: false,
        };

        this.onDrop = this.onDrop.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        const { type, multiple } = this.props;

        selectFile({
            type: getMimeTypes(type),
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

        this.setState({
            hover: false,
        });

        const { files } = event.dataTransfer;

        if (onChange) {
            this.checkFiles(files);
        }
    }

    onDragOver(event) {
        event.stopPropagation();
        event.preventDefault();

        this.setState({
            hover: true,
        });

        // eslint-disable-next-line no-param-reassign
        event.dataTransfer.dropEffect = 'copy';
    }

    onDragLeave() {
        this.setState({
            hover: false,
        });
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
        const { type, className, uploadText } = this.props;
        const { hover } = this.state;

        const classNames = classnames('cc__file-upload', {
            'chayns__color--70': chayns.env.site.colorMode !== 1,
            'cc__file-upload--image': (type === 'image'),
            'cc__file-upload--audio': (type === 'audio'),
            'cc__file-upload--video': (type === 'video'),
            'cc__file-upload--documents': (!type || type === 'all'),
            'cc__file-upload--hover': hover,
            [className]: className,
        });

        return (
            <div
                className={classNames}
                onClick={this.onClick}
                onDrop={this.onDrop}
                onDragOver={this.onDragOver}
                onDragLeave={this.onDragLeave}
            >
                <i
                    className="cc__file-upload__icon"
                    aria-hidden="true"
                />
                <div
                    className="cc__file-upload__message"
                >
                    {uploadText || FileUpload.getText(type)}
                </div>
            </div>
        );
    }
}
