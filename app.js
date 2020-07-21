const express = require("express");
const routers = require("./routes");
const PORT = 3000;
const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded( { extended: false }));

app.use(routers);

app.listen(PORT, ()=>{
    console.log(`APPS berjalan di ${PORT}`);
});