var mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://praveen:hello123@cluster0.l8nf5yw.mongodb.net/twb2?appName=Cluster0",
    )
    .then(() => {
      console.log("Connected");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = connectDB;
