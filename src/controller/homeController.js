import userService from '../service/userService'

const handleGetdata = (req, res) => {
    return res.render('home.ejs');
}

const handleUserdata = (req, res) => {
    return res.render('user.ejs');
}

const handleCreatNewUser = async (req, res) => {
    var user = { email: req.body.email, username: req.body.username, password: req.body.password };
    // create new user
    //userService.createNewUser(user);
    userService.getListUsers();

    return res.send('create done !');
}



module.exports = {
    handleGetdata, handleUserdata, handleCreatNewUser
}