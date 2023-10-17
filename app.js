const express = require("express");
const app = express();
app.use(express.json());

const Book = require("./model/book_model");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb+srv://saadsimaa:yaALLAH2012@clusterprojet.8zfng31.mongodb.net/tasks", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

// creer livre (POST)
app.post("/api/book", (req, res) => {
  const book = new Book(req.body);
  book
    .save()
    .then(() =>
      res.status(201).json({
        model: book,
        message: "Created!",
      })
    )
    .catch((error) => {
      res.status(400).json({
        error: error.message,
        message: "Les données sont invalides",
      });
    });
});



//---Get livre --

app.get("/api/books", (req, res) => {
    Book.find()
      .then((books) =>
        res.status(200).json({
          model: books,
          message: "success",
        })
      )
  
      .catch((error) => {
        res.status(400).json({
          error: error.message,
          message: "probleme d'extraction",
        });
      });
  });


//---Get By ID ---
  app.get("/api/book/:id",(req,res)=>{
    Book.findOne({_id:req.params.id})
    .then((books) => {
      if(!books){
        res.status(404).json({
          message:"livre npon trouve"
        })
        return
      }
  
     res.status(200).json({
      model: books,
      message:"objet trouve"
     })
   })
   .catch((error) => {
   
     res.status(400).json({
       error:error.message,
       message:"probleme ",
     });
   });
  })


//---Patch ----

app.patch("/api/book/:id", (req, res) => {
    Book.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then((book) => {
        if (!book) {
          res.status(404).json({
            message: "Book not found ",
          });
          return;
        }
        res.status(200).json({
          model: book,
          message: "Book updated",
        });
      })
      .catch((error) =>
        res.status(400).json({
          error: error.message,
          message: "book not correct",
        })
      );
  });
  

//---Delete Book ----

app.delete("/api/book/:id", (req, res) => {
    Book.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: "Book  deleted" }))
      .catch((error) => {
        res.status(400).json({
          error: error.message,
          message: "Id book not correct ",
        });
      });
  });

  module.exports = app;
   
/* exemple
{
  "title": "Dune",
  "author": "Frank Herbert",
  "publYear": "1965-06-01",
  "nbPages": 412,
  "language": "Anglais",
  "isAvailable": true,
  "genres": ["Science-Fiction", "Aventure"]
  
} */