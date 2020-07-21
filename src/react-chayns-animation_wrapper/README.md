# FilterButton

The AnimationWrapper-Component is part of the `chayns-components`-Package. You can install it with the following command:

    npm install -S chayns-components@latest

## Usage

You have to import the component first:

```jsx harmony
import { AnimationWrapper } from 'chayns-components';
```

You can now use the component as follows:

```jsx harmony
<AnimationWrapper>
    <div className="content__card content__card--warning">
        <p>
            Aktuell werden keine Bestellungen angenommen. 
            Wir sind ab 17:00 Uhr wieder für Dich da. 
        </p>
    </div>
</AnimationWrapper>
```

## Props

You can set the following props on a AnimationWrapper element:

| Property        | Description                                                        | Type            | Default |
| --------------- | ------------------------------------------------------------------ | --------------- |---------|
| animationTime   | Duration of animation in seconds                                   | number          | 0.2     |
| setAutoTime     | Time util height is set to auto in ms                              | number          | 400     |
