import { DEFAULT_BOT_NAME } from '../constants';

const formatMeetingTime = (timeBlock) => {
    const date = timeBlock.textContent;
    const currentYear = new Date().getFullYear();
    const dateWithoutWeekDay = date.split(',')[1];
    const splitedDate = dateWithoutWeekDay.split(' ');
    const currentFormatDate = new Date(`${splitedDate[1]} ${splitedDate[2].split('⋅')[0]} ${currentYear} ${splitedDate[2].split('⋅')[1].split('–')[0]} ${date.includes('PM') ? 'PM' : 'AM'}`);
    return currentFormatDate.toISOString();
};

const buttonStyle = 'display: inline; color: #fff; cursor: pointer; padding: 0 16px; background-color: rgb(26,115,232); line-height: 36px; font-family: \'Google Sans\',Roboto,Arial,sans-serif; font-weight: 500; outline: none; border: none; border-radius: 5px; margin-top: 6px;';
const onmouseover = (el) => function () {
    // eslint-disable-next-line no-param-reassign
    el.style.backgroundColor = 'rgb(66,133,244)';
};

const onmouseout = (el) => function () {
    // eslint-disable-next-line no-param-reassign
    el.style.backgroundColor = 'rgb(26,115,232)';
};

const createAddButton = () => {
    const botButton = document.createElement('button');
    botButton.id = 'add-bot-btn';
    botButton.innerHTML = `Add ${DEFAULT_BOT_NAME}`;
    botButton.style = buttonStyle;
    botButton.onmouseover = onmouseover(botButton);
    botButton.onmouseout = onmouseout(botButton);
    return botButton;
};

const createDeleteButton = () => {
    const botButton = document.createElement('button');
    botButton.id = 'delete-bot-btn';
    botButton.innerHTML = `Delete ${DEFAULT_BOT_NAME}`;
    botButton.style = buttonStyle;
    botButton.onmouseover = onmouseover(botButton);
    botButton.onmouseout = onmouseout(botButton);
    return botButton;
};

const createBotBtnBlock = () => {
    const botBtnBlock = document.createElement('div');
    botBtnBlock.id = 'bot-btn-block';
    return botBtnBlock;
};

export {
    formatMeetingTime,
    createAddButton,
    createDeleteButton,
    createBotBtnBlock,
};
