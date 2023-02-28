const mongoose = require("mongoose");
mongoose.set('strictQuery', false)

async function connect(url, collectionsToDrop) {
    await mongoose.connect(url);
    collectionsToDrop.forEach((collection) => {
        mongoose.connection.dropCollection(collection, () => {
            console.log(`${collection} collection droped`);
        });
    });
    return mongoose
}

module.exports = { connect };