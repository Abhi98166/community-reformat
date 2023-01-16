const express = require("express");
const fs = require('fs');
const {parse} = require('csv-parse');
const converter = require('json-2-csv')
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
    console.log(typeof records);
	console.log(data[0]);
    converter.json2csv(data, (err, csv) => {
        if (err) {
            throw err;
        }
        fs.writeFileSync(__dirname+'/csv/final-data.csv', csv)
    });
});
fs.createReadStream(__dirname+'/csv/data.csv').pipe(parser);



const app = express();

app.get("/",function(req,res){

});

app.listen(3000,function(){
    console.log("Listening on port 3000");
});