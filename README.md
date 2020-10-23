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

By default, the whole library is imported when using any component. If you care
about your bundle size you should follow our
[tree-shaking guide](./tree-shaking.md).

## Components Overview

The following components are part of this package:

| Component                                                              | Description                                                                                                                                                                                                                                                                                                |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Accordion&nbsp;›](docs/components/accordion.md)                       | Displays a container that can be opened to reveal it's content.                                                                                                                                                                                                                                            |
| [AnimationWrapper&nbsp;›](docs/components/animation-wrapper.md)        | A wrapper that animates its children in.                                                                                                                                                                                                                                                                   |
| [AmountControl&nbsp;›](docs/components/amount-control.md)              | A number input that can easily be incremented and decremented.                                                                                                                                                                                                                                             |
| [Badge&nbsp;›](docs/components/badge.md)                               | A small, round container element to display a value, typically a number. Used mostly in the right position of `Accordion` or `ListItem` components.                                                                                                                                                        |
| [Bubble&nbsp;›](docs/components/bubble.md)                             |
| [Button&nbsp;›](docs/components/button.md)                             | You can import the Button-component like this: `jsx import { Button } from 'chayns-components'; ` and use it like this: `jsx <Button onClick={() => {console.log("I have been clicked!")}}> Click Me! </Button> `                                                                                          |
| [Calendar&nbsp;›](docs/components/calendar.md)                         | Displays a grid calendar with the ability to react to user interaction and highlight certain dates.                                                                                                                                                                                                        |
| [Checkbox&nbsp;›](docs/components/checkbox.md)                         | A `<input type="checkbox">` component. Can also act as a switch.                                                                                                                                                                                                                                           |
| [ColorPicker&nbsp;›](docs/components/color-picker.md)                  | A RGB color picker.                                                                                                                                                                                                                                                                                        |
| [ColorScheme&nbsp;›](docs/components/color-scheme.md)                  | This component adjusts the color scheme for all children components.                                                                                                                                                                                                                                       |
| [DateInfo&nbsp;›](docs/components/date-info.md)                        | Formats a date or date range to be easily readable and reveals the absolute date on hover.                                                                                                                                                                                                                 |
| [ContextMenu&nbsp;›](docs/components/context-menu.md)                  | A context menu with several action items that is opened by clicking an icon. To open or close the context menu imperatively, call the `show` or `hide` methods on its reference.                                                                                                                           |
| [EmojiInput&nbsp;›](docs/components/emoji-input.md)                    | A text field that allows emojis to be put in. > This component does not work with Internet Explorer.                                                                                                                                                                                                       |
| [ExpandableContent&nbsp;›](docs/components/expandable-content.md)      | A component collapses or expands its children based on the `open`-prop.                                                                                                                                                                                                                                    |
| [FileInput&nbsp;›](docs/components/file-input.md)                      | A file input that accepts specified file types via upload or drag and drop.                                                                                                                                                                                                                                |
| [FilterButton&nbsp;›](docs/components/filter-button.md)                | A chip-like component that is used to filter lists. Usually used in a group of 2 or more.                                                                                                                                                                                                                  |
| [FormattedInput&nbsp;›](docs/components/formatted-input.md)            | A text input that automatically formats its input with a formatter. Since this component is based on the `Input`-component, it takes any of the `Input`-components props, which are not listed here. This component only works as an uncontrolled component, meaning that it does not take a `value`-prop. |
| [Gallery&nbsp;›](docs/components/gallery.md)                           | An image gallery that displays up to four images by default. Also supports reordering and deletion of images and blurred image previews for images loaded from `tsimg.cloud`.                                                                                                                              |
| [Icon&nbsp;›](docs/components/icon.md)                                 | Displays a FontAwesome icon.                                                                                                                                                                                                                                                                               |
| [ImageAccordion&nbsp;›](docs/components/image-accordion.md)            | An accordion that has a big image and appears in a grid. Should be used inside of an `ImageAccordionGroup`.                                                                                                                                                                                                |
| [ImageAccordionGroup&nbsp;›](docs/components/image-accordion-group.md) | Groups several `ImageAccordion` components together, so only one of them can be open at a time.                                                                                                                                                                                                            |
| [Input&nbsp;›](docs/components/input.md)                               | A text input that can be validated and decorated with different designs.                                                                                                                                                                                                                                   |
| [List&nbsp;›](docs/components/list.md)                                 | The wrapper for the `ListItem`-component to create lists.                                                                                                                                                                                                                                                  |
| [OpeningTimes&nbsp;›](docs/components/opening-times.md)                | An input for opening times.                                                                                                                                                                                                                                                                                |
| [PositionInput&nbsp;›](docs/components/position-input.md)              | A location input with a map and text input. This requires the Google Maps JavaScript API with the places library enabled. You can find more information about the Maps API [here](https://developers.google.com/maps/documentation/javascript/overview).                                                   |
| [PersonFinder&nbsp;›](docs/components/person-finder.md)                | An autocomplete search for persons that can be customized to work with arbitrary data.                                                                                                                                                                                                                     |
| [ProgressBar&nbsp;›](docs/components/progress-bar.md)                  | An animated progress bar that can show an actions progress or an indeterminate state like a loading spinner.                                                                                                                                                                                               |
| [RadioButton&nbsp;›](docs/components/radio-button.md)                  | A radio button that allows to select one of multiple options.                                                                                                                                                                                                                                              |
| [RfidInput&nbsp;›](docs/components/rfid-input.md)                      | A component to take in an RFID signal.                                                                                                                                                                                                                                                                     |
| [ScrollView&nbsp;›](docs/components/scroll-view.md)                    | A scrollable container with a custom scrollbar that looks great on every device.                                                                                                                                                                                                                           |
| [SearchBox&nbsp;›](docs/components/search-box.md)                      | An autocomplete input to search through a list of entries.                                                                                                                                                                                                                                                 |
| [SelectButton&nbsp;›](docs/components/select-button.md)                | A choose button that opens a selection dialog when clicked.                                                                                                                                                                                                                                                |
| [SelectItem&nbsp;›](docs/components/select-item.md)                    | A radio button that expands its content when selected. Should be used inside of a `SelectList`.                                                                                                                                                                                                            |
| [SelectList&nbsp;›](docs/components/select-list.md)                    | A vertical list of radio buttons that reveal content when selected.                                                                                                                                                                                                                                        |
| [SetupWizardItem&nbsp;›](docs/components/setup-wizard-item.md)         | An item that represents one step in a `SetupWizard`.                                                                                                                                                                                                                                                       |
| [SetupWizard&nbsp;›](docs/components/setup-wizard.md)                  | A set of steps the user has to go through sequentially.                                                                                                                                                                                                                                                    |
| [SharingBar&nbsp;›](docs/components/sharing-bar.md)                    | A context menu for sharing a link and some text on various platforms.                                                                                                                                                                                                                                      |
| [Slider&nbsp;›](docs/components/slider.md)                             | A horizontal track with a thumb that can be moved between a minimum and a maximum value.                                                                                                                                                                                                                   |
| [SliderButton&nbsp;›](docs/components/slider-button.md)                | A linear set of buttons which are mutually exclusive.                                                                                                                                                                                                                                                      |
| [TagInput&nbsp;›](docs/components/tag-input.md)                        | A text input that allows values to be grouped as tags.                                                                                                                                                                                                                                                     |
| [SmallWaitCursor&nbsp;›](docs/components/small-wait-cursor.md)         | A small circular loading indicator.                                                                                                                                                                                                                                                                        |
| [TextArea&nbsp;›](docs/components/text-area.md)                        | A multiline text input that can automatically grow with its content.                                                                                                                                                                                                                                       |
| [TextString&nbsp;›](docs/components/text-string.md)                    | Loads text strings from our database and displays them. Handles replacements and changing the string via `CTRL` + `Click` (only internal).                                                                                                                                                                 |
| [Tooltip&nbsp;›](docs/components/tooltip.md)                           | Wraps a child component and displays a message when the child is hovered or clicked on. Allows to be shown imperatively by calling `.show()` or `.hide()` on its reference.                                                                                                                                |
| [ListItem&nbsp;›](docs/components/list-item.md)                        | The items in a list to display related data in a structured format. Should be used inside of a `List` component.                                                                                                                                                                                           |

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

## Development

If you want to contribute to `chayns-components`, check out the
[CONTRIBUTING.md](/CONTRIBUTING.md) file.
