import { createDialog, DialogType } from 'chayns-api';
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { deleteUserSignature } from '../../api/signature/delete';
import { getUserSignature } from '../../api/signature/get';
import { putUserSignature } from '../../api/signature/put';
import Button from '../button/Button';
import Icon from '../icon/Icon';
import {
    StyledSignature,
    StyledSignatureDeleteIconWrapper,
    StyledSignatureImage,
    StyledSignatureImageWrapper,
} from './Signature.styles';

export interface SignatureRef {
    edit: VoidFunction;
    delete: VoidFunction;
}

export type SignatureProps = {
    /**
     * The text that should be displayed inside the button.
     */
    buttonText: string;
    /**
     * Whether the button is disabled.
     */
    isDisabled?: boolean;
    /**
     * Function to be executed when the signature is edited.
     */
    onEdit?: (signatureUrl: string) => void;
    /**
     * Function to be executed when the user deletes the signature.
     */
    onRemove?: () => void;
    /**
     * Function to be executed when the user subscribes.
     */
    onSubscribe?: (signatureUrl: string) => void;
    /**
     * Function to be executed when the user unsubscribes.
     */
    onUnsubscribe?: () => void;
};

interface SignatureDialogResult {
    buttonType: number;
    result?: string;
}

const Signature = forwardRef<SignatureRef, SignatureProps>(
    ({ onEdit, onRemove, onUnsubscribe, onSubscribe, buttonText, isDisabled }, ref) => {
        const [signatureUrl, setSignatureUrl] = useState<string | undefined>(undefined);
        const [hasSubscribed, setHasSubscribed] = useState(false);

        useEffect(() => {
            const loadUserSignature = async () => {
                await getUserSignature().then((signature) => {
                    setSignatureUrl(signature);
                });
            };

            void loadUserSignature();
        }, []);

        const handleCallDialog = useCallback(
            async (shouldSubscribe: boolean) => {
                const { result, buttonType } = (await createDialog({
                    type: DialogType.SIGNATURE,
                }).open()) as SignatureDialogResult;

                if (buttonType === 1 && result) {
                    await putUserSignature(result).then((success) => {
                        if (success) {
                            setSignatureUrl(result);

                            if (shouldSubscribe) {
                                setHasSubscribed(true);

                                if (typeof onSubscribe === 'function') {
                                    onSubscribe(result);
                                }
                            } else if (typeof onEdit === 'function') {
                                onEdit(result);
                            }
                        }
                    });
                }
            },
            [onEdit, onSubscribe],
        );

        const handleEdit = useCallback(() => {
            void handleCallDialog(false);
        }, [handleCallDialog]);

        const handleDelete = useCallback(async () => {
            await deleteUserSignature().then((success) => {
                if (success) {
                    setHasSubscribed(false);
                    setSignatureUrl(undefined);

                    if (typeof onRemove === 'function') {
                        onRemove();
                    }
                }
            });
        }, [onRemove]);

        const handleClick = useCallback(() => {
            if (signatureUrl) {
                setHasSubscribed(true);

                if (typeof onSubscribe === 'function') {
                    onSubscribe(signatureUrl);
                }
            } else {
                void handleCallDialog(true);
            }
        }, [handleCallDialog, onSubscribe, signatureUrl]);

        const handleUnSubscribe = () => {
            setHasSubscribed(false);

            if (typeof onUnsubscribe === 'function') {
                onUnsubscribe();
            }
        };

        useImperativeHandle(
            ref,
            () => ({
                edit: handleEdit,
                delete: handleDelete,
            }),
            [handleDelete, handleEdit],
        );

        return (
            <StyledSignature>
                {!hasSubscribed ? (
                    <Button isDisabled={isDisabled} onClick={handleClick}>
                        {buttonText}
                    </Button>
                ) : (
                    <StyledSignatureImageWrapper>
                        <StyledSignatureImage src={signatureUrl} />
                        <StyledSignatureDeleteIconWrapper>
                            <Icon icons={['ts-wrong']} size={20} onClick={handleUnSubscribe} />
                        </StyledSignatureDeleteIconWrapper>
                    </StyledSignatureImageWrapper>
                )}
            </StyledSignature>
        );
    },
);

Signature.displayName = 'Signature';

export default Signature;
