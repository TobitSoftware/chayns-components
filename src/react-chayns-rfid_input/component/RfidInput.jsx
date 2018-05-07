import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Input from '../../react-chayns-input/component/Input';
import ChooseButton from '../../react-chayns-button/component/ChooseButton';
import { VALID_RFID, SPLIT_RFID, RFID_CONTENT } from '../constants/regex'

export default class RfidInput extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        placeholder: PropTypes.string,
        confirmText: PropTypes.string,
        scanText: PropTypes.string,
        value: PropTypes.string.isRequired,
        onInput: PropTypes.func.isRequired,
        onConfirm: PropTypes.func.isRequired,
    };

    static defaultProps = {
        className: null,
        placeholder: 'Kartennummer',
        confirmText: 'OK',
        scanText: 'Scannen',
    };

    static pretifyRfid(rfid) {
        return rfid ? rfid.match(SPLIT_RFID).join(' ') : '';
    }

    state = {
        isScanning: false,
    };

    onConfirm = () => {
        const { onConfirm } = this.props;
        onConfirm(this.props.value);
    };

    onInput = (newRfid) => {
        const newValue = newRfid.toUpperCase().replace(/\s/g, '');
        if(!RFID_CONTENT.test(newValue)) {
            return;
        }
        this.props.onInput(newValue);
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
        if(!this.state.isScanning) {
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
            confirmText,
            scanText,
            value,
        } = this.props;
        const { isScanning } = this.state;
        const canScan = chayns.env.isApp;
        const classNames = classnames(className, 'cc__rfid-input');
        const disabled = !VALID_RFID.test(value);
        return(
            <div className={classNames}>
                <div className="cc__rfid-input__wrapper">
                    <Input
                        className="cc__rfid-input__input"
                        placeholder={placeholder}
                        onChange={this.onInput}
                        value={RfidInput.pretifyRfid(value)}
                    />
                    <ChooseButton
                        onClick={this.onConfirm}
                        disabled={disabled}
                        className="cc__rfid-input__confirm"
                    >
                        {confirmText}
                    </ChooseButton>
                </div>
                {canScan &&
                <div className="cc__rfid-input__control">
                    <ChooseButton
                        onClick={isScanning ? this.endScan : this.startScan}
                        className="cc__rfid-input__scan"
                    >
                        {scanText}
                    </ChooseButton>
                </div>}
            </div>
        );
    }
}
