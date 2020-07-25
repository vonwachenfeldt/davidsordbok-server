const mongoose = require("mongoose");

const WordSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    nameLowercase: {
        type: String,
        unique: true,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: [/* English */ "Adjective", "Noun", "Verb", /* Swedish */ "Adjektiv", "Substantiv"]
    },
    definition: {
        type: String,
        unique: true,
    },
    exampleSentence: {
        type: String,
    },
    readMore: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = connections.davidsOrdbok.model("Word", WordSchema);