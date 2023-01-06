const Book = require("../model/book");
const { validationResult } = require("express-validator");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/img"));
  },
  filename: function (req, file, cb) {
    cb(null, `book-${Date.now()}-cover${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
});

exports.uploadImage = upload.single("img");

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.getAllbooks = (req, res)=>{

    Book.find().exec((err,books)=>{
    
        if(err || !books){
    
            return res.status(400).json({error:"No books found"})
    
        }
    
        return res.status(200).json(books)
    
    })
    }


/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.getBook = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "error",
        message: errors.array()[0].msg,
      });
    }
    const book = await Book.findById(req.params.id).populate("authors");
    if (!book) {
      res.status(404).json({
        status: "error",
        message: "Book with this ID does not exist",
      });
    }
    res.status(200).json({
      status: "success",
      book,
    });
  } catch (err) {
    //TODO
  }
};

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.createBook= async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          status: "error",
          message: errors.array()[0].msg,
        });    }
      const book = await Book.create(req.body);
    //   const token = getToken(user._id);
      res.status(201).json({
        status: "success",
        // token,
        book,
      });
    } catch (err) {
      res.json({
        err: "error"
      })
    }
    
  };

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.updateBook = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "error",
        message: errors.array()[0].msg,
      });
    }
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      populate: "authors",
    });
    if (!book) {
      res.status(404).json({
        status: "error",
        message: "Book with this ID does not exist",
      });
    }
    res.status(200).json({
      status: "success",
      book,
    });
  } catch (err) {
    //TODO
  }
};

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
exports.deleteBook = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: "error",
        message: errors.array()[0].msg,
      });
    }
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      res.status(404).json({
        status: "error",
        message: "Book with this ID does not exist",
      });
    }
    res.status(204).json({
      status: "success",
      book: null,
    });
  } catch (err) {
    //TODO
  }
};
