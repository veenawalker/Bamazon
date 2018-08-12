require('console.table');
var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Ukulele1*",
  database: "BamazonDB"
});
// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);

  // run the start function after the connection is made to prompt the user
  // start();


  // query the database for all items being auctioned

  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
});


// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt([{
        name: "purchase",
        type: "input",
        message: "Type in the id number of the product that you want to purchase?",
      },
      {
        name: "quantity",
        type: "input",
        message: "How many would you like to purchase?",
      }
    ])
    .then(function (answer) {
      // based on their answer, either call the bid or the post functions
      var buyerID = answer.purchase;
      var buyerQuantity = answer.quantity;

      console.log(buyerID, buyerQuantity)

      // query your database 'SELECT * FROM products WHERE id = buyerID
      connection.query("SELECT * FROM products WHERE id =" + buyerID, function (err, res) {

       
       console.log(res,"Here is the res");
       console.log(buyerQuantity, 'buyer qty')
       console.log(res[0].stock_quanity,"Here is the quantity");

       if (buyerQuantity <= res[0].stock_quanity){
           console.log('inside if else')
        connection.query(`UPDATE products SET stock_quanity = stock_quanity - ${buyerQuantity} WHERE id =${buyerID}`, function (err, res) {
            console.log(res)
                })
       }  else {
           console.log("Not enough product, try a different amount");
          
       }
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
      })

      start();
   
           // if 
        // connection.query('update') 
    }
        //connection.query(
//             "UPDATE auctions SET ? WHERE ?", [{
//                 highest_bid: answer.bid
//               },
        // UPDATE, new stock quantity = original stock quantity - buyerQuantity
        // else console.log("Insufficient quantity")
  
      )}
    )}
