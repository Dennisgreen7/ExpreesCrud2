const express = require("express");
const app = express();

//הגדרות
app.get('/', (req,res) => {
    res.sendFile(__dirname + '\\index.html');
});

//הפעלה

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});