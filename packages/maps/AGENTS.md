# @chayns-components/maps

React component package providing `PositionInput` for chayns applications.

Documented components: `PositionInput`.

## Import

```ts
import { PositionInput } from '@chayns-components/maps';
```

## Typical Usage

```tsx
<PositionInput
    apiToken={'AIzaSyCicm5YKKdfym2UtjVwuoSvMAL9uKD_yxo'}
    searchPlaceholder={'Stadt suchen'}
/>
```

## PositionInput

`PositionInput` is exported by `@chayns-components/maps` and should be imported from the public package entry point.

### Import

```ts
import { PositionInput } from '@chayns-components/maps';
```

### Examples

#### General

```tsx
<PositionInput
    apiToken={'AIzaSyCicm5YKKdfym2UtjVwuoSvMAL9uKD_yxo'}
    searchPlaceholder={'Stadt suchen'}
/>
```

### Props

| name | type | required | description |
| --- | --- | --- | --- |
| `apiToken` | `string` | yes | The api token for google maps. |
| `initialPosition` | `Position \| undefined` | no | The position of the center of the map on the initial render. |
| `markers` | `IMarker[] \| undefined` | no | Markers that should be displayed. |
| `onMarkerAdd` | `((marker: IMarker) => void) \| undefined` | no | Function to be executed when a marker is added. |
| `onMarkerChange` | `((markers: IMarker[]) => void) \| undefined` | no | Function to be executed when a marker position is changed. |
| `onMarkerRemove` | `((id: number) => void) \| undefined` | no | Function to be executed when a marker is removed. |
| `polygonOptions` | `PolygonOptions \| undefined` | no | Options to style the polygon. |
| `searchPlaceholder` | `string \| undefined` | no | The placeholder of the search input. |
| `zoom` | `number \| undefined` | no | The zoom of the map. |

### Types

- `PolygonOptions` -> `interface PolygonOptions {
    strokeColor: string;
    strokeOpacity: number;
    strokeWeight: number;
    fillColor: string;
    fillOpacity: number;
    clickable: boolean;
    draggable: boolean;
    editable: boolean;
    visible: boolean;
    radius: number;
    zIndex: number;
}`
- `Position` -> `interface Position {
    lat: number;
    lng: number;
}`

### Usage Notes

- Import `PositionInput` directly from `@chayns-components/maps` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.
- Pay special attention to required props: `apiToken`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/maps/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
