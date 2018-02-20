const mysql = require('mysql');
const inquirer = require('inquirer');
const table = require('table');

const connection = mysql.createConnection({
	host: 'localhost',
	port: 8889,
	user: 'root',
	password: 'root',
	database: 'bamazon_DB'
});

connection.connect(function(err) {
	if (err) throw err;
	console.log('Connected as Supervisor');
	displaySupervisorOptions();
});

function displaySupervisorOptions() {
	inquirer
		.prompt([
			{
				name: 'choice',
				type: 'list',
				message: 'What would you like to do?',
				choices: ['View Product Sales by Department', 'Create New Department', 'Exit']  
			},
		])
		.then(function(supervisorChoice) {
			if (supervisorChoice.choice === 'View Product Sales by Department') {
				viewProductsByDep();

			} if (supervisorChoice.choice === 'Create New Department') {
				createDepartment();

			} if (supervisorChoice.choice === 'Exit') {
				connection.end();
			}
		});	
};

function viewProductsByDep() {
	let config,
	    data,
	    output;
	 
	data = [
	    ['0A', '0B', '0C'],
	    ['1A', '1B', '1C'],
	    ['2A', '2B', '2C']
	];
	 
	config = {
	    border: {
	        topBody: `─`,
	        topJoin: `┬`,
	        topLeft: `┌`,
	        topRight: `┐`,
	 
	        bottomBody: `─`,
	        bottomJoin: `┴`,
	        bottomLeft: `└`,
	        bottomRight: `┘`,
	 
	        bodyLeft: `│`,
	        bodyRight: `│`,
	        bodyJoin: `│`,
	 
	        joinBody: `─`,
	        joinLeft: `├`,
	        joinRight: `┤`,
	        joinJoin: `┼`
	    }
	};
	 
	output = table.table(data, config);
	 
	console.log(output);
	displaySupervisorOptions();
};

function createDepartment() {
	inquirer
		.prompt([
			{
				type: 'input',
				name: 'department',
				message: 'What is the new department name?'
			}
		])
		.then(function(response) {
			connection.query(
				'INSERT INTO products SET ?',
				{
					department_name: response.department,
				},
				function(err) {
					if (err) throw err;
					console.log('Your department was successfully added!');
					displaySupervisorOptions();
				});
		});
};