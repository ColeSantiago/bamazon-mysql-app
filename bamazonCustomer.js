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
	console.log('Connected!');
	displayProducts();
});

function displayProducts() {
	connection.query('SELECT * FROM products', function(err, results) {
		if (err) throw err;
		// console.log(results);
		console.log('------------------------------');
		console.log('      Available Products');
		console.log('------------------------------');
		console.log('');

		for (let i = 0; i < results.length; i++) {
			let row = results[i];
			console.log(`Product ID: ${row.item_id} \n ${row.product_name} \n Price: $${row.price} \n`);
		};
		startPurchase();
	});
};

function startPurchase() {
	connection.query("SELECT * FROM products", function(err, results) {
		if (err) throw err;

		inquirer.prompt([
			{
				name: 'productId',
				type: 'input',
				message: 'What is the product ID of the item you would like to buy?',
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
				message: 'How many would you like to buy?',
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
			let chosenProduct;
			for(let i = 0; i < results.length; i++) {
				if (results[i].item_id === chosenId) {
					chosenProduct = results[i];
				}
			}

			console.log(chosenProduct);	
		})
	})
};