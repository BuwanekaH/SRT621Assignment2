const mongoose = require('mongoose');
const express =require("express");
const control = require('./controllers/controller');
const port = 3000;
const ejs = require("express-handlebars");
const app = express();
require("dotenv").config();
const methodOverride = require("method-override");
const bodyParser = require("body-parser")

const uri = process.env.ATLAS_URI;
console.log(uri);
mongoose.connect(uri, {useUnifiedTopology: true}).then(() => console.log('successfully connected DB'));
mongoose.connection.on('error', (error) => console.log(`Error connecting: ${error.message}`));
    app.engine('.ejs', ejs.engine({defaultLayout: 'styles', extname: '.ejs',}));
    app.set('view engine', '.ejs');
    app.set("port", process.env.PORT || 3000);

    app.use(bodyParser.urlencoded({limit:'10mb', extended:false}))
    app.use(methodOverride("_method", {methods: ["POST", "GET"]}));
    


    app.use(express.static("./public"));
    app.get("/home", control.Allbooks);
    app.get("/books/:number", control.SingleBooks);
    app.get("/books/", control.SingleBooks);
    app.get("/addbook", control.Addbook);
    app.get("/delbook", control.Deletebook);
    app.post("/create", control.create, control.redirectView);
    app.delete("/book/:bookname/delete", control.deleteelement, control.redirectView);


    app.listen(app.get("port"), () => {
        console.log(`The Server is running at http://localhost:${app.get("port")}/home`);
        });
    


