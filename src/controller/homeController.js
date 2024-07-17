import userService from '../service/userService'

let listUsers = [];
const handleGetdata = (req, res) => {
    return res.render('home.ejs');
}

const handleUserPage = async (req, res) => {
    // first load page

    let userList = await userService.getListUsers();
    // if (userList) {
    //     listUsers = userList;
    // }
    console.log('check userlist: ', userList);
    return res.render('user.ejs', { userList });
}

const handleCreatNewUser = async (req, res) => {
    var user = { email: req.body.email, username: req.body.username, password: req.body.password };
    // create new user
    //userService.createNewUser(user);


    return res.send('create done !');
}



module.exports = {
    handleGetdata, handleUserPage, handleCreatNewUser
}