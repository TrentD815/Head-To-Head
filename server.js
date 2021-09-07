const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT ? process.env.PORT : 8080;

app.use(express.static(__dirname + '/dist/Head-To-Head'));
app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/Head-To-Head/src/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(port);
console.log(`Server listening on port ${port}`)