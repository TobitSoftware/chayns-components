/* eslint-disable jsx-a11y/click-events-have-key-events,react/no-unused-prop-types,no-return-assign */
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
            fileInputRef: PropTypes.func,
            content: PropTypes.oneOfType([PropTypes.shape({
                text: PropTypes.string,
                icon: PropTypes.oneOfType(PropTypes.string, PropTypes.object)
            }), PropTypes.shape({
                children: PropTypes.oneOfType([
                    PropTypes.node,
                    PropTypes.arrayOf(PropTypes.node),
                ])
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
            maxFileSize: 4194304, // 4 MB
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
        this.uploadRefs = [];
    }

    onDragEnter = (event, item, index) => {
        if (this.checkFileType(event.dataTransfer.items[0].type, item.types)) {
            this.uploadRefs[index].classList.add('cc__file-upload--hover');
        }
    };

    onDragLeave = (index) => {
        this.uploadRefs[index].classList.remove('cc__file-upload--hover');
    };

    onChange = (event, item, index) => {
        const { errorMessages } = this.props;
        this.onDragLeave(index);
        if (event.target.files && event.target.files.length > 0) {
            const invalidFiles = [];
            const validFiles = [];
            Object.keys(event.target.files).forEach((fileIndex) => {
                const file = event.target.files[fileIndex];
                if(!this.checkFileType(file.type, item.types)) {
                    invalidFiles.push(file);
                    chayns.dialog.alert('', errorMessages.wrongFileType);
                }else if (item.maxNumberOfFiles > 0 && validFiles.length >= item.maxNumberOfFiles) {
                    invalidFiles.push(file);
                    chayns.dialog.alert('', errorMessages.tooMuchFiles.replace('##NUMBER##', item.maxNumberOfFiles));
                } else if (item.maxFileSize > 0 && file.size > item.maxFileSize) {
                    chayns.dialog.alert('', errorMessages.fileTooBig.replace('##SIZE##', `${Math.ceil(item.maxFileSize / 1000000)} MB`));
                    invalidFiles.push(file);
                } else {
                    validFiles.push(file);
                }
            });
            item.onChange(validFiles, invalidFiles);
        }
    };

    onClick = (event, item) => {
        const { stopPropagation } = this.props;
        if (stopPropagation) event.stopPropagation();
        if (typeof item.onClick === 'function') item.onClick(event);
    };

    checkFileType = (fileType, supportedTypes) => {
        for (let i = 0; i < supportedTypes.length; i += 1) {
            const type = supportedTypes[i];
            if (type === fileType || (type.match(/\/\*/g) && fileType.match(/(.)+\//g)[0] === type.match(/(.)+\//g)[0])) {
                return true;
            }
        }
        return false;
    };

    render() {
        const {
            items, className, style, disabled
        } = this.props;

        return (
            <div
                className={classNames('cc__file-upload', 'cc__file-upload--custom', className, { 'cc__file-upload--disabled': disabled })}
                style={style}
            >
                {
                    items.map((item, index) => {
                        const nodeArray = [
                            <div
                                className={classNames('cc__file-upload__split', item.className, { 'cc__file-upload__split--disabled': item.disabled })}
                                style={item.style}
                            >
                                {
                                    item.content && item.content.children
                                        ? item.content.children
                                        : (
                                            <div
                                                className="cc__file-upload--placeholder"
                                                ref={ref => this.uploadRefs[index] = ref}
                                                onClick={event => this.onClick(event, item)}
                                            >
                                                {
                                                    item.onChange
                                                        ? (
                                                            <input
                                                                multiple={item.maxNumberOfFiles !== 1}
                                                                className="cc__file-upload__input"
                                                                type="file"
                                                                onChange={event => this.onChange(event, item, index)}
                                                                accept={item.types}
                                                                onDragEnter={event => this.onDragEnter(event, item, index)}
                                                                onDragLeave={() => this.onDragLeave(index)}
                                                                ref={item.fileInputRef}
                                                            />
                                                        )
                                                        : null
                                                }
                                                <span className="cc__file-upload__icon">
                                                    <Icon
                                                        icon={
                                                            item.content && item.content.icon
                                                                ? item.content.icon
                                                                : faUpload
                                                        }
                                                    />
                                                </span>
                                                <div
                                                    className="cc__file-upload__message"
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
                        ];
                        if (index !== 0) {
                            nodeArray.unshift(<div className="cc__file-upload__separator"/>);
                        }
                        return nodeArray;
                    })
                }
            </div>
        );
    }
}
