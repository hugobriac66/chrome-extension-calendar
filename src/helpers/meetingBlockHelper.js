const findMeetingBlockItems = (block) => {
    const baseBlock = block.parentElement
        .parentElement
        .parentElement;

    const meetingTime = baseBlock
        .parentElement
        .parentElement
        .parentElement
        .parentElement
        .firstChild
        .firstChild
        .nextSibling
        .firstChild
        .lastChild;

    const startMeetingBLock = baseBlock.parentElement;

    const meetingUrl = baseBlock.lastChild.textContent;
    return { meetingTime, startMeetingBLock, meetingUrl };
};

export default findMeetingBlockItems;
