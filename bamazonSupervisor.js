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

// opening menu when the app starts. Whatever option they choose the corresponding function will be called
displaySupervisorOptions = () => {
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

// The function gets the sum of the products and the difference of their over head costs by groups, as well as other labeling
// information from both tables on the database and inserts it all into a table on the console
viewProductsByDep = () => {
	let sql = 'SELECT SUM(product_sales) AS totalSales, SUM(product_sales) - over_head_costs AS totalProfit, \
	department_id, over_head_costs, product_name, price FROM products INNER JOIN departments ON products.department_name = \
	departments.department_name GROUP BY departments.department_name'
	connection.query(sql, function(err, results) {
		console.log(results);
	
		for (let i = 0; i < results.length; i++) {
				console.table([
					{
						department_id: results[i].department_id,
						// department_name: results[i].departmentName,
						over_head_costs: results[i].over_head_costs,
						product_sales: results[i].totalSales,
						total_profits: results[i].totalProfit
					}
				]);			
		}		
	displaySupervisorOptions();
	})		
};

// prompts the users all of the questions to add a new department to the database
createDepartment = () => {
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
		// validates the answers and sends them to the database, and notifies the user
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