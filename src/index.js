import { INIT_TIMEOUT } from './constants';
import { formatMeetingTime, createAddDeleteButton } from './helpers/botHelper';
import {
    addBot,
    deleteBot,
    getBotByMeetingLink,
} from './services/botService';

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
    if ((document.getElementById('bot-btn') && document.getElementById('bot-btn').textContent === 'Add Reelay.ai' && bot)
        || (document.getElementById('bot-btn') && document.getElementById('bot-btn').textContent === 'Delete Reelay.ai' && !bot)
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

            const startMeetingButton = baseBlock.parentElement;

            meetingUrl = baseBlock.lastChild.textContent;
            if ((meetingUrl && !bot) || (meetingUrl && bot && bot.meetingLink !== meetingUrl)) {
                bot = await getBotByMeetingLink(meetingUrl);
            }

            if (document.getElementById('bot-btn')) {
                const button = document.getElementById('bot-btn');
                button.remove();
            }

            const botButton = createAddDeleteButton(bot);
            botButton.addEventListener('click', bot ? deleteBotCall : addBotCall);
            startMeetingButton.appendChild(botButton);
        }
    }
};

setInterval(init, INIT_TIMEOUT);
