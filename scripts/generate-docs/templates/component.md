<h1 align="center">{{ name }}</h1>

<p align="center">
    <a href="{{ relativePath }}">Source</a>
</p>

{{ description }}

## Usage

You should have the `chayns-components` package installed. If that is not the
case already, run

```bash
yarn add chayns-components
```

or

```bash
npm i chayns-components
```

After the `chayns-components` package is installed, you can import the component
and use it with React:

```jsx
import React from 'react'
import { {{ name }} } from 'chayns-components';

// ...

<{{ name }} {...} />
```

{{ docs }}

## Props

The `{{ name }}`-component takes the following props:

{{ propTable }}

{{ propDescriptions }}
