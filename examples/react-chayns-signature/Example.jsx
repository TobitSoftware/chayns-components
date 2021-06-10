import React from 'react';
import Signature from '../../src/react-chayns-signature/component/Signature';

const SignatureExample = () => (
    <Signature
        onSubscribe={() =>
            chayns.dialog.toast({
                description: 'Unterschrieben',
                duration: 3000,
            })
        }
    />
);

export default SignatureExample;
