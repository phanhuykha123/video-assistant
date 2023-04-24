const express = require('express');
const router = express.Router();
const webhookController = require('../controller/WebhookController');
const { setUserStatus } = require('../middleware/storage');

router.get('/',webhookController.verifyWebhook);
router.post('/',setUserStatus,webhookController.sendDataWebhook)


module.exports = router;