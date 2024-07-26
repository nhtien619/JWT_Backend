import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import bluebird from 'bluebird';
import db from '../models';

const salt = bcrypt.genSaltSync(10);

//? Create the connection to database with mysql
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


//? Create new user -> save database
const createNewUser = async (user) => {
    try {
        const connection = await handleGetConnection();
        let hashPass = hashPassword(user.password);

        // const [rows, fields] = await connection.execute('INSERT INTO users (email, password, username) VALUES (?, ?, ?)', [user.email, hashPass, user.username], function (err, results, fields) {
        //     console.log(results);
        // });

        await db.User.create({
            username: user.username,
            email: user.email,
            password: hashPass
        });


    } catch (err) {
        console.log(err);
    }
}

const updateUser = async (user) => {
    try {
        // const connection = await handleGetConnection();
        // const [rows, fields] = await connection.execute('UPDATE users SET username = ? , email = ? WHERE Id = ?',
        //     [user.username, user.email, user.id]);
        // console.log('check rows update: ', rows)

        db.User.set({
            username: user.username,
            email: user.email
        });

        await db.User.save();

        console.log('check rows update: ', user)
        return user;
    } catch (err) {
        console.log('Error exception: ', err);
        return {};
    }
}

const getUserInfoById = async (id) => {
    try {
        console.log('>>> check id:', id);
        const connection = await handleGetConnection();
        const [rows, fields] = await connection.execute('SELECT * FROM user WHERE id = ?', [id]);
        console.log('check rows: ', rows)
        return rows;
    } catch (err) {
        console.log('Error exception: ', err);
        return [];
    }
}



const deleteUser = async (id) => {
    try {
        const connection = await handleGetConnection();
        const [rows, fields] = await connection.execute('DELETE FROM user WHERE Id = ?', [id], function (err, results, fields) {
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
        const [rows, fields] = await connection.execute('SELECT * FROM user');
        return rows;
    } catch (err) {
        console.log('Error exception: ', err);
        return [];
    }
}


module.exports = { createNewUser, getUserInfoById, getListUsers, deleteUser, updateUser }