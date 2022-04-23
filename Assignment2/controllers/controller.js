const res = require("express/lib/response");
const books = require("../models/books");
const Book = require("../models/books");

exports.Allbooks = (req, res) => {
  Book.find().lean().then((books) => {
    res.render('home', { books });
  }).catch(() => {
  })
};

exports.SingleBooks = (req, res) => {
  Book.findOne({ number: req.params.number }).lean().then((book) => {
    res.render('books', { book: book });
  }).catch(() => {
  })
};
exports.Addbook = (req, res) => {
  res.render("addbook");
};

exports.create = (req, res, next) => {
  let bookParams = {
    bookname: req.body.bookname,
    authorname: req.body.authorname,
    link: req.body.link
  };

  Book.create(bookParams).then(books => {
    res.locals.redirect = "/home";
    res.locals.books = books;
    next();
  })
    .catch(error => {
      console.log(`Error, cannot save book: ${error.message}`);
      next(error);

    });
};

exports.redirectView = (req, res, next) => {
  let redirectPath = res.locals.redirect;
  if (redirectPath) res.redirect(redirectPath);
  else next();
};

exports.Deletebook = (req, res) => {
  Book.find().lean().then((books) => { res.render('delbook', { books }); })
  .catch(() => {
  })
};

exports.deleteelement = (req, res, next) => {
  let bookname = req.params.bookname;
  Book.findOneAndDelete({ bookname:bookname}).then(() => {
    res.locals.redirect = "/home";
    next();
  }).catch(error => {
    console.log(`Error, cannot delete book by name: ${error.message}`);
    next();
  });
}