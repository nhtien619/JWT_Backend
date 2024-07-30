const testApiData = (req, res) => {
    let data = ['1', '2', '3'];
    return res.status(200).json({
        message: 'OK',
        data: data
    })
}

module.exports = { testApiData }