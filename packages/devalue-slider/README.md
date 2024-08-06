# `devalue-slider`

This is a slider component that can be devalued.For a normal devalue the user will drag the slider
to the right and release it. It will show a loading cursor and call the onDevalue handler. If the
onDevalue handler does not give a successful response the thumb will snap back to the left. This
gives feedback to the user and the person who validates the devalue.

The developer should care about some additional security measures to prevent fraud. For example this
could be an offline detection. For this you can disable the Slider with the isDisabled prop. This
will also cancel the current user drag.

## Usage

```
import { DevalueSlider } from '@chayns-components/devalue-slider';

<DevalueSlider />
```
