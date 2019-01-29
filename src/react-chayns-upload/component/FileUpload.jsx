/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { faUpload } from '@fortawesome/free-solid-svg-icons/faUpload';

import selectFile from '../../utils/selectFile';
import getCompareFunction from '../utils/getCompareFunction';
import getMimeTypes from '../utils/getMimeTypes';
import uploadCloudImages from '../utils/uploadCloudImage';
import normalizeUploadResponse from '../utils/normalizeUploadResponse';
import Icon from '../../react-chayns-icon/component/Icon';

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
        uploadText: PropTypes.string,
        onUpload: PropTypes.func,
        disableListeners: PropTypes.bool,
        onClick: PropTypes.func,
        onDrop: PropTypes.func,
        customIcon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
        stopPropagation: PropTypes.bool,
    };

    static defaultProps = {
        type: 'all',
        multiple: true,
        onChange: null,
        className: '',
        children: null,
        uploadText: null,
        onUpload: null,
        disableListeners: false,
        onClick: null,
        onDrop: null,
        customIcon: null,
        stopPropagation: false,
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
            onUpload,
            onClick,
            disableListeners,
            stopPropagation,
        } = this.props;

        if(stopPropagation) event.stopPropagation();

        if(!disableListeners) {
            if (onClick) {
                return onClick(event);
            }

            if (onClick === false) {
                return false;
            }

            if (onUpload && type === FileUpload.TYPE_IMAGE) {
                if (chayns.env.user.isAuthenticated) {
                    return chayns.uploadCloudImage()
                        .then((uploadData) => {
                            onUpload(uploadData.url);
                        });
                }
                return chayns.login();
            }

            return selectFile({
                type: getMimeTypes(type),
                multiple,
            })
                .then((files) => {
                    const fileList = !multiple ? [files] : files;
                    this.checkFiles(fileList);
                });
        }
        return false;
    }

    onDrop(event) {
        const {
            onChange,
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

        if (onUpload && type === FileUpload.TYPE_IMAGE) {
            if (chayns.env.user.isAuthenticated) {
                return uploadCloudImages(files)
                    .then((data) => {
                        const uploadData = normalizeUploadResponse(data);
                        onUpload(uploadData[0].url);
                    });
            }
            return chayns.login();
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
            customIcon,
        } = this.props;
        const { hover } = this.state;

        const classNames = classnames('cc__file-upload--placeholder', {
            chayns__color: chayns.env.site.colorMode !== 1,
            'cc__file-upload--hover': hover,
            [className]: className,
        });

        let icon;
        if (customIcon) {
            icon = customIcon;
        } else {
            icon = faUpload;
        }

        return (
            <div
                className={classNames}
            >
                <span className="cc__file-upload__icon">
                    <Icon icon={icon}/>
                </span>
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

        const wrapperClassNames = classnames('cc__file-upload chayns__border-color', {
            'cc__file-upload--custom': children,
        });

        return (
            <div
                className={wrapperClassNames}
                onClick={this.onClick}
                onDrop={!disableListeners ? this.onDrop : null}
                onDragOver={!disableListeners ? this.onDragOver : null}
                onDragLeave={!disableListeners ? this.onDragLeave : null}
            >
                {children || this.renderPlaceholder()}
            </div>
        );
    }
}
