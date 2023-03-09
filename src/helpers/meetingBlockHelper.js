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

    const startMeetingBLock = baseBlock.parentElement;

    const meetingUrl = baseBlock.lastChild.textContent;
    return { meetingTime, startMeetingBLock, meetingUrl };
};

export default findMeetingBlockItems;
