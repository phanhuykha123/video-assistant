const NodeController = require('../controller/NodeController');

function route(app) {
    /**
     * body : title, url, button: Array
     */
    app.post('/storage',NodeController.storage);

    /**
     * body : button : Button
     */
    app.get('/navigateNode',NodeController.navigateNode);
}
module.exports = route;