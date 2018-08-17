import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Input from '../../react-chayns-input/component/Input';
import ChooseButton from '../../react-chayns-button/component/ChooseButton';
import { VALID_RFID, SPLIT_RFID, RFID_CONTENT } from '../constants/regex';

export default class RfidInput extends React.Component {
    static pretifyRfid(rfid) {
        return rfid ? rfid.match(SPLIT_RFID).join(' ') : '';
    }

    static isNfcAvailable() {
        return (chayns.env.isMyChaynsApp && (chayns.env.isAndroid || (chayns.env.isIOS && chayns.env.appVersion >= 5764)))
            || (chayns.env.isApp && (chayns.env.isAndroid));
    }

    static propTypes = {
        className: PropTypes.string,
        placeholder: PropTypes.string,
        confirmNode: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.arrayOf(PropTypes.node)
        ]),
        enableScan: PropTypes.bool,
        scanText: PropTypes.string,
        value: PropTypes.string.isRequired,
        onInput: PropTypes.func.isRequired,
        onConfirm: PropTypes.func.isRequired,
    };

    static defaultProps = {
        className: null,
        placeholder: 'Kartennummer',
        confirmNode: 'OK',
        enableScan: false,
        scanText: 'Scannen',
    };

    state = {
        isScanning: false,
    };

    onConfirm = () => {
        const { onConfirm, value } = this.props;
        onConfirm(value);
    };

    onInput = (newRfid) => {
        const { onInput } = this.props;

        const newValue = newRfid.toUpperCase().replace(/\s/g, '');
        if(!RFID_CONTENT.test(newValue)) {
            return;
        }

        onInput(newValue);
    };

    onScan = (rfid) => {
        this.endScan();
        if(VALID_RFID.test(rfid)) {
            const newRfid = rfid.toUpperCase();
            const { onConfirm, onInput } = this.props;
            onInput(newRfid);
            onConfirm(newRfid);
        }
    };

    startScan = () => {
        this.setState({ isScanning: true });
        chayns.setNfcCallback(this.onScan);
        chayns.showWaitCursor();
    };

    endScan = () => {
        const { isScanning } = this.state;

        if(!isScanning) {
            return;
        }
        chayns.removeNfcCallback();
        chayns.hideWaitCursor();
        this.setState({ isScanning: false });
    };

    render() {
        const {
            className,
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

        return(
            <div className={classNames}>
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
                        <ChooseButton
                            onClick={isScanning ? this.endScan : this.startScan}
                            className="cc__rfid-input__scan"
                        >
                            {scanText}
                        </ChooseButton>
                    )}
                    {(!enableScan || value) && (
                        <ChooseButton
                            onClick={this.onConfirm}
                            disabled={disabled}
                            className="cc__rfid-input__confirm"
                        >
                            {confirmNode}
                        </ChooseButton>
                    )}
                </div>
            </div>
        );
    }
}
