const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
	host: 'localhost',
	port: 8889,
	user: 'root',
	password: 'root',
	database: 'bamazon_DB'
});

connection.connect(function(err) {
	if (err) throw err;
	console.log('Connected as Manager');
	displayManagerOptions();
});

function displayManagerOptions() {
	inquirer
		.prompt([
			{
				name: 'choice',
				type: 'list',
				message: 'What would you like to do?',
				choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Exit']  
			},
		])
		.then(function(managerChoice) {
			console.log(managerChoice.choice);
			if (managerChoice.choice === 'View Products for Sale') {
				viewForSale();

			} if (managerChoice.choice === 'View Low Inventory') {
				console.log('option View Low Inventory');

			} if (managerChoice.choice === 'Add to Inventory') {
				console.log('option Add to Inventory');

			} if (managerChoice.choice === 'Add New Product') {
				console.log('option Add New Product');

			} if (managerChoice.choice === 'Exit') {
				connection.end();
			}
		})
}

function viewForSale() {
	connection.query('SELECT * FROM products', function(err, results) {
		if (err) throw err;

		for (let i = 0; i < results.length; i++) {
			let row = results[i];
			console.log('');
			console.log(`Product: ${row.product_name}`);
			console.log(`Price: $${row.price} \n Product ID: ${row.item_id} \n Remaining Quantity: ${row.stock_quantity}`);
			console.log('');
		};
		displayManagerOptions();
	})
};

