const success = (res, data) => {
    res.status(200).json({
        result: true,
        data,
    });
}

const error = (res, msg) => {
    res.status(400).json({
        result: false,
        msg,
    });
}

module.exports = {
    success,
    error,
}
