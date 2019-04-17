/* eslint-disable jsx-a11y/click-events-have-key-events,react/no-unused-prop-types,no-return-assign,react/no-array-index-key */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { faUpload } from '@fortawesome/free-solid-svg-icons/faUpload';
import Icon from '../../react-chayns-icon/component/Icon';

export default class FileInput extends PureComponent {
    static types = {
        IMAGE: 'image/*',
        VIDEO: 'video/*',
        AUDIO: 'audio/*',
        ALL: '*',
    };

    static typePresets = {
        TSIMG_CLOUD: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'],
    };

    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        stopPropagation: PropTypes.bool,
        disabled: PropTypes.bool,
        errorMessages: PropTypes.shape({
            tooMuchFiles: PropTypes.string,
            fileTooBig: PropTypes.string,
            wrongFileType: PropTypes.string,
        }),
        items: PropTypes.arrayOf(PropTypes.shape({
            types: PropTypes.arrayOf(PropTypes.string),
            maxFileSize: PropTypes.number,
            maxNumberOfFiles: PropTypes.number,
            onClick: PropTypes.func,
            onChange: PropTypes.func,
            className: PropTypes.string,
            style: PropTypes.object,
            disabled: PropTypes.bool,
            content: PropTypes.oneOfType([PropTypes.shape({
                text: PropTypes.string,
                icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
            }), PropTypes.shape({
                children: PropTypes.oneOfType([
                    PropTypes.node,
                    PropTypes.arrayOf(PropTypes.node),
                ]),
            })]),
        })),
    };

    static defaultProps = {
        className: null,
        style: null,
        stopPropagation: false,
        disabled: false,
        errorMessages: {
            tooMuchFiles: 'Du kannst nur ##NUMBER## Dateien hochladen.',
            fileTooBig: 'Es sind nur Dateien bis ##SIZE## erlaubt.',
            wrongFileType: 'Mindestens eine Datei hat das falsche Dateiformat.',
        },
        items: [{
            types: [FileInput.types.ALL],
            maxFileSize: 4 * 1024 * 1024, // 4 MB
            maxNumberOfFiles: 0, // 0=infinity
            onClick: null,
            onChange: null,
            className: null,
            style: null,
            disabled: false,
            content: null,
        }],
    };

    constructor(props) {
        super(props);
        this.itemRefs = [];
        this.fileInputRefs = [];
        this.needAppCall = (chayns.env.isApp || chayns.env.isMyChaynsApp) && chayns.env.isAndroid && chayns.env.appVersion < 6000;
    }

    onDragEnter = (event, item, index) => {
        if (this.checkFileType(event.dataTransfer.items[0].type, item.types)) {
            this.itemRefs[index].classList.add('cc__file-input--hover');
        }
    };

    onDragLeave = (index) => {
        this.itemRefs[index].classList.remove('cc__file-input--hover');
    };

    onChange = (event, item, index) => {
        const { errorMessages } = this.props;
        const { files } = event.target;
        this.onDragLeave(index);
        if (files && files.length > 0) {
            const invalidFiles = [];
            const validFiles = [];
            Object.keys(files).forEach((fileIndex) => {
                const file = files[fileIndex];
                if (!this.checkFileType(file.type, item.types)) {
                    invalidFiles.push(file);
                    chayns.dialog.alert('', errorMessages.wrongFileType);
                } else if (item.maxNumberOfFiles > 0 && validFiles.length >= item.maxNumberOfFiles) {
                    invalidFiles.push(file);
                    chayns.dialog.alert('', errorMessages.tooMuchFiles.replace('##NUMBER##', item.maxNumberOfFiles));
                } else if (item.maxFileSize > 0 && file.size > item.maxFileSize) {
                    chayns.dialog.alert('', errorMessages.fileTooBig.replace('##SIZE##', `${Math.ceil(item.maxFileSize / (1024 * 1024))} MB`));
                    invalidFiles.push(file);
                } else {
                    validFiles.push(file);
                }
            });
            item.onChange(validFiles, invalidFiles);
        }
        this.fileInputRefs[index].value = null;
    };

    onClick = async (event, item, index) => {
        const { stopPropagation } = this.props;
        if (stopPropagation) event.stopPropagation();
        if (typeof item.onClick === 'function') item.onClick(event);
        if (this.needAppCall && item.onChange) {
            const uploadResult = await chayns.uploadCloudImage();
            const type = uploadResult.url.match(/(\.[a-z]+)/g)[0];
            const response = await fetch(uploadResult.url);
            const data = await response.blob();
            const metadata = {
                type: `image/${type}`,
            };
            const file = new File([data], `androidCompatibilityUpload${type}`, metadata);
            const compatibilityEvent = { target: { files: [file] } };
            this.onChange(compatibilityEvent, item, index);
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
            if (type.match(/\/\*/g) && fileTypeMatch && typeMatch && fileTypeMatch[0] === typeMatch[0]) {
                return true;
            }
        }
        return false;
    };

    render() {
        const {
            items,
            className,
            style,
            disabled,
        } = this.props;

        return (
            <div
                className={classNames('cc__file-input', 'cc__file-input--custom', className, { 'cc__file-input--disabled': disabled })}
                style={style}
            >
                {
                    items.map((item, index) => (
                        <div
                            className={classNames('cc__file-input__split', item.className, { 'cc__file-input__split--disabled': item.disabled })}
                            style={item.style}
                            key={`item${index}`}
                        >
                            {
                                item.content && item.content.children
                                    ? item.content.children
                                    : (
                                        <div
                                            className="cc__file-input--placeholder"
                                            ref={ref => this.itemRefs[index] = ref}
                                            onClick={event => this.onClick(event, item, index)}
                                        >
                                            {
                                                item.onChange && !this.needAppCall
                                                    ? (
                                                        <input
                                                            title=""
                                                            multiple={item.maxNumberOfFiles !== 1}
                                                            className="cc__file-input__input"
                                                            type="file"
                                                            onChange={event => this.onChange(event, item, index)}
                                                            accept={item.types}
                                                            onDragEnter={event => this.onDragEnter(event, item, index)}
                                                            onDragLeave={() => this.onDragLeave(index)}
                                                            ref={ref => this.fileInputRefs[index] = ref}
                                                        />
                                                    )
                                                    : null
                                            }
                                            <span className="cc__file-input__icon">
                                                <Icon
                                                    icon={
                                                        item.content && item.content.icon
                                                            ? item.content.icon
                                                            : faUpload
                                                    }
                                                />
                                            </span>
                                            <div
                                                className="cc__file-input__message"
                                            >
                                                {
                                                    item.content && item.content.text
                                                        ? item.content.text
                                                        : 'Datei hochladen'
                                                }
                                            </div>
                                        </div>
                                    )
                            }
                        </div>
                    ))
                }
            </div>
        );
    }
}
