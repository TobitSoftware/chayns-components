/* eslint-disable */
// @ts-nocheck
// prettier-ignore
<SwipeableWrapper
    rightActions={[
        {
            action: () => console.log('Star'),
            backgroundColor: 'darkkhaki',
            color: 'black',
            icon: <Icon color="black" icons={['fa fa-star']} />,
            key: 'star',
            text: 'Star',
        },
        {
            action: () => console.log('Fire'),
            backgroundColor: 'red',
            color: 'white',
            icon: <Icon color="white" icons={['fa fa-fire']} />,
            key: 'fire',
            text: 'Fire',
        },
    ]}
    leftActions={[
        {
            action: () => console.log('Comment'),
            backgroundColor: 'blue',
            color: 'white',
            icon: <Icon color="white" icons={['fa fa-comment']} />,
            key: 'comment',
            text: 'Comment',
        },
    ]}
>
    Add your content here.
</SwipeableWrapper>
