import {
    INIT_TIMEOUT,
} from './constants';
import {
    formatMeetingTime,
    createAddButton,
    createDeleteButton,
    createBotBtnBlock,
} from './helpers/botHelper';
import findMeetingBlockItems from './helpers/meetingBlockHelper';
import {
    addBot,
    deleteBot,
    getBotByMeetingLink,
} from './services/botService';
import {
    getTokenFromChromeStorage,
} from './services/authService';

let meetingUrl;
let bot;
let startMeetingTime;
const btnBlockName = 'bot-btn-block';
const addButton = createAddButton();
const deleteButton = createDeleteButton();
const botBtnBlock = createBotBtnBlock();
botBtnBlock.appendChild(addButton);
botBtnBlock.appendChild(deleteButton);

const addBotCall = async () => {
    addBot(startMeetingTime, meetingUrl).then(
        (res) => {
            if (res) {
                bot = res;
                addButton.style.display = 'none';
                deleteButton.style.display = 'inline';
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

const init = async () => {
    const chromeStorageToken = await getTokenFromChromeStorage();
    const baseBlock = document.querySelector('a[href^="https://meet.google.com/"]');

    if (baseBlock) {
        const meetingBlockItems = findMeetingBlockItems(baseBlock);
        const { meetingTime, startMeetingBLock } = meetingBlockItems;
        meetingUrl = meetingBlockItems.meetingUrl;

        if (meetingTime) startMeetingTime = formatMeetingTime(meetingTime);

        // eslint-disable-next-line max-len
        if (chromeStorageToken && ((meetingUrl && !bot) || (meetingUrl && bot && bot.meetingLink !== meetingUrl))) {
            bot = await getBotByMeetingLink(meetingUrl);
        }

        if (!document.getElementById(btnBlockName)) {
            if (!bot) {
                deleteButton.style.display = 'none';
            } else {
                addButton.style.display = 'none';
            }
            startMeetingBLock.appendChild(botBtnBlock);
        }
    }
};

setInterval(init, INIT_TIMEOUT);
