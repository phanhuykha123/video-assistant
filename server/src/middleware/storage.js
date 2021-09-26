const State = require('../models/State');
const Content = require('../models/Content');

async function setUserStatus(req, res, next) {
    let body = req.body;
    let contents = await Content.findById(process.env.ID);

    if (body.object === 'page') {
        for (const entry of body.entry) {
            let webhook_event = entry.messaging[0];
            if(!webhook_event.postback) return next();

            let sender_psid = webhook_event.sender.id;
            let payload = webhook_event.postback?.payload;
            let buttonData;
            let stateUser = await State.findOne({userId: sender_psid});
            buttonData = JSON.parse(payload);

            //parse data in capture button
            if(buttonData.event === 'capture'){
                buttonData.data = JSON.parse(buttonData.data);

                if(buttonData.data.key === 'item_select'){
                   buttonData.data.next = stateUser.language === 'vi' ? buttonData.data.next + ":vi" : buttonData.data.next;
                   await State.updateMany({userId:sender_psid}, {next: buttonData.data.next});
                   next();
                }
            } else {
                buttonData.data = stateUser.language === 'vi' ? buttonData.data + ":vi" : buttonData.data;
                await State.updateMany({userId:sender_psid}, {next: buttonData.data});
                next();
            }

//if event is welcome set state and save db
            if (buttonData.data.key === 'language_select') {
                buttonData.data.next = buttonData.data.value === 'vi' ? buttonData.data.next + ":vi" : buttonData.data.next;
                const isUserExist = await State.findOne({userId:sender_psid});
                console.log(buttonData.data.next,buttonData.data.value);
                if(isUserExist){
                    await State.updateMany({userId:sender_psid},{language:buttonData.data.value,next: buttonData.data.next});
                    next();
                } else {
                    const stateOfUser = new State({
                        userId: sender_psid,
                        language: buttonData.data.value,
                        next : buttonData.data.next,
                    })
                    await stateOfUser.save();
                    next();
                }
            }
        }
    }

}
exports.setUserStatus = setUserStatus;