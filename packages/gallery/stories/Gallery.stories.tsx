import { ComponentMeta, ComponentStory } from '@storybook/react';

import Gallery from '../src/components/gallery/Gallery';

export default {
    title: 'Gallery/Gallery',
    component: Gallery,
    args: {
        accessToken:
            'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsInZlciI6MSwia2lkIjoibmtpM21kYmcifQ.eyJqdGkiOiJkMjZlMDkyNy1kNmFlLTRiMmQtYThjYy1iMDVkMDE2Y2IxMTkiLCJzdWIiOiJNSUMtSEFFTDEiLCJ0eXBlIjoxLCJleHAiOiIyMDIzLTAzLTE3VDEzOjU0OjUzWiIsImlhdCI6IjIwMjMtMDMtMTNUMTM6NTQ6NTNaIiwiTG9jYXRpb25JRCI6MTg1MDQzLCJTaXRlSUQiOiI3Nzg5Ni0yMTg4NCIsIklzQWRtaW4iOmZhbHNlLCJUb2JpdFVzZXJJRCI6MjA3OTQxNSwiUGVyc29uSUQiOiJNSUMtSEFFTDEiLCJGaXJzdE5hbWUiOiJNaWNoYWVsIiwiTGFzdE5hbWUiOiJHZXNlbmh1ZXMiLCJwcm92IjoyLCJoYXNDaGlsZHJlbiI6dHJ1ZX0.EYSMtOMlFFkUnJ7a2Wawz0InDS_sSf-YOeV1OtEN9Y7Hwcx8_fQwmdyV2Ft11zRwzXPrOC3srkUhgi17fBPa4yqzgE06KhOFJw22qYFnSPtsIQ3LzQD9TENQnfOGPqs_tH9SUB8uN_lzQ2CNhnu9FnE9gPwAzrUWe0TULqVY2cYCz34nVBLwR1zuL5MXc6VMd86r6AcYtnu6nQZ3k-5Hap3cWkj4VLYGbGF30EvYz_B71vvCX4HfbhrWbHcnnH2ifn114omZVJMFfTEVS6Al5rBlUfNdU0chv6B2gFi0idZG8CJ4JYeEv4U_gzwSiaVcgTtJkPiIPUk0lquQhRBL1g',
        personId: 'MIC-HAEL1',
        isAuthenticated: true,
    },
} as unknown as ComponentMeta<typeof Gallery>;

const Template: ComponentStory<typeof Gallery> = ({ children, ...args }) => (
    <Gallery {...args}>{children}</Gallery>
);

export const General = Template.bind({});
