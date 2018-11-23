/* eslint-disable no-plusplus,import/prefer-default-export */
export function getMemberCount(chosenReceivers) {
    let memberCount = 0;

    chosenReceivers.forEach((receiver) => {
        const { groupId } = receiver;

        if (groupId) {
            if (groupId > 0) {
                memberCount += receiver.includedUsers.length;
            }
        } else {
            memberCount++;
        }
    });

    return memberCount;
}
