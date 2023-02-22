import { API_HOST, INIT_TIMEOUT, DEFAULT_BOT_NAME } from './constants';

const AUTH_BEARER_TOKEN = 'Wk8MX_pWVdSWdSdbJy-6xey7_FmD0jzOn_K4BpmJ8-rQ7iRUBmMf0rsxxy1ea7VjYH4udqSBmIz82JZq6I-7uE8hzE7MnAGrOsDvdoxqc-AddA==';
const organizationID = 'ORG_cf950ch59mpm4rv72qs0';

let meetingUrl;

const addBot = async () => {
    const options = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${AUTH_BEARER_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ meetingUrl, botName: DEFAULT_BOT_NAME }),
    };

    const response = await fetch(
        `${API_HOST}/recall-ai/bot/create?organizationID=${organizationID}`,
        options,
    );
    const record = await response.json();
    console.log('record', record);
};

const addButton = document.createElement('button');
addButton.id = 'add-bot';
addButton.innerHTML = 'Add Reelay.ai';
addButton.style = 'color: #fff; padding: 0 16px; background-color: rgb(26,115,232); line-height: 36px; font-family: \'Google Sans\',Roboto,Arial,sans-serif; font-weight: 500; outline: none; border: none; border-radius: 5px; margin-top: 6px;';

const init = () => {
    if (!document.getElementById('add-bot')) {
        let baseBlock = document.querySelector('a[href^="https://meet.google.com/"]');
        if (baseBlock) {
            baseBlock = baseBlock.parentElement
                .parentElement
                .parentElement;

            const startMeetingButton = baseBlock.parentElement;
            meetingUrl = baseBlock.lastChild.textContent;

            addButton.addEventListener('click', addBot);
            startMeetingButton.appendChild(addButton);
        }
    }
};

setInterval(init, INIT_TIMEOUT);
