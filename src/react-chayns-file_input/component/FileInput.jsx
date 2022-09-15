/**
 * @component
 */

import classNames from 'clsx';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Icon from '../../react-chayns-icon/component/Icon';
import { isFunction } from '../../utils/is';
import fileInputCall from '../utils/fileInputCall';
import supportsFileInput from '../utils/supportsFileInput';
import compressImage from '../../utils/compressImage';

/**
 * Accepts specified file types via dialog or drag and drop.
 */
export default class FileInput extends PureComponent {
    constructor(props) {
        super(props);
        this.itemRefs = [];
        this.fileInputRefs = [];
        this.needAppCall = !supportsFileInput();
        this.state = {
            hasMemoryAccess: !(
                chayns.env.isAndroid &&
                (chayns.env.isApp || chayns.env.isMyChaynsApp) &&
                (chayns.env.myChaynsAppVersion || chayns.env.appVersion) >= 6244
            ),
        };
    }

    onDragEnter = (event, item, index) => {
        if (this.checkFileType(event.dataTransfer.items[0].type, item.types)) {
            this.itemRefs[index].classList.add('cc__file-input--hover');
        }
    };

    onDragLeave = (index) => {
        this.itemRefs[index].classList.remove('cc__file-input--hover');
    };

    onError = (item, errorMessage) => {
        if (isFunction(item.onError)) {
            return item.onError(errorMessage);
        }
        return chayns.dialog.alert('', errorMessage);
    };

    onChange = async (event, item, index) => {
        const { errorMessages } = this.props;
        const { files } = event.target;
        this.onDragLeave(index);
        if (files && files.length > 0) {
            const invalidFiles = [];
            const validFiles = [];
            for (let i = 0, l = files.length; i < l; i++) {
                const file = files[i];
                if (!this.checkFileType(file.type, item.types)) {
                    invalidFiles.push(file);
                    this.onError(item, errorMessages.wrongFileType);
                } else if (
                    item.maxNumberOfFiles > 0 &&
                    validFiles.length >= item.maxNumberOfFiles
                ) {
                    invalidFiles.push(file);
                    this.onError(
                        item,
                        errorMessages.tooMuchFiles.replace(
                            '##NUMBER##',
                            item.maxNumberOfFiles
                        )
                    );
                } else if (
                    item.maxFileSize > 0 &&
                    file.size > item.maxFileSize
                ) {
                    // eslint-disable-next-line no-await-in-loop
                    await compressImage(file, item.maxFileSize)
                        .then((result) => validFiles.push(result))
                        .catch(() => {
                            this.onError(
                                item,
                                errorMessages.fileTooBig.replace(
                                    '##SIZE##',
                                    `${Math.ceil(
                                        item.maxFileSize / (1024 * 1024)
                                    )} MB`
                                )
                            );
                            invalidFiles.push(file);
                        });
                } else {
                    validFiles.push(file);
                }
            }
            item.onChange(validFiles, invalidFiles);
        }
        this.fileInputRefs[index].value = null;
    };

    onClick = async (event, item, index) => {
        const { hasMemoryAccess } = this.state;
        const { stopPropagation, errorMessages } = this.props;
        if (stopPropagation) event.stopPropagation();
        if (isFunction(item.onClick)) item.onClick(event);
        if (item.onChange) {
            if (this.needAppCall) {
                const compatibilityEvent = await fileInputCall(); // TODO remove in future version
                this.onChange(compatibilityEvent, item, index);
            } else if (!hasMemoryAccess) {
                const result = await chayns.invokeCall({ action: 239 }, true);
                if (result.status === 1) {
                    this.setState({ hasMemoryAccess: true });
                    this.fileInputRefs[index].click();
                } else if (
                    result.status === 2 &&
                    errorMessages.temporaryNoPermission
                ) {
                    this.onError(item, errorMessages.temporaryNoPermission);
                } else if (
                    result.status === 3 &&
                    errorMessages.permanentNoPermission
                ) {
                    await this.onError(
                        item,
                        errorMessages.permanentNoPermission
                    );
                    chayns.invokeCall({
                        action: 239,
                        value: {
                            showAppInfo: true,
                        },
                    });
                }
            }
        }
    };

    checkFileType = (fileType, supportedTypes) => {
        if (fileType === '') {
            return true;
        }
        for (let i = 0; i < supportedTypes.length; i += 1) {
            const type = supportedTypes[i];
            if (type === FileInput.types.ALL) {
                return true;
            }

            if (type === fileType) {
                return true;
            }

            const fileTypeMatch = fileType.match(/(.)+\//g);
            const typeMatch = type.match(/(.)+\//g);
            if (
                type.match(/\/\*/g) &&
                fileTypeMatch &&
                typeMatch &&
                fileTypeMatch[0] === typeMatch[0]
            ) {
                return true;
            }
        }
        return false;
    };

    render() {
        const { items, className, style, disabled } = this.props;

        const { hasMemoryAccess } = this.state;

        return (
            <div
                className={classNames(
                    'cc__file-input',
                    'cc__file-input--custom',
                    className,
                    { 'cc__file-input--disabled': disabled }
                )}
                style={style}
            >
                {items.map((item, index) => (
                    <div
                        className={classNames(
                            'cc__file-input__split',
                            item.className,
                            { 'cc__file-input__split--disabled': item.disabled }
                        )}
                        style={item.style}
                        // eslint-disable-next-line react/no-array-index-key
                        key={`item${index}`}
                    >
                        {item.content && item.content.children ? (
                            item.content.children
                        ) : (
                            <div
                                className="cc__file-input--placeholder"
                                ref={(ref) => {
                                    this.itemRefs[index] = ref;
                                }}
                                onClick={(event) =>
                                    this.onClick(event, item, index)
                                }
                            >
                                {item.onChange && !this.needAppCall ? (
                                    <input
                                        style={
                                            !hasMemoryAccess
                                                ? { display: 'none' }
                                                : null
                                        }
                                        title=""
                                        multiple={item.maxNumberOfFiles !== 1}
                                        directory={item.directory ? '' : null}
                                        webkitdirectory={
                                            item.directory ? '' : null
                                        }
                                        className="cc__file-input__input"
                                        type="file"
                                        onChange={(event) =>
                                            this.onChange(event, item, index)
                                        }
                                        accept={item.types}
                                        onDragEnter={(event) =>
                                            this.onDragEnter(event, item, index)
                                        }
                                        onDragLeave={() =>
                                            this.onDragLeave(index)
                                        }
                                        ref={(ref) => {
                                            this.fileInputRefs[index] = ref;
                                        }}
                                    />
                                ) : null}
                                <span className="cc__file-input__icon">
                                    <Icon
                                        icon={
                                            item.content && item.content.icon
                                                ? item.content.icon
                                                : 'fa fa-upload'
                                        }
                                    />
                                </span>
                                <div className="cc__file-input__message">
                                    {item.content && item.content.text
                                        ? item.content.text
                                        : 'Datei hochladen'}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    }
}

FileInput.types = {
    IMAGE: 'image/*',
    VIDEO: 'video/*',
    AUDIO: 'audio/*',
    ALL: '*',
};

FileInput.typePresets = {
    TSIMG_CLOUD: [
        'image/png',
        'image/jpg',
        'image/jpeg',
        'image/gif',
        'image/webp',
    ],
    STREAMINGSERVICE: [
        'video/mp4',
        'video/webm',
        'video/avi',
        'video/flv',
        'video/wmv',
        'video/mpg',
        'video/quicktime',
    ],
};

FileInput.propTypes = {
    /**
     * A classname string that is applied to the root element.
     */
    className: PropTypes.string,

    /**
     * A React style object that is applied to the root element.
     */
    style: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),

    /**
     * Wether to stop propagation of click events to parent elements.
     */
    stopPropagation: PropTypes.bool,

    /**
     * Disables any interaction with the component and renders it in a disabled
     * style.
     */
    disabled: PropTypes.bool,

    /**
     * Custom error messages for the component.
     */
    errorMessages: PropTypes.shape({
        tooMuchFiles: PropTypes.string,
        fileTooBig: PropTypes.string,
        wrongFileType: PropTypes.string,
        permanentNoPermission: PropTypes.string,
        temporaryNoPermission: PropTypes.string,
    }),

    /**
     * The different fields that will be shown in the file input.
     */
    items: PropTypes.arrayOf(
        PropTypes.shape({
            types: PropTypes.arrayOf(PropTypes.string),
            maxFileSize: PropTypes.number,
            maxNumberOfFiles: PropTypes.number,
            directory: PropTypes.bool,
            onClick: PropTypes.func,
            onChange: PropTypes.func,
            onError: PropTypes.func,
            className: PropTypes.string,
            style: PropTypes.objectOf(
                PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            ),
            disabled: PropTypes.bool,
            content: PropTypes.oneOfType([
                PropTypes.shape({
                    text: PropTypes.string,
                    icon: PropTypes.oneOfType([
                        PropTypes.string,
                        PropTypes.object,
                    ]),
                }),
                PropTypes.shape({
                    children: PropTypes.oneOfType([
                        PropTypes.node,
                        PropTypes.arrayOf(PropTypes.node),
                    ]),
                }),
            ]),
        })
    ),
};

FileInput.defaultProps = {
    className: null,
    style: null,
    stopPropagation: false,
    disabled: false,
    errorMessages: {
        tooMuchFiles: 'Du kannst nur ##NUMBER## Dateien hochladen.',
        fileTooBig: 'Es sind nur Dateien bis ##SIZE## erlaubt.',
        wrongFileType: 'Mindestens eine Datei hat das falsche Dateiformat.',
        permanentNoPermission:
            'Bitte überprüfe die Einstellungen Deiner App und erlaube den Dateizugriff auf Deinem Gerät.',
        temporaryNoPermission: null,
    },
    items: [
        {
            types: [FileInput.types.ALL],
            maxFileSize: 4 * 1024 * 1024, // 4 MB
            maxNumberOfFiles: 0, // 0=infinity
            directory: false,
            onClick: null,
            onChange: null,
            onError: null,
            className: null,
            style: null,
            disabled: false,
            content: null,
        },
    ],
};

FileInput.displayName = 'FileInput';
