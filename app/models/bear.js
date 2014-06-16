var fs = require('fs');
var path = require('path');
var PGPASS_FILE = path.join(__dirname, "../../../Express4/.pgpass");

var pgtokens = fs.readFileSync(PGPASS_FILE).toString().trimRight().split(":");
var host = pgtokens[2];
var port = pgtokens[3];
var dbname = pgtokens[4];
var user = pgtokens[0];
var password = pgtokens[1];

var pg = require('pg.js');
var Sequelize =  require('sequelize');
var sequelize = new Sequelize(dbname, user, password,{
      dialectModulePath:"pg.js",
      dialect: "postgres",
      port: 5432
    });

var bear = sequelize.define('bear',{
	name: Sequelize.STRING
})

sequelize
	.sync({force:true})
	.complete(function (err) {
		if (!!err) {
			console.log('An error occurred while creating the table ', err);
		} else {
			console.log('Connection to database worked!');
		}
	})

module.export = bear