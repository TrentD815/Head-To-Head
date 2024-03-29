const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors')
const port = process.env.PORT ? process.env.PORT : 8080;

app.options('*', cors())
app.use(async function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
})

app.use(express.static(__dirname + '/dist/Head-To-Head'));
app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'/dist/Head-To-Head/src/index.html'));
});

//selectAndScrapeAllPlayers().catch((error) => { if (error) console.log(error) })

app.listen(port);
console.log(`Server listening on port ${port}`)
