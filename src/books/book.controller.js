const Book = require('./book.model.js');

const getAllBooks=async (req,res)=>{
    try {
        const books=await Book.find({}).sort({createdAt:-1});
        res.status(200).send(books)
    } catch (error) {
        console.log("Error in getAllBooks controller",error.message);
        res.status(500).send({message:'Failed to fetch books'})
    }
};

const postABook =async(req,res)=>{
    try {
        const newBook=new Book(req.body);
        await newBook.save();
        res.status(200).send({message:"Book posted successfully",book : newBook})
        
    } catch (error) {
        console.log("Error in postABook controller",error.message);
        res.status(500).send({message:'Failed to create book'})
    }
}

const getSingleBook= async(req,res)=>{
    try {
        const book= await Book.findById(req.params.id);
        if (!book){
            return res.status(404).send({message: "Book not Found!"})
        }
        res.status(200).send(book)
    } catch (error) {
        console.log("Error in getSingleBook controller",error.message);
        res.status(500).send({message:'Failed to fetch book'})
    }
}

const UpdateBook= async(req,res)=>{
    try {
        const updatedBook=await Book.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!updatedBook) {
            return res.status(404).send({message: "Book is not Found!"})
        }
        res.status(200).send({
            message: "Book updated successfully",
            book: updatedBook
        })
    } catch (error) {
        console.log("Error in UpdateBook controller",error.message);
        res.status(500).send({message:'Failed to update book'})
    }
}

const deleteBook= async(req,res)=>{
    try {
        const deletedBook=await Book.findByIdAndDelete(req.params.id);
        if(!deletedBook) {
            return res.status(404).send({message: "Book is not Found!"})
        }
        res.status(200).send({
            message: "Book deleted successfully",
            book: deletedBook
        })
    } catch (error) {
        console.log("Error in deleteBook controller",error.message);
        res.status(500).send({message:'Failed to delete book'})
    }
}
const getBookByName = async (req,res)=>{
    try{
        const {bookname} = req.params;
        const book = await Book.findOne({title:bookname})
        if (!book) {
            return res.status(200).json(null);
        }
        return res.status(200).json(book)
    }
    catch(error){
        console.log("Error in deleteBook controller",error.message);
        res.status(500).send({message:'Failed to get book through title'})
    }
}
module.exports={
    getAllBooks,
    postABook,
    getSingleBook,
    UpdateBook,
    deleteBook,
    getBookByName
}