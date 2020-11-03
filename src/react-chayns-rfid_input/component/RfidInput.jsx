/**
 * @component
 */

import classnames from 'clsx';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button from '../../react-chayns-button/component/Button';
import Input from '../../react-chayns-input/component/Input';
import { RFID_CONTENT, SPLIT_RFID, VALID_RFID } from '../constants/regex';

/**
 * A component to take in an RFID signal.
 */
export default class RfidInput extends Component {
    static pretifyRfid(rfid) {
        return rfid ? rfid.match(SPLIT_RFID).join(' ') : '';
    }

    static isNfcAvailable() {
        return (
            (chayns.env.isMyChaynsApp &&
                (chayns.env.isAndroid ||
                    (chayns.env.isIOS &&
                        chayns.env.myChaynsAppVersion >= 5764))) ||
            (chayns.env.isApp && chayns.env.isAndroid)
        );
    }

    constructor(props) {
        super(props);
        this.state = {
            isScanning: false,
        };
    }

    onConfirm = () => {
        const { onConfirm, value } = this.props;
        onConfirm(value);
    };

    onInput = (newRfid) => {
        const { onInput } = this.props;

        const newValue = newRfid.toUpperCase().replace(/\s/g, '');
        if (!RFID_CONTENT.test(newValue)) {
            return;
        }

        onInput(newValue);
    };

    onScan = (rfid) => {
        this.endScan();
        if (VALID_RFID.test(rfid)) {
            const newRfid = rfid.toUpperCase();
            const { onConfirm, onInput } = this.props;
            onInput(newRfid);
            onConfirm(newRfid);
        }
    };

    startScan = () => {
        this.setState({ isScanning: true });
        chayns.addNfcListener(this.onScan);
        chayns.showWaitCursor();
    };

    endScan = () => {
        const { isScanning } = this.state;

        if (!isScanning) {
            return;
        }

        chayns.removeNfcListener();
        chayns.hideWaitCursor();
        this.setState({ isScanning: false });
    };

    render() {
        const {
            className,
            style,
            placeholder,
            confirmNode,
            enableScan,
            scanText,
            value,
        } = this.props;
        const { isScanning } = this.state;

        const classNames = classnames(className, 'cc__rfid-input', {
            'cc__rfid-input--enable-scan': enableScan,
        });
        const disabled = !VALID_RFID.test(value);

        return (
            <div className={classNames} style={style}>
                <div className="cc__rfid-input__wrapper">
                    <Input
                        className="cc__rfid-input__input"
                        placeholder={placeholder}
                        onChange={this.onInput}
                        value={RfidInput.pretifyRfid(value)}
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                    />
                    {enableScan && !value && (
                        <Button
                            secondary
                            onClick={isScanning ? this.endScan : this.startScan}
                            className="cc__rfid-input__scan"
                        >
                            {scanText}
                        </Button>
                    )}
                    {(!enableScan || value) && (
                        <Button
                            secondary
                            onClick={this.onConfirm}
                            disabled={disabled}
                            className="cc__rfid-input__confirm"
                        >
                            {confirmNode}
                        </Button>
                    )}
                </div>
            </div>
        );
    }
}

RfidInput.propTypes = {
    /**
     * A classname string that will be applied to the container element.
     */
    className: PropTypes.string,

    /**
     * A React style object that will be applied to the container element.
     */
    style: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),

    /**
     * A string that will be shown as the placeholder.
     */
    placeholder: PropTypes.string,

    /**
     * A string or `ReactNode` that will be the content of the confirm button.
     */
    confirmNode: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]),

    /**
     * Wether to enable the scan-button for scanning a card.
     */
    enableScan: PropTypes.bool,

    /**
     * A string that will be the content of the scan-button.
     */
    scanText: PropTypes.string,

    /**
     * The input value.
     */
    value: PropTypes.string.isRequired,

    /**
     * A callback for when the `<input>`-elements content changes.
     */
    onInput: PropTypes.func.isRequired,

    /**
     * This will be called when the RFID input is completed and validated.
     */
    onConfirm: PropTypes.func.isRequired,
};

RfidInput.defaultProps = {
    className: null,
    style: null,
    placeholder: 'Kartennummer',
    confirmNode: 'OK',
    enableScan: false,
    scanText: 'Scannen',
};

RfidInput.displayName = 'RfidInput';
