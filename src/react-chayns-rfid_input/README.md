# RfidInput

The RfidInput is part of the *chayns-components* package. It can be installed via npm:

    npm install -S chayns-components@latest


## Usage of the RfidInput
The input has to be imported:

```jsx
import { RfidInput } from 'chayns-components';
import 'chayns-components/lib/react-chayns-rfid_input/index.css';
```


You can use the input like this:
```jsx
<RfidInput 
    placeholder="Cardnumber"
    confirmNode="OK"
    scanText="Scan"
    value={this.state.rfid}
    onInput={(rfid) => this.setState({ rfid })}
    onConfirm={(validRfid) => console.log(validRfid)}
/>
```

## RfidInput.pretifyRfid
A static function to set a space after every second character. 

## Props
The following properties can be set on the RfidInput-Component

| **Property** | **Description**                                           | **Type**       | **Default Value** | **Required** |
| ------------ | --------------------------------------------------------- | -------------- | ----------------- | ------------ |
| className    | CSS classes for the RfidInput                             | String         |                   |              |
| placeholder  | Text that will be shown as placeholder                    | String         | "Kartennummer"    |              |
| confirmNode  | Element that will be load in the button behind the input  | React-Elements | "OK"              |              |
| scanText     | Text that will be shown in the button for scan a card     | String         | "Scannen"         |              |
| value        | Value for the input                                       | String         |                   | true         |
| onInput      | Event when the input was change                           | Function       |                   | true         |
| onConfirm    | Event when the rfid is complete and valid                 | Function       |                   | true         |
