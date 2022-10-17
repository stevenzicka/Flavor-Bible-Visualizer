// Express
const express = require('express');   
const app     = express();           

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));

PORT        = process.env.PORT || 8080;             

app.get('/', function(req, res) {
    res.sendFile('/public/index.html', {root: __dirname })
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});