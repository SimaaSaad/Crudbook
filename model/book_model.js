const mongoose = require("mongoose")
const Booksch = mongoose.Schema({
    title: {type: String, required: true},
    author: { type: String, required: true },
    publYear: { type: Date, required: true },
    nbPages: { type: Number, required: false },
    language: { type: String, required: true },
    isAvailable: { type: Boolean, required: true },
    genres: [{ type: String, required: false }],

    })

module.exports=mongoose.model("Book",Booksch)