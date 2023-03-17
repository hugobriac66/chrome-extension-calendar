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

const findMeetingIdBlockInCall = () => {
    let addBotInCallBlock;
    const location = window.location.href;
    const meetingId = location.split('.com/')[1].split('?')[0];
    const meetingUrl = location.split('://')[1].split('?')[0];

    const divTags = document.getElementsByTagName('div');
    let meetingIdBlock;
    let meetingTitleBlock;
    let meetingTitle;

    for (let i = 0; i < divTags.length; i += 1) {
        if (divTags[i].textContent === meetingId) {
            meetingIdBlock = divTags[i];
            break;
        }

        if (divTags[i].getAttribute('data-meeting-title')) {
            meetingTitleBlock = divTags[i];
            break;
        }
    }

    if (meetingIdBlock) {
        addBotInCallBlock = meetingIdBlock
            .parentElement
            .parentElement
            .parentElement
            .parentElement
            .parentElement;

        meetingTitle = '(No title)';
    }

    if (meetingTitleBlock) {
        addBotInCallBlock = meetingTitleBlock.parentElement;
        meetingTitle = meetingTitleBlock.getAttribute('data-meeting-title');
    }

    return { addBotInCallBlock, meetingUrl, meetingTitle };
};

export {
    findMeetingBlockItems,
    findGuestList,
    findMeetingIdBlockInCall,
};
