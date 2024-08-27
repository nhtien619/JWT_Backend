import bcrypt from 'bcryptjs';

const dateConvertTo_DDMMYYYY = (date) => {
    var format = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/'
        + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/'
        + date.getFullYear();
    return date;
}

const salt = bcrypt.genSaltSync(10);
const handleHashPassword = (userPassword) => {
    // hash password
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}


module.exports = { dateConvertTo_DDMMYYYY, handleHashPassword }