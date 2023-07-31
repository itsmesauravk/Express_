const {books} = require('./books')
const express = require('express')
const app = express();

//middlewares
//to parse the data 
app.use(express.json())
//get methode
//displays all the data sotred in books array
app.get('/api/books',(req,res)=>{
    res.status(200).json({sucess:true,data:books})
})

//post
//uplode new data to the books array
app.post('/api/books/:id',(req,res)=>{
    const{id}= req.params
    const {name} = req.body;
    console.log(req.body)
    //if user doesnot provide the name 
    if (!name){
        res.status(400).json({sucess:false,message:"Enter the value for name."})
    }
    //if all goes correct >> displays all data with the new one
    res.status(200).json({sucess:true,book:[...books,id,name]})
})

//put
//to update the existing data
app.put('/api/books/:id',(req,res)=>{
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
})

//delete
//to remove the data from the array
app.delete('/api/books/:id',(req,res)=>{
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
})


app.listen(5000,()=>{
    console.log("Port is listning to 5000" )
})


