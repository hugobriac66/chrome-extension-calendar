const formatMeetingTime = (timeBlock) => {
    const date = timeBlock.textContent;
    const currentYear = new Date().getFullYear();
    const dateWithoutWeekDay = date.split(',')[1];
    const splitedDate = dateWithoutWeekDay.split(' ');
    const currentFormatDate = new Date(`${splitedDate[1]} ${splitedDate[2].split('⋅')[0]} ${currentYear} ${splitedDate[2].split('⋅')[1].split('–')[0]} ${date.includes('PM') ? 'PM' : 'AM'}`);
    return currentFormatDate.toISOString();
};

const createAddDeleteButton = (botInfo) => {
    const botButton = document.createElement('button');
    botButton.id = 'bot-btn';
    botButton.innerHTML = `${botInfo ? 'Delete Reelay.ai' : 'Add Reelay.ai'}`;
    botButton.style = 'display: inline; color: #fff; padding: 0 16px; background-color: rgb(26,115,232); line-height: 36px; font-family: \'Google Sans\',Roboto,Arial,sans-serif; font-weight: 500; outline: none; border: none; border-radius: 5px; margin-top: 6px;';

    return botButton;
};

const createAuthButton = () => {
    const authButton = document.createElement('button');
    authButton.id = 'auth-btn';
    authButton.innerHTML = 'Login';
    authButton.style = 'display: inline; color: #fff; padding: 0 16px; background-color: rgb(26,115,232); line-height: 36px; font-family: \'Google Sans\',Roboto,Arial,sans-serif; font-weight: 500; outline: none; border: none; border-radius: 5px; margin-top: 6px; margin-left: 12px;';

    return authButton;
};

export {
    formatMeetingTime,
    createAddDeleteButton,
    createAuthButton,
};
