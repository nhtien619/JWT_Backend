import db from '../models/index';
import stringHandle from '../helpers/strUtility';

const registerNewUser = async (rawUserData) => {
    try {
        console.log('>> check register user: ', rawUserData);
        //? check email, phone are exist
        let isEmailExisted = await checkEmailExisted(rawUserData.email);
        let isPhoneExisted = await checkPhoneExisted(rawUserData.phone);

        console.log('isEmailExisted: ', isEmailExisted);
        console.log('isPhoneExisted: ', isPhoneExisted);

        if (isEmailExisted)
            return {
                code: -201,
                message: 'Email already existed.'
            }

        if (isPhoneExisted)
            return {
                code: -202,
                message: 'Phone already existed.'
            }


        //? hash password
        let hashPassword = stringHandle.handleHashPassword(rawUserData.password);

        //? create user and save to db
        await db.User.create({
            username: rawUserData.username,
            email: rawUserData.email,
            password: hashPassword,
            phone: rawUserData.phone
        });


        return {
            code: 1,
            message: 'Success'
        }


    } catch (ex) {
        console.log('Exception ', ex);

        return {
            code: -100,
            message: 'Error something wrong.'
        }
    }

}

const checkEmailExisted = async (email) => {
    let findEmail = await db.User.findOne({
        where: { email: email }
    })

    if (findEmail === null)
        return false

    return true;
}

const checkPhoneExisted = async (phone) => {
    let findEmail = await db.User.findOne({
        where: { phone: phone }
    })

    if (findEmail === null)
        return false

    return true;
}

module.exports = {
    registerNewUser
}