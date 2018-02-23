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

// opening menu when the app starts. Whatever option they choose the corresponding function will be called
displayManagerOptions = () => {
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
			switch (managerChoice.choice) {
				case 'View Products for Sale':
				viewForSale();
				break;

				case 'View Low Inventory':
				viewLowInv();
				break;

				case 'Add to Inventory':
				addInv();
				break;

				case 'Add New Product':
				addProduct();
				break;

				case 'Exit':
				connection.end();
				break;
			};
		});
};

// selects everything for the products table and displays it
viewForSale = () => {
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

// if the stock level of an item is below 5, it will be displayed, if not nothing will be displayed
viewLowInv = () => {
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

// prompts the user asking them what product they would like to update and by how much, validating the answers
addInv = () => {
		connection.query("SELECT * FROM products", function(err, results) {
		if (err) throw err;

		inquirer.prompt([
			{
				name: 'productId',
				type: 'input',
				message: 'What is the product ID of the item you would like to add inventory to?',
				validate: function(value) {
			          if (isNaN(value) === false && value > 0 && value % 1 === 0) {
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
		// changing the inputs to intergers and finding the correct product to update
		.then(function(answer) {
			let chosenId = parseInt(answer.productId);
			let chosenQuantity = parseInt(answer.quantity);
			let chosenProduct;
			for(let i = 0; i < results.length; i++) {
				if (results[i].item_id === chosenId) {
					chosenProduct = results[i];
				}
			}
			// passing the answers to the updats inventory function and notifying the user
			let quantity = chosenQuantity + chosenProduct.stock_quantity
			updateInv(quantity, chosenProduct.item_id);
			console.log('Inventory Updated!');
			displayManagerOptions();
		});
	});
};

// function to update the stock quantity of the item in the database
updateInv = (quantity, item_id) => {
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

// prompts the user all the questions to add a product
addProduct = () => {
	inquirer
		.prompt([
			{
				type: 'input',
				name: 'product',
				message: 'What is the product name?'
			},
			{
				type: 'input',
				name: 'department',
				message: 'What department does the product belong to?'
			},
			{
				type: 'input',
				name: 'price',
				message: 'What is the price of the product?',
				validate: function(value) {
          			if (isNaN(value) === false) {
            			return true;
          			}
          			console.log('Please input a valid number.');
          			return false;
        		}
			},
			{
				type: 'input',
				name: 'quantity',
				message: 'Product quantity?',
				validate: function(value) {
          			if (isNaN(value) === false) {
            			return true;
          			}
          			console.log('Please input a valid number.');
          			return false;
        		}
			}
		])
		// the answers are validated and then sent to the database
		.then(function(response) {
			connection.query(
				'INSERT INTO products SET ?',
				{
					product_name: response.product,
					department_name: response.department,
					price: response.price,
					stock_quantity: response.quantity
				},
				function(err) {
					if (err) throw err;
					console.log('Your product was successfully added!');
					displayManagerOptions();
				})
		})
};