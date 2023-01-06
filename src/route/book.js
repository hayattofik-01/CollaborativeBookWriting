const express = require("express");
const bookController = require("../controller/book");
const bookValidation = require("../middleware/validation/book");
const { verifyUser } = require("../middleware/auth");

const router = express.Router();

/**
 * Routes for handling
 *  - Get All Books
 *  - Create Book
 */
// router
//   .route("/")
//   .get( bookController.getAllBooks)
//   .post(

//     bookValidation.validate("CREATE"),
//     bookController.createBook
//   );
router.get('/',bookController.getAllbooks)
router.post('/create',bookController.createBook)
/**
 * Routes for handling
 *  - Get Single Book
 *  - Update Book
 *  - Delete Book
 */
router
  .route("/:id")
  .get(bookValidation.validate("GET"), bookController.getBook)
  .patch(
    verifyUser,
    bookValidation.validate("UPDATE"),
    bookController.updateBook
  )
  .delete(
  
    bookValidation.validate("DELETE"),
    bookController.deleteBook
  );

module.exports = router;
