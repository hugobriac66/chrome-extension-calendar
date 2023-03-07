import { INIT_TIMEOUT, DEFAULT_BOT_NAME } from './constants';
import {
    formatMeetingTime,
    createAddDeleteButton,
    createAuthBlock,
} from './helpers/botHelper';
import {
    addBot,
    deleteBot,
    getBotByMeetingLink,
} from './services/botService';
import {
    getToken,
    setToken,
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

const init = async () => {
    const chromeStorageToken = await getTokenFromChromeStorage();
    if (!getToken('sessionToken')
        || (chromeStorageToken
            && getToken('sessionToken') !== chromeStorageToken)) {
        setToken('sessionToken', chromeStorageToken);
    }

    if (!chromeStorageToken && getToken('sessionToken')) {
        localStorage.removeItem('sessionToken');
    }

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
            if (getToken('sessionToken') && ((meetingUrl && !bot) || (meetingUrl && bot && bot.meetingLink !== meetingUrl))) {
                bot = await getBotByMeetingLink(meetingUrl);
            }

            if (document.getElementById('bot-btn')) {
                const button = document.getElementById('bot-btn');
                button.remove();
            }

            if (getToken('sessionToken')) {
                const botButton = createAddDeleteButton(bot);
                botButton.addEventListener('click', bot ? deleteBotCall : addBotCall);
                startMeetingBLock.appendChild(botButton);
            }

            if (!document.getElementById('auth-block') && !getToken('sessionToken')) {
                const authBlock = createAuthBlock();
                startMeetingBLock.appendChild(authBlock);
            }
        }
    }

    if (document.getElementById('auth-block') && getToken('sessionToken')) {
        const authBlock = document.getElementById('auth-block');
        authBlock.remove();
    }
};

setInterval(init, INIT_TIMEOUT);
