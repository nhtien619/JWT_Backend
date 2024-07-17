import mysql from 'mysql2';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);
// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'roleuser_db',
});

const hashPassword = (userPassword) => {
    // hash password
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = (user) => {
    let hashPass = hashPassword(user.password);
    try {
        connection.query('INSERT INTO users (email, password, username) VALUES (?, ?, ?)', [user.email, hashPass, user.username], function (err, results, fields) {
            console.log(results); // results contains rows returned by server
            //console.log(fields); // fields contains extra meta data about results, if available
        });

    } catch (err) {
        console.log(err);
    }
}

const getListUsers = () => {
    let users = [];

    try {
        connection.query('SELECT * FROM users', function (err, results, fields) {
            console.log('check results: ', results); // results contains rows returned by server
            //console.log(fields); // fields contains extra meta data about results, if available
        });

    } catch (err) {
        console.log(err);
    }
}


module.exports = { createNewUser, getListUsers }