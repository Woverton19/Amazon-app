var mysql = require('mysql');
var inquirer = require('inquirer');
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

connection.query('SELECT * FROM products', function(err,res){
	// console.log(res);
	
                for (var i = 0; i < res.length; i++) {
                    console.log("\nProduct ID:" + res[i].Itemid + "\nProduct Name:" + res[i].ProductName + "\nDepartment Name:" + res[i].DepartmentName + "\nPrice:" + res[i].Price + "\nStock Quantity:" + res[i].StockQuantity);
                }
               
});
// connection.end();
inquirer.prompt([{
	name: "idnumber",
        type: "input",
        message: "What Product would you like to buy? ",
        validate: function(value) {
            if (isNaN(value) == false) {
                return true;
            } else {
                return false;
            }
        }
    // }, {
    //     name: "end",
    //     type: "input",
    //     message: "How many would you like to order?",
    //     validate: function(value) {
    //         if (isNaN(value) == false) {
    //             return true;
    //         } else {
    //             return false;
    //         }
    //     }

}]).then(function(answer) {
        var query = 'SELECT ProductName,DepartmentName,Price,StockQuantity FROM Products WHERE Itemid ?';
        connection.query(query, [answer.idnumber], function(err, res) {
            for (var i = 0; i < res.length; i++) {
            	console.log("\n****************************************************************************************");
                console.log("\nProduct ID:" + res[i].Itemid + "\nProduct Name:" + res[i].ProductName + "\nDepartment Name:" + res[i].DepartmentName + "\nPrice:" + res[i].Price + "\nStock Quantity:" + res[i].StockQuantity);
            	console.log("\n****************************************************************************************");
            }
        })
        connection.end();
    });



connection.end();