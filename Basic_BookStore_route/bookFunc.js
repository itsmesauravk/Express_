const {books} = require('./books')

const getBooks = (req,res)=>{
    res.status(200).json({sucess:true,data:books})
}

const addBook = (req,res)=>{
    const{id}= req.params
    const {name} = req.body;
    console.log(req.body)
    //if user doesnot provide the name 
    if (!name){
        res.status(400).json({sucess:false,message:"Enter the value for name."})
    }
    //if all goes correct >> displays all data with the new one
    res.status(200).json({sucess:true,book:[...books,id,name]})
}

const updateBook = (req,res)=>{
    const {id} = req.params  //id that is entred in rout parms
    const {name} = req.body  //book name that is inputed
    const book = books.find((book)=>book.id === Number(id));  //to check weather the entred id exists in books or not
    //if not found 
    if(!book){
        res.status(400)
        .json({sucess:false,output:`No data found at Id :${id}`})
    }
    //if found updating old name with new one in new array updatedBook
    const updatedBook = books.map((book)=>{
        if(book.id === Number(id)){   //if entred id == to book id present in books then update
            book.name = name
        }
        return book
    })
    res.status(200).json({sucess:true,result:updatedBook})
}

const deleteBook = (req,res)=>{
    const {id} = req.params;
    const  book = books.map((book)=> book.id === Number(id))  //check weather the entred id exist in data or not
    if(!book){
        res.status(404)
        .json({sucess:false,result:`Entred id no: ${id} not found.`})
    }
    //if exists remove that id data and display the left ones
    const deletedBook = books.filter((book)=>  
        book.id !== Number(id)
    )
    res.status(200).json({sucess:true,deletedBook})
}

module.exports = {
    getBooks,
    addBook,
    updateBook,
    deleteBook
}