var mysql = require('mysql');
var inquirer = require('inquirer');
var prompt = require("prompt");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", 
    password: "Wo@3", 
    database: "bamazondb"
})

var buying = function(){

    connection.query("SELECT * FROM products", function(err, result) {
        return (table(result));
      
      });

    setTimeout(function() {
        prompt.get(['Itemid', 'StockQuantity'], function (err, result) {
            var shopperItem = result.Itemid;
            var shopperQuantity =result.StockQuantity;

            inventoryCheck(shopperItem, shopperQuantity);
            setTimeout(function() {buying();}, 3500);

        });
    }, 750);
}



var inventoryCheck = function (id, quantity){
    connection.query('SELECT * FROM products WHERE Itemid = ' + id, function (err, result){
        if (err) throw err;

        var total = result[0].Price * quantity;

        var inventory = result[0].StockQuantity - quantity;

        if (inventory < 0){
            console.log('Insufficient stock. There are only '+ result[0].StockQuantity + 'item(s) left.');
        } else {
            console.log('There are ' + inventory + ' ' + result[0].ProductName + ' remaining.')
            databaseUpdate(id, inventory)
        }
    });
}



var databaseUpdate = function(id, quantity){
    connection.query('update products set StockQuantity = ' + quantity + ' where ItemID = ' + id, function(err, result) {
        if (err) throw err;
    });
}

 

function table(items){
    for (var i = 0; i < items.length; i++) {
        console.log('------------------------');
        console.log('ItemID: ' + items[i].Itemid);
        console.log('Item: ' + items[i].ProductName);
        console.log('Department: ' + items[i].DepartmentName);
        console.log('Price: $' + items[i].Price);
    }
    console.log('------------------------');
}



connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err);
        return;
    }
});


buying();