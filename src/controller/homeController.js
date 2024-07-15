const handleGetdata = (req, res) => {
    return res.render('home.ejs');
}

const handleUserdata = (req, res) => {
    return res.render('user.ejs');
}

module.exports = {
    handleGetdata, handleUserdata
}