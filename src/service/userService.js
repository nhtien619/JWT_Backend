import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import bluebird from 'bluebird';
import db from '../models/models';

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
    try {
        const connection = await handleGetConnection();
        let hashPass = hashPassword(user.password);
        const [rows, fields] = await connection.execute('INSERT INTO users (email, password, username) VALUES (?, ?, ?)', [user.email, hashPass, user.username], function (err, results, fields) {
            console.log(results);
        });

    } catch (err) {
        console.log(err);
    }
}

const getUserInfoById = async (id) => {
    try {
        console.log('>>> check id:', id);
        const connection = await handleGetConnection();
        const [rows, fields] = await connection.execute('SELECT * FROM users WHERE Id = ?', [id]);
        console.log('check rows: ', rows)
        return rows;
    } catch (err) {
        console.log('Error exception: ', err);
        return [];
    }
}

const updateUser = async (user) => {
    try {
        const connection = await handleGetConnection();
        const [rows, fields] = await connection.execute('UPDATE users SET username = ? , email = ? WHERE Id = ?',
            [user.username, user.email, user.id]);
        console.log('check rows update: ', rows)
        return rows;
    } catch (err) {
        console.log('Error exception: ', err);
        return [];
    }
}

const deleteUser = async (id) => {
    try {
        const connection = await handleGetConnection();
        const [rows, fields] = await connection.execute('DELETE FROM users WHERE Id = ?', [id], function (err, results, fields) {
            console.log(results);
        });
        console.log('> userService.deleteUser - delete user success Id:', id);
    } catch (err) {
        console.log(err);
    }
}



const getListUsers = async () => {
    try {
        const connection = await handleGetConnection();
        const [rows, fields] = await connection.execute('SELECT * FROM users');
        return rows;
    } catch (err) {
        console.log('Error exception: ', err);
        return [];
    }
}


module.exports = { createNewUser, getUserInfoById, getListUsers, deleteUser, updateUser }