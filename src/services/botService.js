import axios from 'axios';
import { API_HOST, DEFAULT_BOT_NAME, CLIENT_HOST } from '../constants';
import { getTokenFromChromeStorage } from './authService';

const organizationID = 'ORG_cf950ch59mpm4rv72qs0';

const addBot = async (startMeetingTime, meetingUrl) => {
    const chromeStorageToken = await getTokenFromChromeStorage();

    if (!chromeStorageToken) {
        window.open(`${CLIENT_HOST}/login`, '_blank');
        return undefined;
    }

    const config = {
        method: 'post',
        url: `${API_HOST}/recall-ai/bot/create?organizationID=${organizationID}`,
        headers: {
            Authorization: `Bearer ${chromeStorageToken}`,
            'Content-Type': 'application/json',
        },
        data: {
            meetingUrl: `https://${meetingUrl}`,
            botName: DEFAULT_BOT_NAME,
            joinAt: startMeetingTime,
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
    const chromeStorageToken = await getTokenFromChromeStorage();
    const config = {
        method: 'delete',
        url: `${API_HOST}/recall-ai/bot/delete?organizationID=${organizationID}`,
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
    const config = {
        method: 'get',
        url: `${API_HOST}/recall-ai/bot/meeting-link?organizationID=${organizationID}&meetingLink=https://${meetingUrl}`,
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

export {
    addBot,
    deleteBot,
    getBotByMeetingLink,
};
