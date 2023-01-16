const express = require("express");
const fs = require('fs');
var {parse} = require('csv-parse');
var {stringify} = require('csv-stringify');
var data;
var parser = parse({columns: true,delimiter : '|'}, function (err, records) {
    data = records;
    for(const row in data){
        data[row]['ItemCategory'] = data[row].contentCategory;
        data[row]['ItemName'] = data[row].contentTitle;
        data[row]['ItemOwner'] = data[row].ContentCreatedBy;
        data[row]['ItemType'] = 'content';
        data[row]['ItemTags'] = data[row].contentTags;
    }
	console.log(data[0]);
});
fs.createReadStream(__dirname+'/csv/data.csv').pipe(parser);

/*stringify([data], {
    header: true,
}, function (err, output) {
    console.log(err);
    fs.writeFile(__dirname+'/csv/someData.csv', output);
});*/

const app = express();

app.get("/",function(req,res){

});

app.listen(3000,function(){
    console.log("Listening on port 3000");
});