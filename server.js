const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT;

app.use(express.static(__dirname + '/dist/head-to-head'));
app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/head-to-head/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(port || 8080);
console.log(`Server listening on port ${port}`)
