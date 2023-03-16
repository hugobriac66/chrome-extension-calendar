import {
    INIT_TIMEOUT,
} from './constants';
import {
    formatMeetingTime,
    createAddButton,
    createDeleteButton,
    createBotBtnBlock,
    createAddButtonInCall,
} from './helpers/botHelper';
import {
    findMeetingBlockItems,
    findGuestList,
    findMeetingIdBlockInCall,
} from './helpers/meetingBlockHelper';
import {
    addBot,
    deleteBot,
    getBotByMeetingLink,
    addGuestsToTheMeeting,
} from './services/botService';
import {
    getTokenFromChromeStorage,
} from './services/authService';

let meetingUrl;
let bot;
let startMeetingTime;
let meetingTitle;
let guestEmailList = [];
const btnBlockName = 'bot-btn-block';
const addButton = createAddButton();
const addButtonInCall = createAddButtonInCall();
const deleteButton = createDeleteButton();
const botBtnBlock = createBotBtnBlock();
botBtnBlock.appendChild(addButton);
botBtnBlock.appendChild(deleteButton);

const addBotCall = async () => {
    addBot(startMeetingTime, meetingUrl, meetingTitle).then(
        async (res) => {
            if (res) {
                bot = res;
                addButton.style.display = 'none';
                deleteButton.style.display = 'inline';
                await addGuestsToTheMeeting(bot.meetingID, guestEmailList);
            }
        },
    ).catch((error) => console.log('Adding error', error));
};

const addBotDuringTheCall = async () => {
    addBot(null, meetingUrl, meetingTitle).then(
        async (res) => {
            if (res) {
                bot = res;
                addButtonInCall.style.display = 'none';
            }
        },
    ).catch((error) => console.log('Adding error', error));
};

const deleteBotCall = async () => {
    deleteBot(bot).then(
        (res) => {
            bot = res;
            deleteButton.style.display = 'none';
            addButton.style.display = 'inline';
        },
    ).catch((error) => console.log('Deleting error', error));
};

addButton.addEventListener('click', addBotCall);
deleteButton.addEventListener('click', deleteBotCall);
addButtonInCall.addEventListener('click', addBotDuringTheCall);

const init = async () => {
    const chromeStorageToken = await getTokenFromChromeStorage();
    const baseBlock = document.querySelector('a[href^="https://meet.google.com/"]');
    const meetingIdBlockInCall = findMeetingIdBlockInCall();

    if (meetingIdBlockInCall.addBotInCallBlock) {
        meetingUrl = meetingIdBlockInCall.meetingUrl;
        meetingTitle = meetingIdBlockInCall.meetingTitle;

        if (chromeStorageToken && (meetingUrl && !bot)) {
            bot = await getBotByMeetingLink(meetingUrl);
        }

        if (!bot) meetingIdBlockInCall.addBotInCallBlock.appendChild(addButtonInCall);
    }

    if (baseBlock) {
        const meetingBlockItems = findMeetingBlockItems(baseBlock);
        guestEmailList = findGuestList(baseBlock);

        const { meetingTime, startMeetingBLock } = meetingBlockItems;
        meetingUrl = meetingBlockItems.meetingUrl;
        meetingTitle = meetingBlockItems.meetingTitle;

        if (meetingTime) startMeetingTime = formatMeetingTime(meetingTime);

        // eslint-disable-next-line max-len
        if (chromeStorageToken && ((meetingUrl && !bot) || (meetingUrl && bot && bot.meetingLink.split('://')[1] !== meetingUrl))) {
            bot = await getBotByMeetingLink(meetingUrl);
        }

        if (!document.getElementById(btnBlockName)) {
            if (!bot) {
                deleteButton.style.display = 'none';
                addButton.style.display = 'inline';
            } else {
                addButton.style.display = 'none';
                deleteButton.style.display = 'inline';
            }
            startMeetingBLock.appendChild(botBtnBlock);
        }
    }
};

setInterval(init, INIT_TIMEOUT);
