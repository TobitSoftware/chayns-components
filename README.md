[![npm](https://img.shields.io/npm/v/chayns-components.svg?style=flat-square)](https://www.npmjs.com/package/chayns-components) 
[![npm downloads](https://img.shields.io/npm/dm/chayns-components.svg?style=flat-square)](https://www.npmjs.com/package/chayns-components)
[![license](https://img.shields.io/github/license/TobitSoftware/chayns-components.svg?style=flat-square)](https://github.com/TobitSoftware/chayns-components/blob/master/LICENSE) 
[![GitHub pull requests](https://img.shields.io/github/issues-pr/TobitSoftware/chayns-components.svg?style=flat-square)](https://github.com/TobitSoftware/chayns-components/pulls) 
[![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed-raw/TobitSoftware/chayns-components.svg?style=flat-square)](https://github.com/TobitSoftware/chayns-components/pulls?q=is%3Apr+is%3Aclosed)
[![GitHub contributors](https://img.shields.io/github/contributors/TobitSoftware/chayns-components.svg?style=flat-square)](https://github.com/TobitSoftware/chayns-components/graphs/contributors) 

# chayns-components #

## Installation ##

The ChaynsComponents can be installed directly from npm by using the following package:

    npm install -S chayns-components@latest
    
The corresponding styles are included in our [chayns CSS API](https://github.com/TobitSoftware/chayns-css). Also, you have to load our [chayns JS API](https://github.com/TobitSoftware/chayns-js) to use the components.

```HTML
<!-- css styles -->
<script src="https://api.chayns-static.space/css/v4/compatibility/compatibility.min.js" version="4.2"></script>

<!-- js api -->
<script src="https://api.chayns-static.space/js/v4.0/chayns.min.js"></script>
``` 

The chayns-components are [tree-shakeable](https://en.wikipedia.org/wiki/Tree_shaking). To use tree-shaking, follow [this instruction](./tree-shaking.md).

## Components Overview ##
The following components are part of this package:

<!---
    the component list is automatically generated using the entries
    from the components.json-file. Do not change anything inside the
    start and end tag.
-->
<!--- start component list -->
| Component                                                                | Description                 | Readme File                                              |
|--------------------------------------------------------------------------|-----------------------------|----------------------------------------------------------|
| [react-chayns-accordion](/src/react-chayns-accordion/)                   | Accordion Component         | [Readme](/src/react-chayns-accordion/README.md)          |
| [react-chayns-amountcontrol](/src/react-chayns-amountcontrol/)           | AmountControl Component     | [Readme](/src/react-chayns-amountcontrol/README.md)      |
| [react-chayns-badge](/src/react-chayns-badge/)                           | Badge Component             | [Readme](/src/react-chayns-badge/README.md)              |
| [react-chayns-bubble](/src/react-chayns-bubble/)                         | Bubble Component            | [Readme](/src/react-chayns-bubble/README.md)             |
| [react-chayns-button](/src/react-chayns-button/)                         | Button Component            | [Readme](/src/react-chayns-button/README.md)             |
| [react-chayns-calendar](/src/react-chayns-calendar/)                     | Calendar Component          | [Readme](/src/react-chayns-calendar/README.md)           |
| [react-chayns-checkbox](/src/react-chayns-checkbox/)                     | Checkbox Component          | [Readme](/src/react-chayns-checkbox/README.md)           |
| [react-chayns-color_picker](/src/react-chayns-color_picker/)             | ColorPicker Component       | [Readme](/src/react-chayns-color_picker/README.md)       |
| [react-chayns-combobox](/src/react-chayns-combobox/)                     | ComboBox Component          | [Readme](/src/react-chayns-combobox/README.md)           |
| [react-chayns-contextmenu](/src/react-chayns-contextmenu/)               | ContextMenu Component       | [Readme](/src/react-chayns-contextmenu/README.md)        |
| [react-chayns-dateinfo](/src/react-chayns-dateinfo/)                     | DateInfo Component          | [Readme](/src/react-chayns-dateinfo/README.md)           |
| [react-chayns-emoji_input](/src/react-chayns-emoji_input/)               | EmojiInput Component        | [Readme](/src/react-chayns-emoji_input/README.md)        |
| [react-chayns-expandable_content](/src/react-chayns-expandable_content/) | ExpandableContent Component | [Readme](/src/react-chayns-expandable_content/README.md) |
| [react-chayns-file_input](/src/react-chayns-file_input/)                 | FileInput Component         | [Readme](/src/react-chayns-file_input/README.md)         |
| [react-chayns-filterbutton](/src/react-chayns-filterbutton/)             | FilterButton Component      | [Readme](/src/react-chayns-filterbutton/README.md)       |
| [react-chayns-formatted_input](/src/react-chayns-formatted_input/)       | FormattedInput Component    | [Readme](/src/react-chayns-formatted_input/README.md)    |
| [react-chayns-gallery](/src/react-chayns-gallery/)                       | Gallery Component           | [Readme](/src/react-chayns-gallery/README.md)            |
| [react-chayns-gridcalendar](/src/react-chayns-gridcalendar/)             | Grid-Calendar Component     | [Readme](/src/react-chayns-gridcalendar/README.md)       |
| [react-chayns-icon](/src/react-chayns-icon/)                             | Icon Component              | [Readme](/src/react-chayns-icon/README.md)               |
| [react-chayns-image_accordion](/src/react-chayns-image_accordion/)       | ImageAccordion Component    | [Readme](/src/react-chayns-image_accordion/README.md)    |
| [react-chayns-input](/src/react-chayns-input/)                           | Input Component             | [Readme](/src/react-chayns-input/README.md)              |
| [react-chayns-input_box](/src/react-chayns-input_box/)                   | InputBox Component          | [Readme](/src/react-chayns-input_box/README.md)          |
| [react-chayns-list](/src/react-chayns-list/)                             | List Component              | [Readme](/src/react-chayns-list/README.md)               |
| [react-chayns-modeswitch](/src/react-chayns-modeswitch/)                 | ModeSwitch Component        | [Readme](/src/react-chayns-modeswitch/README.md)         |
| [react-chayns-openingtimes](/src/react-chayns-openingtimes/)             | OpeningTimes Component      | [Readme](/src/react-chayns-openingtimes/README.md)       |
| [react-chayns-personfinder](/src/react-chayns-personfinder/)             | PersonFinder Component      | [Readme](/src/react-chayns-personfinder/README.md)       |
| [react-chayns-position_input](/src/react-chayns-position_input/)         | PositionInput Component     | [Readme](/src/react-chayns-position_input/README.md)     |
| [react-chayns-progress_bar](/src/react-chayns-progress_bar/)             | ProgressBar Component       | [Readme](/src/react-chayns-progress_bar/README.md)       |
| [react-chayns-radiobutton](/src/react-chayns-radiobutton/)               | RadioButton Component       | [Readme](/src/react-chayns-radiobutton/README.md)        |
| [react-chayns-receiverinput](/src/react-chayns-receiverinput/)           | ReceiverInput Component     | [Readme](/src/react-chayns-receiverinput/README.md)      |
| [react-chayns-rfid_input](/src/react-chayns-rfid_input/)                 | RFID Input Component        | [Readme](/src/react-chayns-rfid_input/README.md)         |
| [react-chayns-scrollview](/src/react-chayns-scrollview/)                 | ScrollView Component        | [Readme](/src/react-chayns-scrollview/README.md)         |
| [react-chayns-selectbutton](/src/react-chayns-selectbutton/)             | SelectButton Component      | [Readme](/src/react-chayns-selectbutton/README.md)       |
| [react-chayns-selectlist](/src/react-chayns-selectlist/)                 | SelectList Component        | [Readme](/src/react-chayns-selectlist/README.md)         |
| [react-chayns-setupwizard](/src/react-chayns-setupwizard/)               | SetupWizard Component       | [Readme](/src/react-chayns-setupwizard/README.md)        |
| [react-chayns-sharingbar](/src/react-chayns-sharingbar/)                 | SharingBar Component        | [Readme](/src/react-chayns-sharingbar/README.md)         |
| [react-chayns-slider](/src/react-chayns-slider/)                         | Slider Component            | [Readme](/src/react-chayns-slider/README.md)             |
| [react-chayns-smallwaitcursor](/src/react-chayns-smallwaitcursor/)       | SmallWaitCursor Component   | [Readme](/src/react-chayns-smallwaitcursor/README.md)    |
| [react-chayns-tag_input](/src/react-chayns-tag_input/)                   | TagInput Component          | [Readme](/src/react-chayns-tag_input/README.md)          |
| [react-chayns-textarea](/src/react-chayns-textarea/)                     | TextArea Component          | [Readme](/src/react-chayns-textarea/README.md)           |
| [react-chayns-tooltip](/src/react-chayns-tooltip/)                       | Tooltip Component           | [Readme](/src/react-chayns-tooltip/README.md)            |
<!--- end component list -->

## Internal Components ##

| Component                                                          | Description                                     | Readme File                                           |
|--------------------------------------------------------------------|-------------------------------------------------|-------------------------------------------------------|
| [react-chayns-textstring](/src/react-chayns-textstring/)           | TextString Component                            | [Readme](/src/react-chayns-textstring/README.md)      |

## Utility Functions ##

| Function                                                           | Description                                               |
|--------------------------------------------------------------------|-----------------------------------------------------------|
| [imageUpload](/src/utils/imageUpload.js)                           | Function to upload images to tsimg.cloud                  |
| [isTobitEmployee](/src/utils/tobitEmployee.js)                     | Get the information if user is an tobit employee          |
| [createLinks](/src/utils/createLinks.js)                           | Creates a string with links from a string with URLs       |
| [removeHtml](/src/utils/removeHtml.js)                             | Removes HTML Tags from a string                           |
| [ColorUtils](/src/utils/color/README.md)                           | Utility functions to convert color values (hex, rgb, hsv) |
| [equalizer](/src/utils/equalizer.js)                               | Utility functions to equalize the width of html elements  |

## Development ##

We moved the development section to the [CONTRIBUTING.md](/CONTRIBUTING.md) file.
