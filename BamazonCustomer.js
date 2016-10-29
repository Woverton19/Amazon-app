var mysql = require('mysql');
var prompt = require("prompt");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: "Wo@3", //Your password
    database: "bamazondb"
})

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
})

function display(){ 
    connection.query('SELECT * FROM products', function(err,res) {
	    for (var i = 0; i < res.length; i++) {
            
            console.log("\nProduct ID:" + res[i].Itemid);
            console.log("\nProduct Name:" + res[i].ProductName);
            console.log("\nDepartment Name:" + res[i].DepartmentName);
            console.log("\nPrice:" + res[i].Price);
            console.log("\nStock Quantity:" + res[i].StockQuantity);
            console.log("\n*******************************");
        }

        buying();
    });
}
function buying(err, result) {
        prompt.get(['Itemid', 'StockQuantity'], function (err, result) {
            var shopperItem = result.Itemid;
            var shopperQuantity = result.StockQuantity;
            inventChecker(shopperItem, shopperQuantity);
            
        });
    };

function updateDatabase (id, quantity){
    connection.query('update products set StockQuantity = ' + quantity + ' where Itemid = ' + id, function(err, result) {
        if (err) throw err;
    });
    display();
}

function inventChecker (id, quantity){
    connection.query('SELECT * FROM products WHERE Itemid = ' + id, function (err, result){
        if (err) throw err;

        var inventory = result[0].StockQuantity;

        if (inventory < 0){
            console.log('Insufficient stock. please pick another item?');
        } else {
            console.log('User has bought ' + quantity + ' ' + result[0].ProductName);
            updateDatabase(id, inventory);
        }
    });
    display();
}


display();


