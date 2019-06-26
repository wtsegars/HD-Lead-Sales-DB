const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: "localhost",
    post: 8889,
    user: "root",
    password: "root",
    socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
    database: "hd_hdleadssalesdb"
});

connection.connect(function(err) {
    if(err) throw err;
    console.log("Connected as ID " + connection.threadId);
});

inquirer.prompt([
    {
        type: 'password',
        name: 'loginPassword',
        message: 'Please Enter Password.'
    }
]).then(function(user){
    if (user.loginPassword === "password"){
        
    }
})