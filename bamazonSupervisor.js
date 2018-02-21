const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

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
			switch (supervisorChoice.choice) {
				case 'View Product Sales by Department':
				viewProductsByDep();
				break;

				case 'Create New Department':
				createDepartment();
				break;

				case 'Exit':
				connection.end();
			}
		});	
};

function viewProductsByDep() {
	connection.query('SELECT SUM(product_sales) AS totalSales FROM products GROUP BY department_name',
		function(err, sales) {
			if (err) throw err;
	connection.query('SELECT SUM(over_head_costs) AS totalOverHead FROM departments GROUP BY department_name',
		function(err, overHead) {
			if (err) throw err;		
	connection.query('SELECT * FROM departments', 
		function(err, results) {
			if (err) throw err;
			// console.log(results);

			for (let i = 0; i < results.length; i++) {
				
				console.table([
					{
					  department_id: results[i].department_id,
					  department_name: results[i].department_name,
					  over_head_costs: '$' + results[i].over_head_costs,
					  product_sales: '$' + JSON.stringify(sales[i].totalSales),
					  total_profit: '$' + parseInt(sales[i].totalSales - overHead[i].totalOverHead)
					}
				]);
			};   
			displaySupervisorOptions();
	})
	})
	})
};

function createDepartment() {
	inquirer
		.prompt([
			{
				type: 'input',
				name: 'department',
				message: 'What is the new department name?'
			},
			{
				type: 'input',
				name: 'overHead',
				message: 'What is the over head cost of the department?',
				validate: function(value) {
          			if (isNaN(value) === false) {
            			return true;
          			}
          			console.log('Please input a valid number.');
          			return false;
        		}
			}
		])
		.then(function(response) {
			connection.query(
				'INSERT INTO departments SET ?',
				{
					department_name: response.department,
					over_head_costs: response.overHead
				},
				function(err) {
					if (err) throw err;
					console.log('Your department was successfully added!');
					displaySupervisorOptions();
				});
		});
};