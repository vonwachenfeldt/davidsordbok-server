const Word = require("../modules/Word");

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const words = await Word.find().sort({ createdAt: -1 });

    res.json({ success: true, data: words }); //res.json ~= res.send
});

router.post("/", async (req, res) => {
    try {
        var data = req.body;
        
        var wordFormatted = capitalize(data.word);
        var wordLowercase = data.word.toLowerCase();
        var wordType = capitalize(data.type);
        var wordDefinition = capitalize(data.definition);
        var exampleSentence = capitalize(data.exampleSentence);
        var readMore = data.readMore;

        wordFormatted = wordFormatted.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        wordLowercase = wordLowercase.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        wordType = wordType.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        wordDefinition = wordDefinition.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        exampleSentence = exampleSentence.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        readMore = readMore.replace(/javascript:/g, '');

        const word = await Word.create({

            name: wordFormatted,
            nameLowercase: wordLowercase,
            type: wordType,
            definition: wordDefinition,
            exampleSentence: exampleSentence,
            readMore: readMore,

        })

        console.log("Word added", wordFormatted);
        res.json({
            success: true,
            data: word
        });
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            error: error.errmsg || errorToJson(error).message
        })
    }
});

const capitalize = string => string[0].toUpperCase() + string.slice(1);

// Convert the error to JSON
const errorToJson = error => JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error)));

module.exports = router;