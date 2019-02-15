import React from 'react';
import ReactDom from 'react-dom';

import AccordionExample from './react-chayns-accordion/Example';
import AmountControlExample from './react-chayns-amountcontrol/Example';
import BadgeExample from './react-chayns-badge/Example';
import ButtonExample from './react-chayns-button/Example';
import CalendarExample from './react-chayns-calendar/Example';
import CheckboxExample from './react-chayns-checkbox/Example';
import ComboBoxExample from './react-chayns-combobox/Example';
import ContextMenuExample from './react-chayns-contextmenu/Example';
import EmojiInputExample from './react-chayns-emoji_input/Example';
import GalleryExample from './react-chayns-gallery/Example';
import GridCalendarExample from './react-chayns-gridcalendar/Example';
import IconExample from './react-chayns-icon/Example';
import InputExample from './react-chayns-input/Example';
import ListExample from './react-chayns-list/Example';
import MapExample from './react-chayns-map/Example';
import ModeSwitchExample from './react-chayns-modeswitch/Example';
import OpeningTimesExample from './react-chayns-openingTimes/Example';
import PersonFinderExample from './react-chayns-personfinder/Example';
import RadioButtonExample from './react-chayns-radiobutton/Example';
import ReceiverInputExample from './react-chayns-receiverinput/Example';
import RfidInputExample from './react-chayns-rfid_input/Example';
import ScrollViewExample from './react-chayns-scrollview/Example';
import SelectButtonExample from './react-chayns-selectbutton/Example';
import SelectListExample from './react-chayns-selectlist/Example';
import SetupWizardExample from './react-chayns-setupwizard/Example';
import SharingBarExample from './react-chayns-sharingbar/Example';
import SmallWaitCursorExample from './react-chayns-smallwaitcursor/Example';
import TextAreaExample from './react-chayns-textarea/Example';
import TextStringExample from './react-chayns-textstring/Example';
import TooltipExample from './react-chayns-tooltip/Example';
import FileUploadExample from './react-chayns-upload/Example';
import TextString from '../src/react-chayns-textstring/component/TextString';

import ExampleList from './ExampleList';

async function bootstrap() {
    await window.chayns.ready;

    await TextString.loadLibrary('TextStringTest');
    await TextString.loadLibrary('TextStringTest', 'langRes', 'nl');

    ReactDom.render(
        <ExampleList>
            <AccordionExample />
            <AmountControlExample />
            <BadgeExample />
            <ButtonExample />
            <CalendarExample />
            <CheckboxExample />
            <ComboBoxExample />
            <ContextMenuExample />
            <EmojiInputExample />
            <GalleryExample />
            <GridCalendarExample />
            <IconExample />
            <InputExample />
            <ListExample />
            <MapExample />
            <ModeSwitchExample />
            <OpeningTimesExample />
            <PersonFinderExample />
            <RadioButtonExample />
            <ReceiverInputExample />
            <RfidInputExample />
            <ScrollViewExample />
            <SelectButtonExample />
            <SelectListExample />
            <SetupWizardExample />
            <SharingBarExample />
            <SmallWaitCursorExample />
            <TextAreaExample />
            <TextStringExample />
            <TooltipExample />
            <FileUploadExample />
        </ExampleList>,
        document.querySelector('#app')
    );
}

bootstrap();

if (process.env.NODE_ENV !== 'production') {
    /* eslint-disable-next-line global-require */
    const { whyDidYouUpdate } = require('why-did-you-update');
    whyDidYouUpdate(React);
}
