import axios from 'axios';
import { API_HOST, DEFAULT_BOT_NAME } from '../constants';
import { getToken } from './authService';

const AUTH_BEARER_TOKEN = getToken('sessionToken');
const organizationID = 'ORG_cf950ch59mpm4rv72qs0';

const addBot = async (startMeetingTime, meetingUrl) => {
    const config = {
        method: 'post',
        url: `${API_HOST}/recall-ai/bot/create?organizationID=${organizationID}`,
        headers: {
            Authorization: `Bearer ${AUTH_BEARER_TOKEN}`,
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
    const config = {
        method: 'delete',
        url: `${API_HOST}/recall-ai/bot/delete?organizationID=${organizationID}`,
        headers: {
            Authorization: `Bearer ${AUTH_BEARER_TOKEN}`,
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
    const config = {
        method: 'get',
        url: `${API_HOST}/recall-ai/bot/meeting-link?organizationID=${organizationID}&meetingLink=https://${meetingUrl}`,
        headers: {
            Authorization: `Bearer ${AUTH_BEARER_TOKEN}`,
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
