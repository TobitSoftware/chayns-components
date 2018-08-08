/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import selectFile from '../../utils/selectFile';
import getCompareFunction from '../utils/getCompareFunction';
import getMimeTypes from '../utils/getMimeTypes';
import uploadCloudImages from '../utils/uploadCloudImage';
import normalizeUploadResponse from '../utils/normalizeUploadResponse';

export default class FileUpload extends Component {
    static TYPE_IMAGE = 'image';

    static TYPE_VIDEO = 'video';

    static TYPE_AUDIO = 'audio';

    static TYPE_ALL = 'all';

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
        onUpload: PropTypes.func,
        disableListeners: PropTypes.bool,
        onClick: PropTypes.func,
        onDrop: PropTypes.func,
    };

    static defaultProps = {
        type: 'all',
        multiple: true,
        onChange: null,
        className: '',
        upload: false,
        children: null,
        uploadText: null,
        onUpload: null,
        disableListeners: false,
        onClick: null,
        onDrop: null,
    };

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

    onClick(event) {
        const {
            type,
            multiple,
            upload,
            onUpload,
            onClick
        } = this.props;

        if (onClick) {
            return onClick(event);
        }

        if (onClick === false) {
            return false;
        }

        if (upload && onUpload && type === FileUpload.TYPE_IMAGE) {
            return chayns.uploadCloudImage().then((data) => {
                if(!data.response || data.response.statusCode !== 200 || !data.response.data) {
                    return null;
                }

                try {
                    const responseData = JSON.parse(data.response.data);
                    return normalizeUploadResponse(responseData);
                } catch (ex) {
                    return null;
                }
            }).then((uploadData) => {
                onUpload(uploadData);
            });
        }

        return selectFile({
            type: getMimeTypes(type),
            multiple,
        }).then((files) => {
            const fileList = !multiple ? [files] : files;
            this.checkFiles(fileList);
        });
    }

    onDrop(event) {
        const {
            onChange,
            upload,
            onUpload,
            type,
            onDrop
        } = this.props;

        if (onDrop) {
            return onDrop(event);
        }

        if (onDrop === false) {
            return false;
        }

        event.stopPropagation();
        event.preventDefault();

        this.setState({
            hover: false,
        });

        const { files } = event.dataTransfer;

        if (upload && onUpload && type === FileUpload.TYPE_IMAGE) {
            return uploadCloudImages(files).then((data) => {
                const uploadData = normalizeUploadResponse(data);
                onUpload(uploadData);
            });
        }

        if (onChange) {
            return this.checkFiles(files);
        }

        return null;
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

        if (onChange) {
            onChange(files, validFiles, invalidFiles);
        }
    }

    renderPlaceholder() {
        const {
            type,
            className,
            uploadText,
        } = this.props;
        const { hover } = this.state;

        const classNames = classnames('cc__file-upload--placeholder', {
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

    render() {
        const {
            children,
            disableListeners,
        } = this.props;

        const wrapperClassNames = classnames('cc__file-upload', {
            'cc__file-upload--custom': children,
        });

        return (
            <div
                className={wrapperClassNames}
                onClick={!disableListeners ? this.onClick : null}
                onDrop={!disableListeners ? this.onDrop : null}
                onDragOver={!disableListeners ? this.onDragOver : null}
                onDragLeave={!disableListeners ? this.onDragLeave : null}
            >
                {children || this.renderPlaceholder()}
            </div>
        );
    }
}
