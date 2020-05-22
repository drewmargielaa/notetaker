let express = require('express');
let app = express();
let path = require('path');
let PORT = process.env.PORT || 8080;
var fs = require('fs');
app.use(express.static('public'))
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
let dbJson = require("./db/db.json")

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'))
});



app.get('/notes', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/notes.html'))
});



app.get('/api/notes', function (req, res) {
  fs.readFile('./db/db.json', (err, data) => {
    if (err) throw err;
    let finalData = JSON.parse(data)
    res.json(finalData);
  });
});

app.post('/api/notes', function (req, res) {
  const newNote = {
    title: req.body.title ,
      text: req.body.text

  }
  fs.readFile('./db/db.json', (err, data) => {
    if (err) throw err;
    let finalData = JSON.parse(data)
  
    finalData.push(newNote)
    const jsonString = JSON.stringify(finalData)
    fs.writeFile('./db/db.json', jsonString, err => {
      if (err) {
        console.log('Error writing file', err)
      } else {
        console.log('Successfully wrote file')
      }
    })
  });

  
 


 
});

app.delete('./db/db.json/:id', function(req, res) {
  var indexOfCouseInJson = json.map(function(item) { return item.id; }).indexOf(req.params.id); //find the index of :id
    if(indexOfCouseInJson === -1) {
      res.statusCode = 404;
      return res.send('Error 404: No quote found');
    }
  
    var result = json.splice(indexOfCouseInJson,1);
    fs.writeFile(jsonFilePath, JSON.stringify(result), function(err){
     if(err) throw err;
     res.json(true);
   });
  
  });













app.listen(PORT, function () {
  console.log("app listening to port");
});
