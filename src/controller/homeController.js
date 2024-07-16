// Get the client
import mysql from 'mysql2';

// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'roleuser_db',
});

const handleGetdata = (req, res) => {
    return res.render('home.ejs');
}

const handleUserdata = (req, res) => {
    return res.render('user.ejs');
}

const handleCreatNewUser = async (req, res) => {
    //console.log(">>>> handleCreatNewUser reuqest:", req.body);
    // A simple SELECT query
    try {



        connection.query('INSERT INTO users (email, password, username) VALUES (?, ?, ?)', [req.body.email, req.body.password, req.body.username], function (err, results, fields) {
            console.log(results); // results contains rows returned by server
            console.log(fields); // fields contains extra meta data about results, if available
        });

        // connection.query('SELECT * FROM users', function (err, results, fields) {
        //     console.log(results); // results contains rows returned by server
        //     console.log(fields); // fields contains extra meta data about results, if available
        // });


    } catch (err) {
        console.log(err);
    }


    return res.send('create done !');
}

module.exports = {
    handleGetdata, handleUserdata, handleCreatNewUser
}