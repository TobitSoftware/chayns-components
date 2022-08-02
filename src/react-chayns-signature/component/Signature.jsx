/**
 * @component
 */

import React, {
    useEffect,
    useState,
    useCallback,
    forwardRef,
    useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';
import {
    getUserSignature,
    putUserSignature,
    deleteUserSignature,
} from '../api/signature';
import Button from '../../react-chayns-button/component/Button';
import Icon from '../../react-chayns-icon/component/Icon';
import './signature.scss';
import TextString from '../../react-chayns-textstring/component/TextString';

/**
 * A component to let the user subscribe
 */
const Signature = forwardRef(
    (
        {
            buttonText,
            buttonWrapperClassName,
            onSubscribe,
            skipLoadAndSave,
            disabled,
            onEdit,
            forceInitialShow,
            showDeleteIcon,
        },
        ref
    ) => {
        const [signatureUrl, setSignatureUrl] = useState(undefined);
        const [subscribed, setSubscribed] = useState(() => forceInitialShow);
        const [, setTextStringsLoaded] = useState(false);

        useEffect(() => {
            if (!skipLoadAndSave) getUserSignature().then(setSignatureUrl);
            TextString.loadLibrary('ChaynsComponents').then(() => {
                setTextStringsLoaded(true);
            });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        const editSignature = useCallback(async () => {
            const { buttonType, value } = await chayns.dialog.signature({
                buttons: [
                    {
                        text: TextString.getTextString(
                            'txt_chayns_components_signature_save'
                        ),
                        buttonType: chayns.dialog.buttonType.POSITIVE,
                    },
                    {
                        text: chayns.dialog.buttonText.CANCEL,
                        buttonType: chayns.dialog.buttonType.NEGATIVE,
                    },
                ],
            });

            if (buttonType === chayns.dialog.buttonType.POSITIVE) {
                let success = true;
                if (!skipLoadAndSave) {
                    success = value
                        ? await putUserSignature(value)
                        : await deleteUserSignature();
                }
                if (success) {
                    setSignatureUrl(value);
                    onEdit?.(value);
                }
                return {
                    success,
                    value: value || null,
                };
            }

            return {
                success: false,
                value: null,
            };
        }, [skipLoadAndSave, onEdit]);

        const deleteSignature = useCallback(async () => {
            await deleteUserSignature();
            let success = true;
            if (!skipLoadAndSave) {
                success = await deleteUserSignature();
            }
            if (success) {
                setSignatureUrl(null);
                onEdit?.(null);
            }
        }, [skipLoadAndSave, onEdit]);

        const onButtonClick = useCallback(async () => {
            if (!signatureUrl) {
                const { success, value } = await editSignature();

                if (success) {
                    setSubscribed(true);
                    onSubscribe?.(value);
                }
            } else {
                setSubscribed(true);
                onSubscribe?.(signatureUrl);
            }
        }, [signatureUrl, editSignature, onSubscribe]);

        useImperativeHandle(ref, () => ({
            edit: editSignature,
            delete: deleteSignature,
        }));

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
                <div className={buttonWrapperClassName}>
                    <Button onClick={onButtonClick} disabled={disabled}>
                        {buttonText ||
                            TextString.getTextString(
                                'txt_chayns_components_signature_button'
                            ) ||
                            ''}
                    </Button>
                </div>
            );
        }

        return (
            <div className="cc__signature">
                <img
                    src={signatureUrl}
                    alt="signature"
                    style={{
                        maxHeight: 130,
                        filter:
                            chayns.env.site.colorMode === 1
                                ? 'invert(1)'
                                : undefined,
                    }}
                    onClick={editSignature}
                />
                {showDeleteIcon && (
                    <Icon
                        icon="ts-wrong"
                        className="cc__signature--icon chayns__color--secondaryi"
                        onClick={deleteSignature}
                    />
                )}
            </div>
        );
    }
);

Signature.propTypes = {
    /**
     * The text shown in the button
     */
    buttonText: PropTypes.string,
    /**
     * the className to use on the button wrapping div
     */
    buttonWrapperClassName: PropTypes.string,
    /**
     * whether the subscribe button is disabled
     */
    disabled: PropTypes.bool,
    /**
     * disables loading and saving of the signature
     */
    skipLoadAndSave: PropTypes.bool,
    /**
     * callback which is called when the user subscribes
     */
    onSubscribe: PropTypes.func,
    /**
     * callback which is called when the user edits his subscription
     */
    onEdit: PropTypes.func,
    /**
     * Forces to show signature on initial render
     */
    forceInitialShow: PropTypes.bool,
    /**
     * whether the icon to delete the signature should be shown
     */
    showDeleteIcon: PropTypes.bool,
};

Signature.defaultProps = {
    buttonText: null,
    buttonWrapperClassName: null,
    disabled: false,
    skipLoadAndSave: false,
    onSubscribe: null,
    onEdit: null,
    forceInitialShow: false,
    showDeleteIcon: false,
};

Signature.displayName = 'Signature';

export default Signature;
