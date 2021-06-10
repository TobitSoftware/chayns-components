/**
 * @component
 */

import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
    getUserSignature,
    putUserSignature,
    deleteUserSignature,
} from '../api/signature';
import Button from '../../react-chayns-button/component/Button';

/**
 * A component to let the user subscribe
 */
const Signature = ({ onSubscribe }) => {
    const [signatureUrl, setSignatureUrl] = useState(undefined);
    const [subscribed, setSubscribed] = useState(false);

    useEffect(() => {
        getUserSignature().then(setSignatureUrl);
    }, []);

    const editSignature = useCallback(async () => {
        const { buttonType, value } = await chayns.dialog.signature({
            buttons: [
                {
                    text: 'Speichern',
                    buttonType: chayns.dialog.buttonType.POSITIVE,
                },
                {
                    text: chayns.dialog.buttonText.CANCEL,
                    buttonType: chayns.dialog.buttonType.NEGATIVE,
                },
            ],
        });

        if (buttonType === chayns.dialog.buttonType.POSITIVE) {
            const success = value
                ? await putUserSignature(value)
                : await deleteUserSignature();
            if (success) {
                setSignatureUrl(value);
            }
            return success;
        }

        return false;
    }, []);

    const onButtonClick = useCallback(async () => {
        if (!signatureUrl) {
            const success = await editSignature();

            if (success) {
                setSubscribed(true);
                onSubscribe?.();
            }
        } else {
            setSubscribed(true);
            onSubscribe?.();
        }
    }, [signatureUrl, editSignature, onSubscribe]);

    if (!chayns.env.user.isAuthenticated) {
        return (
            <div>
                <Button
                    onClick={async () => {
                        await new Promise((resolve) => {
                            const cb = () => {
                                resolve();
                                chayns.removeAccessTokenChangeListener(cb);
                            };
                            chayns.addAccessTokenChangeListener(cb);
                            chayns.login();
                        });
                        getUserSignature().then(setSignatureUrl);
                    }}
                >
                    Anmelden
                </Button>
            </div>
        );
    }

    if (!subscribed || !signatureUrl) {
        return (
            <div>
                <Button onClick={onButtonClick}>Unterschreiben</Button>
            </div>
        );
    }

    return (
        <div>
            <img
                src={signatureUrl}
                alt="signature"
                style={{ maxHeight: 130 }}
                onClick={editSignature}
            />
        </div>
    );
};

Signature.propTypes = {
    /**
     * callback which is called when the user subscribes
     */
    onSubscribe: PropTypes.func,
};

Signature.defaultProps = {
    onSubscribe: null,
};

Signature.displayName = 'Signature';

export default Signature;
