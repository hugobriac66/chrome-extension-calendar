let meetingUrl;

const addBot = async (meetingUrl) => {
    const options = {
        method: 'POST',
        heders: {
            "Authorization": "Bearer Wk8MX_pWVdSWdSdbJy-6xey7_FmD0jzOn_K4BpmJ8-rQ7iRUBmMf0rsxxy1ea7VjYH4udqSBmIz82JZq6I-7uE8hzE7MnAGrOsDvdoxqc-AddA==",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "meetingUrl": meetingUrl,
            "botName": 'Recall.ai bor'
          }),
    };

    const response =  await fetch(
        "http://local.reelay.ai/api/v1/recall-ai/bot/create?organizationID=ORG_cf950ch59mpm4rv72qs0",
        options
    );
    const record = await response.json();
    console.log('record', record);
}

const addButton = document.createElement('button');
addButton.id = "add-bot";
addButton.innerHTML = "Add bot";
addButton.style = "color: #fff; padding: 0 16px; background-color: rgb(26,115,232); line-height: 36px; font-family: 'Google Sans',Roboto,Arial,sans-serif; font-weight: 500; outline: none; border: none; border-radius: 5px; margin-top: 6px;"

const init = () => {
    if (!document.getElementById('add-bot')) {
        const baseBlock =  document
            .querySelector('a[href^="https://meet.google.com/"]')
            .parentElement
            .parentElement
            .parentElement;

        const startMeetingButton = baseBlock.parentElement;
        meetingUrl = baseBlock.lastChild.textContent;

        addButton.addEventListener("click", addBot);
        startMeetingButton.appendChild(addButton)
    }
}

setInterval(init, 5000);

