# DetailView-Component #

The DetailView-Component is part of the *chayns-components* package. It can be installed via npm:

    npm install -S chayns-components@latest

## Usage ##
You have to import the components and styles first:

```jsx
import { DetailView, DetailViewItem, DetailViewFooter, DetailViewHeader } from 'chayns-components';
import 'chayns-components/lib/react-chayns-detail-view/index.css';
```

The structure of the components should be like the following (note: expanded-prop of DetailViewHeader should be handled by parent component)
```jsx
<DetailView>
    <DetailViewHeader>
        <img src="http://lorempixel.com/output/technics-q-g-640-480-1.jpg" />
    </DetailViewHeader>
    <DetailViewItem>
        <h2>Headline</h2>
        Some text of the detail view (main-content should be here)
    </DetailViewItem>
    <DetailViewFooter>
        Optional Footer that is separated by a line
    </DetailViewFooter>
</DetailView>
```

### Props (DetailView, DetailViewItem, DetailViewFooter) ###
The following properties can be set

| Property     | Description                                                            | Type                       | Default Value |
|--------------|------------------------------------------------------------------------|----------------------------|---------------|
| children     | Children of the element                                                | React-Elements             | *required*    |
| className    | css-classes that should be set on element                              | String                     | ''            |
| *            | Props that should be passed to the div-container                       |                            |               |

### Props (DetailViewHeader) ###
The following properties can be set

| Property     | Description                                                            | Type                       | Default Value |
|--------------|------------------------------------------------------------------------|----------------------------|---------------|
| children     | Children of the element                                                | React-Elements             | *required*    |
| className    | css-classes that should be set on element                              | String                     | ''            |
| expanded     | Whether the header should be expanded or not                           | bool                       | false         |
| *            | Props that should be passed to the div-container                       |                            |               |