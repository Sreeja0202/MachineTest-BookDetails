const mongoose = require("mongoose");
const Book = mongoose.model("book", {
  bookId: {
    type: String,
  },
  bookName: {
    type: String,
  },
  authorName: {
    type: String,
  },
  publishedYear: {
    type: Number,
  },
  bookPrice: {
    type: Number,
  },
  bookStatus: {
    type: Boolean,
  },
});

module.exports = Book;
