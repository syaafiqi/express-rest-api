const mcache = require('memory-cache')

function cache(duration) {
    return (req, res, next) => {
        let key = '__express__' + req.originalUrl || req.originalUrl
        let cachedBody = mcache.get(key)
        if(cachedBody) {
            res.send(cachedBody)
            return
        } else {
            res.sendResponse = res.send
            res.send = (body) => {
                mcache.put(key, body, duration * 1000)
                res.sendResponse(body)
            }
            next()
        }
    }
}

module.exports = cache