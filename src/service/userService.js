import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import bluebird from 'bluebird';
import db from '../models';
import user from '../models/user';

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
        //const connection = await handleGetConnection();
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

        // db.User.set({
        //     username: user.username,
        //     email: user.email
        // });

        await db.User.update(
            { username: user.username, email: user.email },
            {
                where: {
                    id: user.id
                }
            })


        //await db.User.save();

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
        let user = {};
        // const connection = await handleGetConnection();
        // const [rows, fields] = await connection.execute('SELECT * FROM user WHERE id = ?', [id]);
        user = await db.User.findOne({
            where: { id: id }
        })
        console.log('check rows: ', user)
        return user.get({ plain: true });
    } catch (err) {
        console.log('Error exception: ', err);
        return [];
    }
}

const deleteUser = async (id) => {
    try {
        // const connection = await handleGetConnection();
        // const [rows, fields] = await connection.execute('DELETE FROM user WHERE Id = ?', [id], function (err, results, fields) {
        //     console.log(results);
        // });
        await db.User.destroy({
            where: {
                id: id
            }
        })

        console.log('> userService.deleteUser - delete user success Id:', id);
    } catch (err) {
        console.log(err);
    }
}

const getListUsers = async () => {
    try {
        //const connection = await handleGetConnection();
        //const [rows, fields] = await connection.execute('SELECT * FROM user');
        const user = await db.User.findAll({
            include: {
                model: db.Group,
                attributes: ['id', 'name', 'description']
            },
            attributes: ['id', 'email', 'username'],
            raw: true,
            nest: true
        });

        let roles = await db.Role.findAll({
            include: { model: db.Group, where: { id: 1 } },
            raw: true,
            nest: true
        });

        // let newUser = await db.User.findOne({
        //     where: { id: 1 },
        //     include: { model: db.Group },
        //     raw: true,
        //     nest: true
        // })

        console.log(">> userService check user:", user);
        console.log(">> userService check roles:", roles);
        return user;
    } catch (err) {
        console.log('Error exception: ', err);
        return [];
    }
}


module.exports = { createNewUser, getUserInfoById, getListUsers, deleteUser, updateUser }