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

let currentMonth;

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

function finalUpdate(input, data) {
    console.log("Updating goal...\n");
    connection.query("UPDATE july_2019_leadsandsales SET ? WHERE ?", [
        {
            department_weekly_goals: input.updateGoal
        },
        {
            departments: data.deptGoal
        }
    ],
        function(err) {
            if (err) throw err;
            console.log("Goal Updated.\n");
            mainMenu();
        }
    )
};

function finalLeadUpdateWeek1(select, input) {
    console.log("Updating lead ...\n");
    connection.query("UPDATE july_2019_leadsandsales SET ? WHERE ?", [
        {
            week_one_dept_leads: select.deptLead
        },
        {
            departments: input.updateLead
        }
    ],
        function(err) {
            if (err) throw err;
            console.log("Lead Updated!\n");
            mainMenu();
        }
    )
};

function finalLeadUpdateWeek2(select, input) {
    console.log("Updating lead ...\n");
    connection.query("UPDATE july_2019_leadsandsales SET ? WHERE ?", [
        {
            week_two_dept_leads: select.deptLead
        },
        {
            departments: input.updateLead
        }
    ],
        function(err) {
            if (err) throw err;
            console.log("Lead Updated!\n");
            mainMenu();
        }
    )
};

function finalLeadUpdateWeek3(select, input) {
    console.log("Updating lead ...\n");
    connection.query("UPDATE july_2019_leadsandsales SET ? WHERE ?", [
        {
            week_three_dept_leads: select.deptLead
        },
        {
            departments: input.updateLead
        }
    ],
        function(err) {
            if (err) throw err;
            console.log("Lead Updated!\n");
            mainMenu();
        }
    )
};

function finalLeadUpdateWeek4(select, input) {
    console.log("Updating lead ...\n");
    connection.query("UPDATE july_2019_leadsandsales SET ? WHERE ?",  [
        {
            week_four_dept_leads: select.deptLead
        },
        {
            departments: input.updateLead
        }
    ],
        function(err) {
            if (err) throw err;
            console.log("Lead Updated!\n");
            mainMenu();
        }
    )
};

function updateGoal() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'deptGoal',
            message: 'Select the Department you would like to Update:',
            list: ["D21/22", "D23/59", "D24", "D25", "D26", "D27", "D28", "D29", "D30", "D01"]
        },
        {
            type: 'input',
            name: 'updateGoal',
            message: 'What would you like to change the Lead Goal to?'
        }
    ]).then(function(input) {
        connection.query("SELECT * FROM hd_leadssalesdb WHERE departments = ?", [input.deptGoal], function(err, data) {
            if (err) throw err;

            if (data[0].departments) {
                if (!Number(input.updateGoal)) {
                    console.log("The number that you entered in invalid.");

                    updateGoal();
                }
                else {
                    finalUpdate(input, data);
                }
            }
        })
    })
};

function updateLead() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'deptLead',
            message: 'Select the Department you would like to Update:',
            list: ["D21/22", "D23/59", "D24", "D25", "D26", "D27", "D28", "D29", "D30", "D01"]
        },
        {
            type: 'list',
            name: 'week',
            message: 'Which week would you like to update?',
            list: ["Week1", "Week2", "Week3", "Week4"]
        },
        {
            type: 'input',
            name: 'updateLead',
            message: 'What would you like to update the Lead to?'
        }
    ]).then(function(select, input) {
        if (select.week === "Week1") {
            connection.query("SELECT week_one_dept_leads FROM hd_leadssalesdb WHERE departments = ?", [input.deptLead], function(err, data) {
                if (err) throw err;

                if (data[0].departments) {
                    if (!Number(input.updateGoal)) {
                        console.log("The number that you entered in invalid.");

                        updateLead();
                    }
                    else {
                        finalLeadUpdateWeek1(select, input);
                    }
                }
            })
        }
        else if (select.week === "Week2") {
            connection.query("SELECT week_two_dept_leads FROM hd_leadssalesdb WHERE departments = ?", [input.deptLead], function(err, data) {
                if (err) throw err;

                if (data[0].departments) {
                    if (!Number(input.updateGoal)) {
                        console.log("The number that you entered in invalid.");

                        updateLead();
                    }
                    else {
                        finalLeadUpdateWeek2(select, input);
                    }
                }
            })
        }
        else if (select.week === "Week3") {
            connection.query("SELECT week_three_dept_leads FROM hd_leadssalesdb WHERE departments = ?", [input.deptLead], function(err, data) {
                if (err) throw err;

                if (data[0].departments) {
                    if (!Number(input.updateGoal)) {
                        console.log("The number that you entered in invalid.");

                        updateLead();
                    }
                    else {
                        finalLeadUpdateWeek3(select, input);
                    }
                }
            })
        }
        else if (select.week === "Week4") {
            connection.query("SELECT week_three_dept_leads FROM hd_leadssalesdb WHERE departments = ?", [input.spetLead], function(err, data) {
                if (err) throw err;

                if (data[0].departments) {
                    if (!Number(input.updateGoal)) {
                        console.log("The number that you entered in invalid.");

                        updateLead();
                    }
                    else {
                        finalLeadUpdateWeek4(select, input);
                    }
                }
            })
        }
    })
};

function selectMonth() {

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
    ]).then(function(choice, input) {
        inquirer.prompt([
            {
                type: 'checkbox',
                name: 'choiceConfirm',
                message: 'Is the month: ' + choice.monthChoice + ' and year: ' + input.yearChoice + ' correct?',
                choices: ["Yes", "No"],
                default: 'Yes'
             }
        ]).then(function(confirm) {
            if (confirm.choiceConfirm === "Yes") {
                console.log("Creating month...\n");

                connection.query(`CREATE TABLE IF NOT EXISTS ` + choice.monthChoice + `_` + input.yearChoice + `_leadsandsales(
                    departments VARCHAR(10) NOT NULL,
                    dept_weekly_goals INT(3) NOT NULL,
                    week_one_dept_leads INT(15),
                    week_two_dept_leads INT(15),
                    week_three_dept_leads INT(15),
                    week_four_dept_leads INT(15),
                    made_goals VARCHAR(5),
	                exceeds_goals VARCHAR(5))`, function(err, result) {
                        if (err) throw err;

                        if (result) {
                            const departments = ['D21/22', 'D23/59', 'D24', 'D25', 'D26', 'D27', 'D28', 'D29', 'D30', 'D01'];

                            for (let i = 0; i < departments.length; i++) {
                                connection.query(`INSERT INTO ` + choice.monthChoice + `_` + input.yearChoice + `_leadsandsales (departments)
                                VALUES (` + departments[i] + `);`);
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

function mainMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'menuOptions',
            message: 'Choose from the following options:',
            choices: ["Show Current Lead Status for the Store", "Show Current Lead Status by Department", "Update Lead Goal by Department", "Update Actual Leads by Department", "Select Month", "Add Month", "Exit"]
        }
    ]).then(function(option) {
        if (option.menuOptions === "Show Current Lead Status for the Store") {
            connection.query("SELECT departments, dept_weekly_goals, week_one_dept_leads, week_two_dept_leads, week_three_dept_leads, week_four_dept_leads, made_goals, exceeds_goals FROM hd_leadssalesdb", function(res, err) {
                if (err) throw err;

                console.table(res);
                mainMenu();
            })
        }
        else if (option.menuOptions === "Show Current Lead Status by Department") {
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'deptOptions',
                    message: 'Which Department would you like to see?',
                    list: ["D21/22", "D23/59", "D24", "D25", "D26", "D27", "D28", "D29", "D30", "D01"]
                }
            ]).then(function(choice) {
                if (choice.deptOptions === "D21/22") {
                    connection.query("SELECT * FROM hd_leadssalesdb WHERE departments = D21/22", function(res, err) {
                        if (err) throw err;

                        console.table(res);
                        mainMenu();
                    });
                }
                else if (choice.deptOptions === "D23/59") {
                    connection.query("SELECT * FROM hd_leadssalesdb WHERE departments = D23/59", function(res, err) {
                        if (err) throw err;

                        console.table(res);
                        mainMenu();
                    });
                }
                else if (choice.deptOptions === "D24") {
                    connection.query("SELECT * FROM hd_leadssalesdb WHERE departments = D24", function(res, err) {
                        if (err) throw err;

                        console.table(res);
                        mainMenu();
                    });
                }
                else if (choice.deptOptions === "D25") {
                    connection.query("SELECT * FROM hd_leadssalesdb WHERE departments = D25", function(res, err) {
                        if (err) throw err;

                        console.table(res);
                        mainMenu();
                    });
                }
                else if (choice.deptOptions === "D26") {
                    connection.query("SELECT * FROM hd_leadssalesdb WHERE departments = D26", function(res, err) {
                        if (err) throw err;

                        console.table(res);
                        mainMenu();
                    });
                }
                else if (choice.deptOptions === "D27") {
                    connection.query("SELECT * FROM hd_leadssalesdb WHERE departments = D27", function(res, err) {
                        if (err) throw err;

                        console.table(res);
                        mainMenu();
                    });
                }
                else if (choice.deptOptions === "D28") {
                    connection.query("SELECT * FROM hd_leadssalesdb WHERE departments = D28", function(res, err) {
                        if (err) throw err;

                        console.table(res);
                        mainMenu();
                    });
                }
                else if (choice.deptOptions === "D29") {
                    connection.query("SELECT * FROM hd_leadssalesdb WHERE departments = D29", function(res, err) {
                        if (err) throw err;

                        console.table(res);
                        mainMenu();
                    });
                }
                else if (choice.deptOptions === "D30") {
                    connection.query("SELECT * FROM hd_leadssalesdb WHERE departments = D30", function(res, err) {
                        if (err) throw err;

                        console.table(res);
                        mainMenu();
                    });
                }
                else {
                    connection.query("SELECT * FROM hd_leadssalesdb WHERE departments = D01", function(res, err) {
                        if (err) throw err;

                        console.table(res);
                        mainMenu();
                    })
                }
            })
        }
        else if (option.menuOptions === "Update Lead Goal by Department") {
            updateGoal();
        }
        else if (option.menuOptions === "Update Actual Leads by Department") {
            updateLead();
        }
        else if (option.menuOptions === "Select Month") {
            selectMonth();
        }
        else if (option.menuOptions === "Add Month") {
            addMonth();
        }
        else if (option.menuOptions === "Exit") {
            connection.end();
        }
    })
};