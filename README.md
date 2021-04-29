<div align="center">
    <h1>
        <img src="https://raw.githubusercontent.com/TobitSoftware/chayns-components/master/assets/logo.png" width="600px" alt="chayns-components" />
    </h1>
    <p>A set of beautiful React components for developing chayns® applications.</p>
    <div>
        <img src="https://img.shields.io/npm/dm/chayns-components.svg?style=for-the-badge" alt="" />
        <img src="https://img.shields.io/npm/v/chayns-components?style=for-the-badge" alt="" />
        <img src="https://img.shields.io/github/license/TobitSoftware/chayns-components?style=for-the-badge" alt="" />
        <img src="https://img.shields.io/github/contributors/TobitSoftware/chayns-components?style=for-the-badge" alt="" />
    </div>
</div>

---

## Installation

First you should install the `chayns-components` package into your project:

```bash
# Yarn
yarn add chayns-components

# NPM
npm install chayns-components
```

The styles to our components are provided via the
[`chayns-css`](https://github.com/TobitSoftware/chayns-css) library and some of
the components also rely on the
[`chayns-js`](https://github.com/TobitSoftware/chayns-js) API, so you should
include these in your HTML:

```html
<!-- CSS styles -->
<script
    src="https://api.chayns-static.space/css/v4/compatibility/compatibility.min.js"
    version="4.2"
></script>

<!-- JS api -->
<script src="https://api.chayns-static.space/js/v4.0/chayns.min.js"></script>
```

## Components Overview

The following components are part of this package:

| Component                                                              | Description                                                                                                                                                                                                                                                                                                |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Accordion&nbsp;›](docs/components/accordion.md)                       | Accordions are collapsible sections that are toggled by interacting with a permanently visible header.                                                                                                                                                                                                     |
| [AmountControl&nbsp;›](docs/components/amount-control.md)              | The AmountControl is a three-segment control used to increase or decrease an incremental value.                                                                                                                                                                                                            |
| [AnimationWrapper&nbsp;›](docs/components/animation-wrapper.md)        | The AnimationWrapper provides an eye-catching initial animation to its children.                                                                                                                                                                                                                           |
| [Badge&nbsp;›](docs/components/badge.md)                               | Badges are small, circular containers used to decorate other components with glancable information.                                                                                                                                                                                                        |
| [Bubble&nbsp;›](docs/components/bubble.md)                             | A floating bubble that is primarily used to power the `ContextMenu` and `Tooltip` components.                                                                                                                                                                                                              |
| [Button&nbsp;›](docs/components/button.md)                             | Buttons initiate actions, can include a title or an icon and come with a set of predefined styles.                                                                                                                                                                                                         |
| [Calendar&nbsp;›](docs/components/calendar.md)                         | An interactive grid calendar that can highlight specified dates.                                                                                                                                                                                                                                           |
| [Checkbox&nbsp;›](docs/components/checkbox.md)                         | Checkboxes allow users to complete tasks that involve making choices such as selecting options. Can be styled as a switch, a visual toggle between two mutually exclusive states — on and off.                                                                                                             |
| [ColorPicker&nbsp;›](docs/components/color-picker.md)                  | Lets a user choose a color for text, shapes, marking tools, and other elements.                                                                                                                                                                                                                            |
| [ColorScheme&nbsp;›](docs/components/color-scheme.md)                  | Adjusts the color scheme for all child components.                                                                                                                                                                                                                                                         |
| [ComboBox&nbsp;›](docs/components/combo-box.md)                        | A button with a dropdown that contains a scrollable list of distinct values from which people can choose.                                                                                                                                                                                                  |
| [ContextMenu&nbsp;›](docs/components/context-menu.md)                  | Gives people access to additional functionality related to onscreen items without cluttering the interface.                                                                                                                                                                                                |
| [DateInfo&nbsp;›](docs/components/date-info.md)                        | Formats a date or date range to be easily readable and reveals the absolute date on hover.                                                                                                                                                                                                                 |
| [EmojiInput&nbsp;›](docs/components/emoji-input.md)                    | A text input that allows emojis to be put in.                                                                                                                                                                                                                                                              |
| [ExpandableContent&nbsp;›](docs/components/expandable-content.md)      | A collapsible section that reveals its children with a height transition.                                                                                                                                                                                                                                  |
| [FileInput&nbsp;›](docs/components/file-input.md)                      | Accepts specified file types via dialog or drag and drop.                                                                                                                                                                                                                                                  |
| [FilterButton&nbsp;›](docs/components/filter-button.md)                | A chip-like component that is used to filter lists. Usually used in a group of 2 or more.                                                                                                                                                                                                                  |
| [FormattedInput&nbsp;›](docs/components/formatted-input.md)            | A text input that automatically formats its input with a formatter. Since this component is based on the `Input`-component, it takes any of the `Input`-components props, which are not listed here. This component only works as an uncontrolled component, meaning that it does not take a `value`-prop. |
| [Gallery&nbsp;›](docs/components/gallery.md)                           | An image gallery that displays up to four images by default. Also supports reordering and deletion of images and blurred image previews for images loaded from `tsimg.cloud`.                                                                                                                              |
| [Icon&nbsp;›](docs/components/icon.md)                                 | Displays a FontAwesome icon.                                                                                                                                                                                                                                                                               |
| [ImageAccordion&nbsp;›](docs/components/image-accordion.md)            | An accordion that has a big image and appears in a grid. Should be used inside of an `ImageAccordionGroup`.                                                                                                                                                                                                |
| [ImageAccordionGroup&nbsp;›](docs/components/image-accordion-group.md) | Groups several `ImageAccordion` components together, so only one of them can be open at a time.                                                                                                                                                                                                            |
| [Input&nbsp;›](docs/components/input.md)                               | A text input that can be validated and decorated with different designs.                                                                                                                                                                                                                                   |
| [List&nbsp;›](docs/components/list.md)                                 | The wrapper for the `ListItem`-component to create lists.                                                                                                                                                                                                                                                  |
| [ListItem&nbsp;›](docs/components/list-item.md)                        | The items in a list to display related data in a structured format. Should be used inside of a `List` component.                                                                                                                                                                                           |
| [OpeningTimes&nbsp;›](docs/components/opening-times.md)                | An input for opening times.                                                                                                                                                                                                                                                                                |
| [PersonFinder&nbsp;›](docs/components/person-finder.md)                | An autocomplete search for persons that can be customized to work with arbitrary data.                                                                                                                                                                                                                     |
| [PositionInput&nbsp;›](docs/components/position-input.md)              | A location input with a map and text input. This requires the Google Maps JavaScript API with the places library enabled. You can find more information about the Maps API [here](https://developers.google.com/maps/documentation/javascript/overview).                                                   |
| [ProgressBar&nbsp;›](docs/components/progress-bar.md)                  | An animated progress bar that can show an actions progress or an indeterminate state like a loading spinner.                                                                                                                                                                                               |
| [RadioButton&nbsp;›](docs/components/radio-button.md)                  | A radio button that allows to select one of multiple options.                                                                                                                                                                                                                                              |
| [RfidInput&nbsp;›](docs/components/rfid-input.md)                      | A component to take in an RFID signal.                                                                                                                                                                                                                                                                     |
| [ScrollView&nbsp;›](docs/components/scroll-view.md)                    | A scrollable container with a custom scrollbar that looks great on every device.                                                                                                                                                                                                                           |
| [SearchBox&nbsp;›](docs/components/search-box.md)                      | An autocomplete input to search through a list of entries.                                                                                                                                                                                                                                                 |
| [SelectButton&nbsp;›](docs/components/select-button.md)                | A choose button that opens a selection dialog when clicked.                                                                                                                                                                                                                                                |
| [SelectItem&nbsp;›](docs/components/select-item.md)                    | A radio button that expands its content when selected. Should be used inside of a `SelectList`.                                                                                                                                                                                                            |
| [SelectList&nbsp;›](docs/components/select-list.md)                    | A vertical list of radio buttons that reveal content when selected.                                                                                                                                                                                                                                        |
| [SetupWizard&nbsp;›](docs/components/setup-wizard.md)                  | A set of steps the user has to go through sequentially.                                                                                                                                                                                                                                                    |
| [SetupWizardItem&nbsp;›](docs/components/setup-wizard-item.md)         | An item that represents one step in a `SetupWizard`.                                                                                                                                                                                                                                                       |
| [SharingBar&nbsp;›](docs/components/sharing-bar.md)                    | A context menu for sharing a link and some text on various platforms.                                                                                                                                                                                                                                      |
| [Slider&nbsp;›](docs/components/slider.md)                             | A horizontal track with a thumb that can be moved between a minimum and a maximum value.                                                                                                                                                                                                                   |
| [SliderButton&nbsp;›](docs/components/slider-button.md)                | A linear set of buttons which are mutually exclusive.                                                                                                                                                                                                                                                      |
| [SmallWaitCursor&nbsp;›](docs/components/small-wait-cursor.md)         | A small circular loading indicator.                                                                                                                                                                                                                                                                        |
| [TagInput&nbsp;›](docs/components/tag-input.md)                        | A text input that allows values to be grouped as tags.                                                                                                                                                                                                                                                     |
| [TextArea&nbsp;›](docs/components/text-area.md)                        | A multiline text input that can automatically grow with its content.                                                                                                                                                                                                                                       |
| [TextString&nbsp;›](docs/components/text-string.md)                    | Loads text strings from our database and displays them. Handles replacements and changing the string via `CTRL` + `Click` (only internal).                                                                                                                                                                 |
| [Tooltip&nbsp;›](docs/components/tooltip.md)                           | Wraps a child component and displays a message when the child is hovered or clicked on. Allows to be shown imperatively by calling `.show()` or `.hide()` on its reference.                                                                                                                                |
| [VerificationIcon&nbsp;›](docs/components/verification-icon.md)        |

## Utility Functions

We also provide a set of common utility functions:

| Function                                       | Description                                               |
| ---------------------------------------------- | --------------------------------------------------------- |
| [imageUpload](/src/utils/imageUpload.js)       | Function to upload images to tsimg.cloud                  |
| [isTobitEmployee](/src/utils/tobitEmployee.js) | Get the information if user is an tobit employee          |
| [createLinks](/src/utils/createLinks.js)       | Creates a string with links from a string with URLs       |
| [removeHtml](/src/utils/removeHtml.js)         | Removes HTML Tags from a string                           |
| [ColorUtils](/src/utils/color/README.md)       | Utility functions to convert color values (hex, rgb, hsv) |
| [equalizer](/src/utils/equalizer.js)           | Utility functions to equalize the width of html elements  |

## Contributing

If you want to contribute to `chayns-components`, check out the
[CONTRIBUTING.md](/CONTRIBUTING.md) file.
