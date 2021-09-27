const State = require('../models/State');
async function setStateOfUser(req, res, next) {
     const buttonData = req.body.currentNode;
     if (buttonData.event === 'capture') {
         buttonData.data = JSON.parse(buttonData.data.replace(/'/g, '"'));
     }
     if (buttonData.data.key === 'language_select') {
         const isUserExist = await State.findOne({userId: buttonData.name});
         if (isUserExist) {
             await State.updateMany({userId: buttonData.name}, {
                 language: buttonData.data.lang,
             });
             next();
         } else {
             const stateOfUser = new State({
                 userId: buttonData.name,
                 language: buttonData.data.lang,
             })
             await stateOfUser.save();
             next();
         }
     } else {
         next();
     }
 }
exports.setStateOfUser = setStateOfUser;