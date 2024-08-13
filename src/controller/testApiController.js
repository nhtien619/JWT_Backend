const testApiData = (req, res) => {
    let data = ['1', '2', '3'];
    return res.status(200).json({
        message: 'OK',
        data: data
    })
}

const handleRegister = (req, res) => {
    console.log('>>>> handleRegister: ', req.body);

    return res.status(200).json({
        message: 'OK',
        data: req.body
    })
}


module.exports = { testApiData, handleRegister }