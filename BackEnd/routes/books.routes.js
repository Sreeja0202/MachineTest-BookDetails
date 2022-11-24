const express = require("express");
const cors = require("cors");
const bookrouter = express.Router();
const Book = require("../models/books.model.js");
const objectId = require("mongoose").Types.ObjectId;

const app = express();

app.use(express.json());
app.use(cors());

// post
bookrouter.post("/", (req, res) => {
  let book = new Book({
    bookId: req.body.bookId,
    bookName: req.body.bookName,
    authorName: req.body.authorName,
    publishedYear: req.body.publishedYear,
    bookPrice: req.body.bookPrice,
    bookStatus: req.body.bookStatus,
  });
  book.save((err, doc) => {
    if (err) {
      console.log("Error in posting data", err);
    } else {
      res.send(doc);
    }
  });
});

// get
bookrouter.get("/", (req, res) => {
  Book.find((err, doc) => {
    if (err) {
      console.log("Error in getting data", err);
    } else {
      res.send(doc);
    }
  });
});

// getting book by id
bookrouter.get("/:id", (req, res) => {
  if (objectId.isValid(req.params.id)) {
    Book.findById(req.params.id, (err, doc) => {
      if (err) {
        console.log("Error in getting data by id", err);
      } else {
        res.send(doc);
      }
    });
  } else {
    return res.status(400).send(`No book found with id ${req.params.id}`);
  }
});

// updating a book
bookrouter.put("/:id", (req, res) => {
  if (objectId.isValid(req.params.id)) {
    let book = {
      bookId: req.body.bookId,
      bookName: req.body.bookName,
      authorName: req.body.authorName,
      publishedYear: req.body.publishedYear,
      bookPrice: req.body.bookPrice,
      bookStatus: req.body.bookStatus,
    };
    Book.findByIdAndUpdate(
      req.params.id,
      { $set: book },
      { new: true },
      (err, doc) => {
        if (err) {
          console.log("Error in Updating data by id", err);
        } else {
          res.send(doc);
        }
      }
    );
  } else {
    return res.status(400).send(`No book found with id ${req.params.id}`);
  }
});

// delete
bookrouter.delete("/:id", (req, res) => {
  if (objectId.isValid(req.params.id)) {
    Book.findByIdAndRemove(req.params.id, (err, doc) => {
      if (err) {
        console.log("Error in Deleting data by id", err);
      } else {
        res.send(doc);
      }
    });
  } else {
    return res.status(400).send(`No book found with id ${req.params.id}`);
  }
});

module.exports = bookrouter;
