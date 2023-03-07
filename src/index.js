import { INIT_TIMEOUT, DEFAULT_BOT_NAME } from './constants';
import {
    formatMeetingTime,
    createAddButton,
    createDeleteButton,
    createAuthBlock,
} from './helpers/botHelper';
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

const addBotCall = async () => {
    bot = await addBot(startMeetingTime, meetingUrl);
};

const deleteBotCall = async () => {
    bot = await deleteBot(bot);
};

const addButton = createAddButton();
const deleteButton = createDeleteButton();

const init = async () => {
    const chromeStorageToken = await getTokenFromChromeStorage();

    if ((document.getElementById('bot-btn') && document.getElementById('bot-btn').textContent === `Add ${DEFAULT_BOT_NAME}` && bot)
        || (document.getElementById('bot-btn') && document.getElementById('bot-btn').textContent === `Delete ${DEFAULT_BOT_NAME}` && !bot)
        || !document.getElementById('bot-btn')) {
        let baseBlock = document.querySelector('a[href^="https://meet.google.com/"]');
        if (baseBlock) {
            baseBlock = baseBlock.parentElement
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

            if (meetingTime) {
                startMeetingTime = formatMeetingTime(meetingTime);
            }

            const startMeetingBLock = baseBlock.parentElement;

            meetingUrl = baseBlock.lastChild.textContent;
            // eslint-disable-next-line max-len
            if (chromeStorageToken && ((meetingUrl && !bot) || (meetingUrl && bot && bot.meetingLink !== meetingUrl))) {
                bot = await getBotByMeetingLink(meetingUrl);
            }

            if (document.getElementById('bot-btn')) {
                const button = document.getElementById('bot-btn');
                button.remove();
            }

            if (chromeStorageToken) {
                const botButton = (bot) ? deleteButton : addButton;
                botButton.addEventListener('click', bot ? deleteBotCall : addBotCall);
                startMeetingBLock.appendChild(botButton);
            }

            if (!document.getElementById('auth-block') && !chromeStorageToken) {
                const authBlock = createAuthBlock();
                startMeetingBLock.appendChild(authBlock);
            }
        }
    }

    if (document.getElementById('auth-block') && chromeStorageToken) {
        const authBlock = document.getElementById('auth-block');
        authBlock.remove();
    }
};

setInterval(init, INIT_TIMEOUT);
