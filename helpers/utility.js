const uuid = require('uuid');

module.exports = {
    GiveResponse: function (status, message, data = null) {
        return {
            status,
            message,
            data
        };
    },
    AssignId: function (req, res, next) {
        req.id = uuid.v4()
        next()
    }
}