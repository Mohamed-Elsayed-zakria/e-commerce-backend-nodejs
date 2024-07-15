const mongoose = require("mongoose");

const connectDB = async () => {
    mongoose
        .connect(process.env.DATABASE)
        .then((connect) => {
            console.log(
                `DB connected successfully \nhost -> ${connect.connection.host}`
            );
        })
}

module.exports = connectDB