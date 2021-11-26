import React, { useRef } from 'react';
import Button from '../../src/react-chayns-button/component/Button';
import Signature from '../../src/react-chayns-signature/component/Signature';

const SignatureExample = () => {
    const ref = useRef();

    return (
        <>
            <div style={{ display: 'flex', margin: '10px 0' }}>
                <Button
                    onClick={() => {
                        ref.current.edit();
                    }}
                    style={{ marginRight: 8 }}
                >
                    Bearbeiten
                </Button>
                <Button
                    onClick={() => {
                        ref.current.delete();
                    }}
                >
                    Löschen
                </Button>
            </div>
            <Signature
                ref={ref}
                forceShowSignature
                onSubscribe={() =>
                    chayns.dialog.toast({
                        description: 'Unterschrieben',
                        duration: 3000,
                    })
                }
                onEdit={(e) => console.log('edit', e)}
            />
        </>
    );
};

export default SignatureExample;
