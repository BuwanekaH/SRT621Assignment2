const mongoose = require("mongoose"),
    bookSchema = mongoose.Schema({
        authorname: String,
        link: String,
        bookname: String,
        number: Number,
    });
module.exports = mongoose.model("Book", bookSchema);
