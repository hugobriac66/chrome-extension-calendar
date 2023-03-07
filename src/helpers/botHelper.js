import { CLIENT_HOST, DEFAULT_BOT_NAME } from '../constants';

const formatMeetingTime = (timeBlock) => {
    const date = timeBlock.textContent;
    const currentYear = new Date().getFullYear();
    const dateWithoutWeekDay = date.split(',')[1];
    const splitedDate = dateWithoutWeekDay.split(' ');
    const currentFormatDate = new Date(`${splitedDate[1]} ${splitedDate[2].split('⋅')[0]} ${currentYear} ${splitedDate[2].split('⋅')[1].split('–')[0]} ${date.includes('PM') ? 'PM' : 'AM'}`);
    return currentFormatDate.toISOString();
};

const buttonStyle = 'display: inline; color: #fff; padding: 0 16px; background-color: rgb(26,115,232); line-height: 36px; font-family: \'Google Sans\',Roboto,Arial,sans-serif; font-weight: 500; outline: none; border: none; border-radius: 5px; margin-top: 6px;';

const createAddButton = () => {
    const botButton = document.createElement('button');
    botButton.id = 'bot-btn';
    botButton.innerHTML = `Add ${DEFAULT_BOT_NAME}`;
    botButton.style = buttonStyle;
    return botButton;
};

const createDeleteButton = () => {
    const botButton = document.createElement('button');
    botButton.id = 'bot-btn';
    botButton.innerHTML = `Delete ${DEFAULT_BOT_NAME}`;
    botButton.style = buttonStyle;
    return botButton;
};

const createAuthLink = () => {
    const authLink = document.createElement('a');
    authLink.href = `${CLIENT_HOST}/login`;
    authLink.target = '_blank';
    authLink.innerHTML = 'Login';
    authLink.style = 'display: block; background-color: rgb(26,115,232); color: #fff; padding: 0px 16px; border-radius: 4px; line-height: 36px; font-family: "Google Sans",Roboto,Arial,sans-serif; font-weight: 500; margin-top: 6px; width: fit-content;';

    return authLink;
};

const createAuthBlock = () => {
    const authBlock = document.createElement('div');
    authBlock.id = 'auth-block';
    authBlock.appendChild(createAuthLink());
    return authBlock;
};

export {
    formatMeetingTime,
    createAddButton,
    createDeleteButton,
    createAuthBlock,
};
