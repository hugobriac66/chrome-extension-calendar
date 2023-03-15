const findMeetingBlockItems = (block) => {
    const baseBlock = block.parentElement
        .parentElement
        .parentElement;

    const meetingTimeParent = baseBlock
        .parentElement
        .parentElement
        .parentElement
        .parentElement
        .firstChild
        .firstChild
        .nextSibling
        .firstChild;

    const meetingTime = meetingTimeParent.children && meetingTimeParent.children[1];
    const meetingTitle = meetingTimeParent.children && meetingTimeParent.children[0].textContent;

    const startMeetingBLock = baseBlock.parentElement;

    const meetingUrl = baseBlock.lastChild.textContent;
    return {
        meetingTime,
        startMeetingBLock,
        meetingUrl,
        meetingTitle,
    };
};

const findGuestList = (block) => {
    const guestList = block.parentElement
        .parentElement
        .parentElement
        .parentElement
        .parentElement
        .parentElement
        .parentElement
        .children[2]
        .lastChild
        .children;

    const guestEmailList = [];

    if (guestList) {
        for (let i = 0; i < guestList.length; i += 1) {
            const email = guestList[i].getAttribute('data-email');
            if (email) {
                guestEmailList.push(email);
            }
        }
    }

    return guestEmailList;
};

export {
    findMeetingBlockItems,
    findGuestList,
};
