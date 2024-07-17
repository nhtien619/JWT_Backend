import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import bluebird from 'bluebird';

const salt = bcrypt.genSaltSync(10);

// Create the connection to database
const handleGetConnection = async () => {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'roleuser_db',
        Promise: bluebird
    });

    return connection;

}




const hashPassword = (userPassword) => {
    // hash password
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const createNewUser = async (user) => {
    const connection = await handleGetConnection();


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

const getListUsers = async () => {
    let users = [];

    try {
        const connection = await handleGetConnection();
        const [rows, fields] = await connection.execute('SELECT * FROM users');
        console.log('check rows: ', rows)
        return rows;
    } catch (err) {
        console.log('Error exception: ', err);
        return [];
    }
}


module.exports = { createNewUser, getListUsers }