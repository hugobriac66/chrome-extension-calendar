import { DEFAULT_BOT_NAME } from '../constants';

const spinner = '<i style="margin-left: -8px; margin-right: 8px; display: none;" class="fa fa-spinner fa-spin spinner"></i>';

const formatMeetingTime = (timeBlock) => {
    let currentDayHalf;
    const date = timeBlock.textContent;

    if (date.includes('PM')) {
        currentDayHalf = 'PM';
    } else if (date.includes('AM')) {
        currentDayHalf = 'AM';
    } else {
        currentDayHalf = '';
    }

    const currentYear = new Date().getFullYear();
    const dateWithoutWeekDay = date.split(',')[1];
    const splitedDate = dateWithoutWeekDay.split(' ');
    const currentFormatDate = new Date(`${splitedDate[1]} ${splitedDate[2].split('⋅')[0]} ${currentYear} ${splitedDate[2].split('⋅')[1].split('–')[0]} ${currentDayHalf}`);
    return currentFormatDate.toISOString();
};

const buttonStyle = 'display: inline; color: #fff; cursor: pointer; padding: 0 20px; background-color: rgb(26,115,232); line-height: 36px; font-family: \'Google Sans\',Roboto,Arial,sans-serif; font-weight: 500; outline: none; border: none; border-radius: 5px; margin-top: 6px;';
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
    botButton.innerHTML = `${spinner} Add ${DEFAULT_BOT_NAME}`;
    botButton.style = buttonStyle;
    botButton.onmouseover = onmouseover(botButton);
    botButton.onmouseout = onmouseout(botButton);
    return botButton;
};

const createAddButtonInCall = () => {
    const botButton = document.createElement('button');
    botButton.id = 'add-bot-btn-in-call';
    botButton.innerHTML = `${spinner} Add ${DEFAULT_BOT_NAME}`;
    botButton.style = buttonStyle;
    botButton.onmouseover = onmouseover(botButton);
    botButton.onmouseout = onmouseout(botButton);
    return botButton;
};

const createDeleteButton = () => {
    const botButton = document.createElement('button');
    botButton.id = 'delete-bot-btn';
    botButton.innerHTML = `${spinner} Delete ${DEFAULT_BOT_NAME}`;
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
    createAddButtonInCall,
};
