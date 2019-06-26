const mysql = require('mysql');
const inquirer = require('inquirer');
const userName = ["Admin"];
const password = ["password"];

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
    startApp();
});

function startApp() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'username',
            message: 'Please Enter Username'
        },
        {
            type: 'password',
            name: 'loginPassword',
            message: 'Please Enter Password.'
        }
    ]).then(function(user){
        if (user.username === userName[0]){
            if (user.loginPassword === passWord[0]){
                mainMenu();
            }
            else {
                console.log("Password incorrect, please try again.");
                startApp();
            }
        }
        else {
            console.log("Username incorrect, please try again.");
            startApp();
        }
    });
};

function mainMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'menuOptions',
            message: 'Choose from the following options:',
            choices: ["Show Current Lead Status for the Store", "Show Current Lead Status by Department", "Update Lead Goal by Department", "Update Actual Leads by Department", "Add Month"]
        }
    ]).then(function(option) {
        
    })
}