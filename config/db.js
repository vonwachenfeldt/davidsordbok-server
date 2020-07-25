const mongoose = require("mongoose");

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.ORDBOKMONGOURI, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    })

    global.connections.davidsOrdbok = conn;

    console.log("ORDBOK connected");
}

module.exports = connectDB;