module.exports = function asyncFunction(routHulndler) {
    return async function (req, res, nxt) {
        try {
            await routHulndler(req, res)
        }
        catch (err) {
            nxt(err);
        }
    }
}