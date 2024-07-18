import userService from '../service/userService'

let listUsers = [];
const handleGetdata = (req, res) => {
    return res.render('home.ejs');
}

const handleUserPage = async (req, res) => {
    // first load page
    let userList = await userService.getListUsers();
    console.log('> homeController.handleUserPage - check count userlist:', userList.length);
    return res.render('user.ejs', { userList });
}

const handleUserInfo = async (req, res) => {
    let message = '';
    let userData = await userService.getUserInfoById(req.params.id);
    let userinfo = {};
    if (userData && userData.length > 0)
        userinfo = userData[0];

    console.log('>> check user info: ', userinfo);
    return res.render('user-edit.ejs', { userinfo })
}

const handleUpdateUser = async (req, res) => {
    let message = '';
    var userinfo = { id: req.params.id, email: req.body.email, username: req.body.username, password: req.body.password };

    //console.log('>> check user update: ', userinfo);
    userService.updateUser(userinfo);
    //res.render('user-edit.ejs', { userinfo, message: 'Save success.' })
    //res.render('user-edit.ejs', { userinfo, message: 'Save success.' })
    // setTimeout(() => {

    //     console.log(">>>> return user");
    //     res.redirect('/user');
    // }, 3000)

    return res.redirect('/user');

}

const handleCreatNewUser = async (req, res) => {
    var user = { email: req.body.email, username: req.body.username, password: req.body.password };
    // create new user
    userService.createNewUser(user);
    //return res.send('create done !');
    console.log('> homeController.handleCreatNewUser - create new success: ', user.username);
    return res.redirect('/user')
}

const handleDeleteUser = async (req, res) => {
    console.log('> homeController.handleDeleteUser req params: ', req.params);
    userService.deleteUser(req.params.id);
    return res.redirect('/user')
}


module.exports = {
    handleGetdata, handleUserPage, handleUserInfo, handleCreatNewUser, handleDeleteUser, handleUpdateUser
}