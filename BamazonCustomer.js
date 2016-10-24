var mysql = require('mysql');
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

connection.query('SELECT * FROM products', function(err,rows){
	// console.log(rows.products);
	var choiceArray = [];
                for (var i = 0; i < rows.length; i++) {
                    choiceArray.push(rows[i].ProductName);
                }
                console.log(choiceArray)
});

connection.end();