import userService from '../service/userService'

let listUsers = [];
const handleGetdata = (req, res) => {
    return res.render('home.ejs');
}

const handleUserPage = async (req, res) => {
    // first load page
    let userList = await userService.getListUsers();
    //console.log('> homeController.handleUserPage - check count userlist:', userList);
    console.log('> homeController.handleUserPage - check users:', JSON.stringify(userList, null, 1));
    console.log('---------------------------------------------------');
    return res.render('user.ejs', { userList });
}

const handleUserInfo = async (req, res) => {
    let message = '';
    let userinfo = await userService.getUserInfoById(req.params.id);

    console.log('>> check user info: ', userinfo);
    return res.render('user-edit.ejs', { userinfo })
}

const handleUpdateUser = async (req, res) => {
    let message = '';
    console.log('>>>> handleUpdateUser: ', req.params);
    var userinfo = { id: req.params.id, email: req.body.email, username: req.body.username, password: req.body.password };
    const rsUpdate = await userService.updateUser(userinfo);
    if (rsUpdate.id > 0) {
        return res.redirect('/user');
    }
    message = 'Save error';
    return res.render('user-edit.ejs', { userinfo })

}

const handleCreatNewUser = async (req, res) => {
    var user = { email: req.body.email, username: req.body.username, password: req.body.password };
    // create new user
    await userService.createNewUser(user);
    //return res.send('create done !');
    console.log('> homeController.handleCreatNewUser - create new success: ', user.username);
    return res.redirect('/user')
}

const handleDeleteUser = async (req, res) => {
    console.log('> homeController.handleDeleteUser req params: ', req.params);
    await userService.deleteUser(req.params.id);
    return res.redirect('/user')
}

module.exports = {
    handleGetdata, handleUserPage, handleUserInfo, handleCreatNewUser, handleDeleteUser, handleUpdateUser
}