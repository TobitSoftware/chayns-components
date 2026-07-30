<CommunicationList
    emptyMessage="No messages yet."
    itemRenderer={() => (
        <CommunicationContent content="This is a message.">This is a message.</CommunicationContent>
    )}
    items={[{ id: 'message-1' }]}
/>;
