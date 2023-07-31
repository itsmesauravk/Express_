const express = require("express")
const router = express.Router()

const {
    getBooks,
    addBook,
    updateBook,
    deleteBook
} = require('./bookFunc')

//here '/' means '/api/books/'
router.route('/').get(getBooks);
router.route('/:id').post(addBook).put(updateBook).put(deleteBook)


module.exports = router
