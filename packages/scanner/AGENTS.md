# @chayns-components/scanner

React component package providing `CodeScanner` for chayns applications.

Documented components: `CodeScanner`.

## Import

```ts
import { CodeScanner } from '@chayns-components/scanner';
```

## Typical Usage

```tsx
<CodeScanner
    errorMessages={{
                alreadyInUse: 'Die Kamera wird bereits von einer anderen Anwendung verwendet.',
                cameraNotAvailable: 'Die Kameranutzung ist nicht möglich.',
                noCodeFound: 'Es konnte kein Code gefunden werden.',
                noPermission: 'Um einen QR-Code zu scannen, aktiviere Deine Kamera.',
            }}
    shouldTriggerForSameCode
/>
```

## CodeScanner

`CodeScanner` is exported by `@chayns-components/scanner` and should be imported from the public package entry point.

### Import

```ts
import { CodeScanner } from '@chayns-components/scanner';
```

### Examples

#### General

```tsx
<CodeScanner
    errorMessages={{
                alreadyInUse: 'Die Kamera wird bereits von einer anderen Anwendung verwendet.',
                cameraNotAvailable: 'Die Kameranutzung ist nicht möglich.',
                noCodeFound: 'Es konnte kein Code gefunden werden.',
                noPermission: 'Um einen QR-Code zu scannen, aktiviere Deine Kamera.',
            }}
    shouldTriggerForSameCode
/>
```

### Props

| name | type | required | description |
| --- | --- | --- | --- |
| `allowedFormats` | `BarcodeFormat[] \| undefined` | no | Defines which barcode formats are allowed to be detected. |
| `errorMessages` | `ScannerErrorMessages` | yes | Custom error messages for various scanner states or failures. |
| `isFileSelectDisabled` | `boolean \| undefined` | no | Disables the file select feature if set to true. |
| `isTorchDisabled` | `boolean \| undefined` | no | Disables the torch (flashlight) feature if set to true. |
| `isZoomDisabled` | `boolean \| undefined` | no | Disables the zoom control if set to true. |
| `maxZoom` | `number \| undefined` | no | Maximum allowed zoom level for the camera. |
| `minZoom` | `number \| undefined` | no | Minimum allowed zoom level for the camera. |
| `onScan` | `CodeReaderOnScanCallback \| undefined` | no | Callback function triggered when a code is successfully scanned. |
| `placeholder` | `string \| undefined` | no | A placeholder that should be displayed inside the preview. |
| `scanInterval` | `number \| undefined` | no | The interval of the scans. |
| `shouldShowIconOverlay` | `boolean \| undefined` | no | Whether a calling code icon should be displayed as an overlay. |
| `shouldTriggerForSameCode` | `boolean \| undefined` | no | If true, allows scanning the same code multiple times in a row. |
| `trackConstraints` | `MediaTrackConstraints \| undefined` | no | Custom media track constraints for controlling the video input. |
| `videoConstraints` | `MediaTrackConstraints \| undefined` | no | Additional video constraints for the camera feed. |

### Types

- `ScannerErrorMessages` -> `interface ScannerErrorMessages {
    noPermission: string;
    alreadyInUse: string;
    cameraNotAvailable: string;
    noCodeFound: string;
}`

### Usage Notes

- Import `CodeScanner` directly from `@chayns-components/scanner` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.
- Pay special attention to required props: `errorMessages`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/scanner/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
