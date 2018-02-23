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

// Displays all products on the database
displayProducts = () => {
	connection.query('SELECT * FROM products', function(err, results) {
		if (err) throw err;
		// console.log(results);
		console.log('------------------------------');
		console.log('      Available Products');
		console.log('------------------------------');
		console.log('');

		for (let i = 0; i < results.length; i++) {
			let row = results[i];
			console.log(`${row.product_name} \n Price: $${row.price} \n Product ID: ${row.item_id} \n`);
		};
		startPurchase();
	});
};

// prompts for the user to select their product, validating each response to make sure it is in the correct format
startPurchase = () => {
	connection.query("SELECT * FROM products", function(err, results) {
		if (err) throw err;

		inquirer.prompt([
			{
				name: 'productId',
				type: 'input',
				message: 'What is the product ID of the item you would like to buy?',
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
			// changing the responses to intergers and finding the current stock quantity of the item being purchased
			let chosenId = parseInt(answer.productId);
			let chosenQuantity = parseInt(answer.quantity);
			let chosenProduct;
			for(let i = 0; i < results.length; i++) {
				if (results[i].item_id === chosenId) {
					chosenProduct = results[i];
				}
			}
			// if there is enough stock the user is asked to confirm their purchase
			if (chosenQuantity <= chosenProduct.stock_quantity) {
				let totalPrice = chosenProduct.price * chosenQuantity;
				let totalStock = chosenProduct.stock_quantity - chosenQuantity;
				let productSales = totalPrice + chosenProduct.product_sales;
				inquirer
					.prompt([
						{
							name: 'confirm',
							type: 'confirm',
							message: `You ordered ${chosenQuantity} ${chosenProduct.product_name}(s). Is this correct?`,
							default: true
						},
					])
					// if their order is correct the total is given, the database update function goes through, and the connection is ended
					.then(function(userConfirm) {
						if (userConfirm.confirm) {
							updateProductQuantity(totalStock, chosenProduct.item_id);
							updateProductSales(productSales, chosenProduct.item_id);
							console.log(`Great! Your total is $${totalPrice}`);
							connection.end();
						// if their order is not correct
						} else {
							console.log('***************************');
							console.log('Please try your order again');
							console.log('***************************');
							console.log('');
							displayProducts();
						}
					})
			// if there is not enough stock of the item they want
			} else {
				console.log('**********************');
				console.log('Insufficient quantity!');
				console.log('**********************');
				console.log('');
				displayProducts();
			}
		})
	})
};

// function to update the stock quantity of the item in the database
updateProductQuantity = (stock_quantity, item_id) => {
	connection.query(
		'UPDATE products SET ? WHERE ?',
		[
			{
				stock_quantity: stock_quantity
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

// function to update the product sales of the item in the database
updateProductSales = (product_sales, item_id) => {
	connection.query(
		'UPDATE products SET ? WHERE ?',
		[
			{
				product_sales: product_sales
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