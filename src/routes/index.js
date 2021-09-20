
const request = require('request');
function route(app) {
    const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
    const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
    app.get('/webhook', (req, res) => {
        let VERIFY_TOKEN = process.env.VERIFY_TOKEN;
        let mode = req.query['hub.mode'];
        let token = req.query['hub.verify_token'];
        let challenge = req.query['hub.challenge'];
        if (mode && token) {
            if (mode === 'subscribe' && token === VERIFY_TOKEN) {
                console.log('WEBHOOK_VERIFIED');
                res.status(200).send(challenge);
            } else {
                res.sendStatus(403);
            }
        }
    });
    app.post('/webhook', (req, res) => {
        let body = req.body;
        if (body.object === 'page') {
            body.entry.forEach(function(entry) {
                let webhook_event = entry.messaging[0];
                console.log(webhook_event);
                let sender_psid = webhook_event.sender.id;
                if (webhook_event.message) {
                    handleMessage(sender_psid, webhook_event.message);
                } else if (webhook_event.postback) {
                    handlePostback(sender_psid, webhook_event.postback);
                }
            });
            res.status(200).send('EVENT_RECEIVED');
        } else {
            res.sendStatus(404);
        }

    });
    const chatbot = require('../data/chatbot.json');
    function handleMessage(sender_psid, received_message) {
        let response;
        if (received_message.text) {
            const data = chatbot.content[0];
            let arrButton = [];
            for (const button of data.buttons) {
                arrButton.push(button);
            }
            let newArrButton = arrButton.map(button =>{
                    return {
                        "type": "postback",
                        "title": button.text,
                        "payload": button.data,
                    }
                }
            )
            response = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [{
                            "title": data.text,
                            "buttons": newArrButton,
                        }]
                    }
                }
            }
        }

        // Send the response message
        callSendAPI(sender_psid, response);
    }
    function callSendAPI(sender_psid, message) {
        // Construct the message body
        let request_body = {
            "recipient": {
                "id": sender_psid
            },
            "message": message
        }

        // Send the HTTP request to the Messenger Platform
        request({
            "uri": "https://graph.facebook.com/v2.6/me/messages",
            "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
            "method": "POST",
            "json": request_body
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                const recipientId = body.recipient_id;
                const messageId = body.message_id;

                if (messageId) {
                    console.log("Successfully sent message with id %s to recipient %s",
                        messageId, recipientId);
                } else {
                    console.log("Successfully called Send API for recipient %s",
                        recipientId);
                }
            } else {
                console.error("Failed calling Send API", response.statusCode, response.statusMessage, body.error);
            }
        });
    }
    const storage = require('node-sessionstorage')
    function handlePostback(sender_psid, received_postback) {
        let response;
        let payload = received_postback.payload;
        let covertDataButton;

        covertDataButton = JSON.parse(payload.replace(/'/g, '"'));

        //Set storage of language
        if(covertDataButton.next === 'conversation_welcome'){
            let state = {
                language_id: covertDataButton.lang,
            }
            storage.setItem(`${sender_psid}`,state);
            console.log( 'id',sender_psid,'value',storage.setItem('${sender_psid}',state));
        }
        let language_select = storage.getItem('${sender_psid}').language_id;
        console.log(language_select)
        let nameCurrentNode = covertDataButton.next;
        let currentNode;
        for (const node of chatbot.content) {
            if(node.name === nameCurrentNode){
                currentNode = node;
            }
        }

        let dataCurrentNode;
        for (const data of currentNode.language) {
            if(data.lang === language_select){
                dataCurrentNode = data;
            }
        }

        if(covertDataButton.next === 'conversation_end'){
            response = {
                "text": `${dataCurrentNode.text}`
            }
        }
        else {
            let arrButton = [];
            for (const button of dataCurrentNode.buttons) {
                arrButton.push(button);
            }
            const newDataButton = arrButton.map(button =>{
                return {
                    "type": "postback",
                    "title": button.text,
                    "payload": button.data,
                }
            })

            let newElement;
            if(covertDataButton.next === 'list_items'){
                newElement = arrButton.map(button =>{
                    return {
                        "title": button.text,
                        "image_url": button.thumb,
                        "subtitle": button.price,
                        "buttons":[{
                            "type": "postback",
                            "title": button.sub_text,
                            "payload": button.data,
                        }]
                    }
                })
                response = {
                    "attachment": {
                        "type": "template",
                        "payload": {
                            "template_type": "generic",
                            "elements": newElement,
                        }
                    }
                }
            }
            else {
                // Set the response based on the postback payload
                response = {
                    "attachment": {
                        "type": "template",
                        "payload": {
                            "template_type": "generic",
                            "elements": [{
                                "title": dataCurrentNode.text,
                                "buttons": newDataButton,
                            }]
                        }
                    }
                }
            }
        }
        // Send the message to acknowledge the postback
        callSendAPI(sender_psid, response);
    }
}

module.exports = route;
