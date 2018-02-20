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
				viewLowInv();

			} if (managerChoice.choice === 'Add to Inventory') {
				addInv();

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

function viewLowInv() {
	connection.query('SELECT * FROM products', function(err, results) {
		if (err) throw err;
		let row;
		for (let i = 0; i < results.length; i++) {
			row = results[i];
			if (row.stock_quantity < 5) {
				console.log('');
				console.log(`Product: ${row.product_name}`);
				console.log(`Product ID: ${row.item_id} \n ****Remaining Quantity: ${row.stock_quantity}****`);
				console.log('');
			}
		}
		console.log('^If low inventory levels exist they will be listed above^')
		displayManagerOptions();
	})
};

function addInv() {
		connection.query("SELECT * FROM products", function(err, results) {
		if (err) throw err;

		inquirer.prompt([
			{
				name: 'productId',
				type: 'input',
				message: 'What is the product ID of the item you would like to add inventory to?',
				validate: function(value) {
			          if (isNaN(value) === false && value > 0 && value < 11 && value % 1 === 0) {
			            return true;
			          }
			          console.log('Please input a valid number.');
			          return false;
	        	}
			},
			{
				name: 'quantity',
				type: 'input',
				message: 'How many items would you like to add?',
				validate: function(value) {
			          if (isNaN(value) === false && value % 1 === 0) {
			            return true;
			          }
			          console.log('Please input a valid number.');
			          return false;
	        	}
			}
		])
		.then(function(answer) {
			let chosenId = parseInt(answer.productId);
			let chosenQuantity = parseInt(answer.quantity);
			let chosenProduct;
			for(let i = 0; i < results.length; i++) {
				if (results[i].item_id === chosenId) {
					chosenProduct = results[i];
				}
			}
			let quantity = chosenQuantity + chosenProduct.stock_quantity
			updateInv(quantity, chosenProduct.item_id);
			console.log('Inventory Updated!');
			displayManagerOptions();
		});
	});
};

function updateInv(quantity, item_id) {
		connection.query(
		'UPDATE products SET ? WHERE ?',
		[
			{
				stock_quantity: quantity
			},
			{
				item_id: item_id
			}
		],
		function(err, results) {
			if (err) throw err;
		}
	)
};

