import axios from 'axios';
import { API_HOST, DEFAULT_BOT_NAME, CLIENT_HOST } from '../constants';
import { getTokenFromChromeStorage } from './authService';

const addBot = async (startMeetingTime, meetingUrl, meetingTitle) => {
    const chromeStorageToken = await getTokenFromChromeStorage();
    // eslint-disable-next-line
    const { organizationID } = await chrome.storage.local.get(['organizationID'])

    if (!chromeStorageToken) {
        window.open(`${CLIENT_HOST}/login`, '_blank');
        return undefined;
    }

    const queryString = organizationID ? `?organizationID=${organizationID}` : '';

    const config = {
        method: 'post',
        url: `${API_HOST}/recall-ai/bot/create${queryString}`,
        headers: {
            Authorization: `Bearer ${chromeStorageToken}`,
            'Content-Type': 'application/json',
        },
        data: {
            meetingUrl: `https://${meetingUrl}`,
            botName: DEFAULT_BOT_NAME,
            joinAt: startMeetingTime,
            isMeetingExist: false,
            meetingTitle,
        },
    };

    try {
        const response = await axios(config);
        return response.data.data;
    } catch (error) {
        return undefined;
    }
};

const deleteBot = async (bot) => {
    console.log('bot', bot);
    const chromeStorageToken = await getTokenFromChromeStorage();
    // eslint-disable-next-line
    const { organizationID } = await chrome.storage.local.get(['organizationID'])

    const queryString = organizationID ? `?organizationID=${organizationID}` : '';

    const config = {
        method: 'delete',
        url: `${API_HOST}/recall-ai/bot/delete${queryString}`,
        headers: {
            Authorization: `Bearer ${chromeStorageToken}`,
            'Content-Type': 'application/json',
        },
        data: { botID: bot.id },
    };

    try {
        await axios(config);
        return undefined;
    } catch (error) {
        return bot;
    }
};

const getBotByMeetingLink = async (meetingUrl) => {
    const chromeStorageToken = await getTokenFromChromeStorage();
    // eslint-disable-next-line
    const { organizationID } = await chrome.storage.local.get(['organizationID'])

    const queryString = organizationID ? `organizationID=${organizationID}&` : '';

    const config = {
        method: 'get',
        url: `${API_HOST}/recall-ai/bot/meeting-link?${queryString}meetingLink=https://${meetingUrl}`,
        headers: {
            Authorization: `Bearer ${chromeStorageToken}`,
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await axios(config);
        return response.data.data;
    } catch (error) {
        return undefined;
    }
};

const addGuestsToTheMeeting = async (meetingID, emails) => {
    if (!emails || !emails.length) {
        return undefined;
    }

    const chromeStorageToken = await getTokenFromChromeStorage();
    // eslint-disable-next-line
    const { organizationID } = await chrome.storage.local.get(['organizationID'])

    const queryString = organizationID ? `?organizationID=${organizationID}` : '';

    const config = {
        method: 'post',
        url: `${API_HOST}/meeting/${meetingID}/invite-users${queryString}`,
        headers: {
            Authorization: `Bearer ${chromeStorageToken}`,
            'Content-Type': 'application/json',
        },
        data: { emails },
    };

    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        return undefined;
    }
};

export {
    addBot,
    deleteBot,
    getBotByMeetingLink,
    addGuestsToTheMeeting,
};
