const request = require('request');
const state = require('../models/State');
class WebhookController {
    verifyWebhook(req,res){
        let VERIFY_TOKEN = process.env.VERIFY_TOKEN;
        let mode = req.query['hub.mode'];
        let token = req.query['hub.verify_token'];
        let challenge = req.query['hub.challenge'];
        // console.log(req);
        if (mode && token) {
            if (mode === 'subscribe' && token === VERIFY_TOKEN) {
                console.log('WEBHOOK_VERIFIED');
                res.status(200).send(challenge);
            } else {
                res.sendStatus(403);
            }
        }
    };
    sendDataWebhook(req,res){
        let body = req.body;
        if (body.object === 'page') {
            body.entry.forEach(function (entry) {
                let webhook_event = entry.messaging[0];
                let sender_psid = webhook_event.sender.id;
                if (webhook_event.message) {
                    handleMessage(sender_psid, webhook_event.message);
                } else if (webhook_event.postback) {
                    console.log('handle postback');
                    handlePostback(sender_psid, webhook_event.postback);
                }
            });
            res.status(200).send('EVENT_RECEIVED');
        } else {
            res.sendStatus(404);
        }
    };
    async handleMessage(sender_psid, received_message) {
        let response;
        if (received_message.text) {
            let contents = await Content.findOne({ userId: sender_psid });
            let stateUser = await state.findOne({ userId: sender_psid });
            const commandString = received_message.text.toLowerCase();
            const nodeRegArr = [];
            contents.content.forEach((node) => {
                if (!node.name.includes('not_found')) {
                    nodeRegArr.push({ id: node.name, regex: node.regex });
                }
            });

            const matchItem = nodeRegArr.find((item) => {
                const pattern = new RegExp(item.regex, 'g');
                console.log(pattern);
                return pattern.test(commandString);
            });
            // console.log(matchItem);
            if (!matchItem) {
                const condition = stateUser.language === 'en' ? 'not_found' : 'not_found:vi';
                const notFound = contents.content.find((node) => {
                    if (node.name === condition) {
                        return node;
                    }
                });

                const newDataButton = notFound.buttons.map((button) => {
                    return {
                        type: 'postback',
                        title: button.text,
                        payload: JSON.stringify(button),
                    };
                });

                const newElement = [
                    {
                        title: notFound.text,
                        buttons: newDataButton,
                    },
                ];
                const response = template(newElement);
                callSendAPI(sender_psid, response);
            } else {
                const data = contents.content[0];
                let arrButton = [];
                for (const button of data.buttons) {
                    arrButton.push(button);
                }
                let newArrButton = arrButton.map((button) => {
                    return {
                        type: 'postback',
                        title: button.text,
                        payload: JSON.stringify(button),
                    };
                });
                response = {
                    attachment: {
                        type: 'template',
                        payload: {
                            template_type: 'generic',
                            elements: [
                                {
                                    title: data.text,
                                    buttons: newArrButton,
                                },
                            ],
                        },
                    },
                };
            }
        }
        // Send the response message
        callSendAPI(sender_psid, response);
    }
    callSendAPI(sender_psid, message) {
        // Construct the message body
        let request_body = {
            recipient: {
                id: sender_psid,
            },
            message: message,
        };
        // Send the HTTP request to the Messenger Platform
        request(
            {
                uri: 'https://graph.facebook.com/v2.6/me/messages',
                qs: { access_token: process.env.PAGE_ACCESS_TOKEN },
                method: 'POST',
                json: request_body,
            },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    const recipientId = body.recipient_id;
                    const messageId = body.message_id;
                } else {
                    console.log('Failed calling Send API');
                }
            }
        );
    }
    async handlePostback(sender_psid, received_postback) {
        let response;
        let stateUser = await state.findOne({ userId: sender_psid });
        let contents = await Content.findOne({ _id: process.env.ID });
        let matchNode;
        contents.content.map((node) => {
            console.log(node.name, state.next);
            if (node.name === stateUser.next) {
                matchNode = node;
            }
        });

        const newDataButton = matchNode.buttons.map((button) => {
            return {
                type: 'postback',
                title: button.text,
                payload: JSON.stringify(button),
            };
        });

        let newElement;
        switch (true) {
            case matchNode.name.includes('conversation_end'): {
                response = {
                    text: `${matchNode.text}`,
                };
                break;
            }
            case matchNode.name.includes('list_items'): {
                newElement = matchNode.buttons.map((button) => {
                    return {
                        title: button.text,
                        image_url: button.thumb,
                        subtitle: button.price,
                        buttons: [
                            {
                                type: 'postback',
                                title: button.sub_text,
                                payload: JSON.stringify(button),
                            },
                        ],
                    };
                });
                response = template(newElement);
                break;
            }
            default: {
                newElement = [
                    {
                        title: matchNode.text,
                        buttons: newDataButton,
                    },
                ];
                response = template(newElement);
            }
        }
        // Send the message to acknowledge the postback
        callSendAPI(sender_psid, response);
    }
    template(Element) {
        const response = {
            attachment: {
                type: 'template',
                payload: {
                    template_type: 'generic',
                    elements: Element,
                },
            },
        };
        return response;
    }

}

module.exports = new WebhookController();
