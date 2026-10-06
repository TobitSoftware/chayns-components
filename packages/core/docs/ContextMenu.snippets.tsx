/* eslint-disable */
// @ts-nocheck
// prettier-ignore
<ContextMenu
    items={[
        {
            icons: ['fa fa-pencil'],
            key: 'edit',
            onClick: () => {},
            text: 'Edit',
        },
        {
            icons: ['fa fa-trash'],
            key: 'delete',
            onClick: () => {},
            text: 'Delete',
            isDisabled: true,
            disabledReason: 'You do not have permission to delete this entry.',
        },
    ]}
/>
