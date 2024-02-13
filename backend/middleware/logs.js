const logs = (req, res, next) => {
    console.log(`${req.method} ${req.url} ${req.headers.origin}`);
    next();
}

module.exports = logs;