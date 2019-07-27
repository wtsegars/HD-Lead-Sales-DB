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
    database: "hd_leadssalesdb"
});

connection.connect(function(err) {
    if(err) throw err;
    console.log("Connected as ID " + connection.threadId);
    startApp();
});

let monthSelection = "";

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
            if (user.loginPassword === password[0]){
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

function updateGoal() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'monthSelection',
            message: 'What month would you like to see?',
            choices: ["january", "febuary", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]
        },
        {
            type: 'input',
            name: 'yearInput',
            message: 'Please enter the year you would like to use:'
        },
        {
            type: 'list',
            name: 'deptGoal',
            message: 'Select the Department you would like to Update:',
            choices: ["D21/22", "D23/59", "D24", "D25", "D26/85", "D27", "D28", "D29/70", "D30", "D31/94", "D42", "D78", "D93/38", "D90/96", "D01"]
        },
        {
            type: 'input',
            name: 'updateGoal',
            message: 'What would you like to change the Lead Goal to?'
        }
    ]).then(function(input) {
        connection.query("SELECT * FROM " + input.monthSelection + "_" + input.yearInput + "_leadsandsales", function(err) {
            if (err) {
                console.log("Error, the month and/or year you input does not exist");

                inquirer.prompt([
                    {
                        type: 'checkbox',
                        name: 'errChoice',
                        message: 'Would you like to add this as a new month?',
                        choices: ["Yes", "No"],
                        default: "Yes"
                    }
                ]).then(function (select) {
                    if (select.errChoice === "Yes") {
                        addMonth();
                    }
                    else if (select.errChoice === "No") {
                        mainMenu();
                    }
                });
            }
            else {
                monthSelection = input.monthSelection + "_" + input.yearInput + "_leadsandsales";

                console.log("Updating goal...\n");

                connection.query("SELECT dept_weekly_goals FROM " + monthSelection + " WHERE departments = '" + input.deptGoal + "'", function(err) {
                    if (err) throw err;

                    else {
                        connection.query("UPDATE " + monthSelection + " SET dept_weekly_goals = '" + input.updateGoal + "' WHERE departments = '" + input.deptGoal + "'", function(err) {
                            if (err) throw err;

                            else {
                                console.log("Goal Updated.\n");

                                mainMenu();
                            }
                        });
                    }
                });
            }
        });
    });
};

function updateLead() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'monthSelection',
            message: 'What month would you like to see?',
            choices: ["january", "febuary", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]
        },
        {
            type: 'input',
            name: 'yearInput',
            message: 'Please enter the year you would like to use:'
        },
        {
            type: 'list',
            name: 'deptLead',
            message: 'Select the Department you would like to Update:',
            choices: ["D21/22", "D23/59", "D24", "D25", "D26/85", "D27", "D28", "D29/70", "D30", "D31/94", "D42", "D78", "D93/38", "D90/96", "D01"]
        },
        {
            type: 'list',
            name: 'week',
            message: 'Which week would you like to update?',
            choices: ["Week1", "Week2", "Week3", "Week4"]
        },
        {
            type: 'input',
            name: 'updateLead',
            message: 'What would you like to update the Lead to?'
        }
    ]).then(function(select) {
        connection.query("SELECT * FROM " + select.monthSelection + "_" + select.yearInput + "_leadsandsales", function(err) {
            if (err) {
                console.log("Error, the month and/or year you input does not exist");

                inquirer.prompt([
                    {
                        type: 'checkbox',
                        name: 'errChoice',
                        message: 'Would you like to add this as a new month?',
                        choices: ["Yes", "No"],
                        default: "Yes"
                    }
                ]).then(function (select) {
                    if (select.errChoice === "Yes") {
                        addMonth();
                    }
                    else if (select.errChoice === "No") {
                        mainMenu();
                    }
                });
            }
            else {
                monthSelection = select.monthSelection + "_" + select.yearInput + "_leadsandsales";

                let weekSelect = "";

                if (select.week === "Week1"){
                    weekSelect = "week_one_dept_leads";
                }
                else if (select.week === "Week2"){
                    weekSelect = "week_two_dept_leads";
                }
                else if (select.week === "Week3"){
                    weekSelect = "week_three_dept_leads";
                }
                else {
                    weekSelect = "week_four_dept_leads";
                }
                
                console.log("Updating lead ...\n");

                connection.query("SELECT " + weekSelect + " FROM " + monthSelection + " WHERE departments = '" + select.deptLead + "'", function(err) {
                    if (err) throw err;

                    else {
                        connection.query("UPDATE " + monthSelection + " SET " + weekSelect + " = '" + select.updateLead + "' WHERE departments = '" + select.deptLead + "'", function(err, data) {
                            if (err) throw err;
        
                            else {
                                console.log("Lead Updated!\n");
        
                                mainMenu();
                            }
                        });
                    }
                });
            }
        });
    });
};

function addMonth() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'monthChoice',
            message: 'What month would you like to add?',
            choices: ["january", "febuary", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]
        },
        {
            type: 'input',
            name: 'yearChoice',
            message: 'What year would you like to add?'
        }
    ]).then(function(choice) {
        inquirer.prompt([
            {
                type: 'list',
                name: 'choiceConfirm',
                message: 'Is the month: ' + choice.monthChoice + ' and year: ' + choice.yearChoice + ' correct?',
                choices: ["Yes", "No"],
                default: 'Yes'
             }
        ]).then(function(confirm) {
            if (confirm.choiceConfirm === "Yes") {
                console.log("Creating month...\n");

                connection.query(`CREATE TABLE IF NOT EXISTS ` + choice.monthChoice + `_` + choice.yearChoice + `_leadsandsales(
                    departments VARCHAR(10) NOT NULL,
                    dept_weekly_goals INT(3),
                    week_one_dept_leads INT(15),
                    week_two_dept_leads INT(15),
                    week_three_dept_leads INT(15),
                    week_four_dept_leads INT(15),
                    made_goals VARCHAR(5),
	                exceeds_goals VARCHAR(5))`, function(err, result) {
                        if (err) throw err;

                        if (result) {
                            const departments = ['D21/22', 'D23/59', 'D24', 'D25', 'D26/85', 'D27', 'D28', 'D29/70', 'D30', "D31/94", "D42", "D78", "D93/38", "D90/96", 'D01'];

                            for (let i = 0; i < departments.length; i++) {
                                connection.query(`INSERT INTO ` + choice.monthChoice + `_` + choice.yearChoice + `_leadsandsales (departments)
                                VALUES ('` + departments[i] + `');`);
                            }

                            console.log("Month added!\n");

                            mainMenu();
                        }
                        else {
                            console.log("There was a error in creating the month, please try again.");

                            addMonth();
                        }
                    })
            } 
            else {
                addMonth();
            }
        })
    })
};

function deleteMonth() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'monthSelection',
            message: 'What month would you like to remove',
            choices: ["january", "febuary", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]
        },
        {
            type: 'input',
            name: 'yearInput',
            message: 'Please enter the year you would like to remove:'
        }
    ]).then(function(choice) {
        inquirer.prompt([
            {
                type: 'list',
                name: 'confirmDelete',
                message: 'Are you sure you want to delete' + choice.monthSelection + ' of the year ' + choice.yearInput + '?',
                choices: ["Yes", "No"],
                default: "Yes"
            }
        ]).then(function(option) {
            if (option.confirmDelete === "Yes") {
                console.log("Removing Table from Database...\n");

                connection.query("DROP TABLE " + choice.monthSelection + "_" + choice.yearInput + "_leadsandsales", function(err) {
                    if (err) throw err;

                    else {
                        console.log("Table Sucessfully Removed.\n");

                        mainMenu();
                    }
                });
            }
        });
    });
};

function mainMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'menuOptions',
            message: 'Choose from the following options:',
            choices: ["Show Current Lead Status for the Store", "Show Current Lead Status by Department", "Update Lead Goal by Department", "Update Actual Leads by Department", "Add Month", "Delete Month", "Exit"]
        }
    ]).then(function(option) {
        if (option.menuOptions === "Show Current Lead Status for the Store") {
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'monthSelection',
                    message: 'What month would you like to see?',
                    choices: ["january", "febuary", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]
                },
                {
                    type: 'input',
                    name: 'yearInput',
                    message: 'Please enter the year you would like to use:'
                }
            ]).then(function(select) {
                console.log(select.monthSelection);
                console.log(select.yearInput);
                connection.query("SELECT * FROM " + select.monthSelection + "_" + select.yearInput + "_leadsandsales", function(err, res) {
                    console.table(res);
                    if (err) {
                        console.log("Error, the month and/or year you input does not exist");
        
                        inquirer.prompt([
                            {
                                type: 'checkbox',
                                name: 'errChoice',
                                message: 'Would you like to add this as a new month?',
                                choices: ["Yes", "No"],
                                default: "Yes"
                            }
                        ]).then(function(select) {
                            if (select.errChoice === "Yes") {
                                addMonth();
                            }
                            else if (select.errChoice === "No") {
                                mainMenu();
                            }
                        });
                    }
                    else {
                        monthSelection = select.monthSelection + "_" + select.yearInput + "_leadsandsales";
                        console.log(monthSelection);
                        mainMenu();
                    }
                });
            })
        }
        else if (option.menuOptions === "Show Current Lead Status by Department") {
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'monthSelection',
                    message: 'What month would you like to see?',
                    choices: ["january", "febuary", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"]
                },
                {
                    type: 'input',
                    name: 'yearInput',
                    message: 'Please enter the year you would like to use:'
                },
                {
                    type: 'list',
                    name: 'deptOptions',
                    message: 'Which Department would you like to see?',
                    choices: ["D21/22", "D23/59", "D24", "D25", "D26/85", "D27", "D28", "D29/70", "D30", "D31/94", "D42", "D78", "D93/38", "D90/96", "D01"]
                }
            ]).then(function(choice) {
                connection.query("SELECT * FROM " + choice.monthSelection + "_" + choice.yearInput + "_leadsandsales", function(err, res) {
                    if (err) {
                        console.log("Error, the month and/or year you input does not exist");
        
                        inquirer.prompt([
                            {
                                type: 'checkbox',
                                name: 'errChoice',
                                message: 'Would you like to add this as a new month?',
                                choices: ["Yes", "No"],
                                default: "Yes"
                            }
                        ]).then(function(select) {
                            if (select.errChoice === "Yes") {
                                addMonth();
                            }
                            else if (select.errChoice === "No") {
                                mainMenu();
                            }
                        });
                    }
                    else {
                        monthSelection = choice.monthSelection + "_" + choice.yearInput + "_leadsandsales";
                        console.log(monthSelection);
                        connection.query("SELECT * FROM " + monthSelection + " WHERE departments = '" + choice.deptOptions + "'", function(err, res) {
                            if (err) throw err;

                            else {
                                console.table(res);

                                mainMenu();
                            }
                        })
                    }
                })
            })
        }
        else if (option.menuOptions === "Update Lead Goal by Department") {
            updateGoal();
        }
        else if (option.menuOptions === "Update Actual Leads by Department") {
            updateLead();
        }
        else if (option.menuOptions === "Add Month") {
            addMonth();
        }
        else if (option.menuOptions === "Delete Month") {
            deleteMonth();
        }
        else if (option.menuOptions === "Exit") {
            connection.end();
        }
    })
};