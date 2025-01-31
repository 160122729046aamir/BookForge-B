const express=require('express');
const { getAllBooks, postABook, getSingleBook, UpdateBook, deleteBook, getBookByName} = require('./book.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const router=express.Router();

router.get('/',getAllBooks);
router.post('/create-book',verifyAdminToken,postABook);
router.put('/edit/:id',verifyAdminToken,UpdateBook);
router.get('/:id',getSingleBook);
router.delete('/:id',verifyAdminToken,deleteBook);
router.get('/getbook/:bookname',getBookByName)

module.exports=router;