# bamazon-mysql-app

This is an Amazon-like storefront app that runs through the command line. It is built with javascript, mysql, node, and nmp packages. 

The app will take in orders from customers and deplete stock from the store's inventory. The app will also track product sales across the store's departments and then provide a summary of the departments total profits.

This app can be run from three different files:

```
  * bamazonCustomer.js
  * bamazonManager.js
  * bamazonSupervisor.js
```

--------------------

The video below goes through the entire app:

<iframe width="560" height="315" src="https://www.youtube.com/embed/2-9BzX-y4o8" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

When **bamazonCustomer.js** is run, all of the available products from the database are shown with their names, prices, and id numbers.

The customer is asked to pick the id number of what they would like to buy, and then the quantity. After confirming that their order is correct, the total is shown and the order is completed.

  - This will update the stock quantity in the database.

----------------
  
When **bamazonManager.js** is run, a menu with 5 options will appear.

  1. View Products for Sale
-------------------------------
*  This will show all of the products in the database, including their names, ids, prices, and stock quantities.

2. View Low Inventory
-----------
*  This will show all products in the database that have a stock quantity of less then 5. 
*  If none of the products have a low quantity the user will be prompted.

3. Add to Inventory
-----------------------
* This will allow you to add to the stock quantity of what ever product you choose using their id numbers.

4. Add a New Product
---------------------
* This option will allow the user to add an enitre new product to the database. 
* A series of questions are prompted that will add the name, price, department, and stock quantity to the product table of the database.

5. Exit
-----------
*  This option simply allows the user to exit the app.
*  When selected the connection will end.

-------------------------

Finally, when **bamazonSupervisor.js** is run, a menu of three options will appear.

1. View Product Sales by Department
---------
*  This option will show a table of the departments in the database.
*  Along with the database names, their id, over head costs, total sales, and total profits will also be on the table.
*  This math is only done with the table is created, and is not stored anywhere.

2. Add a Department
----------------
*  Like the add a new product option for the Manager, this allows the user to add a whole new department that will be saved in the database.

3. Exit
--------------
*  Will end the connction and allow the user to exit the app.