var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const multer = require("multer");
const connectDB = require("./db");
const cors = require("cors");
connectDB();
var ImageModel = require("./model/images.model");
app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/uploads"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    console.log("req.body::", req.body);
    console.log("file::", file);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  res.send("Hello Praveen");
});

app.post("/uploadUser", upload.single("profilePic"), (req, res) => {
  console.log(req.body);
  console.log(req.file);

  var newImage = new ImageModel({
    imageUrl: req.file.filename,
    filename: req.file.filename,
  });
  newImage.save();
  res.send("cheddam upload cheddam");
});

app.get("/images", (req, res) => {
  ImageModel.find().then((images) => {
    res.send(images);
  });
});

app.listen(3600, () => {
  console.log("server 3600 port lo vintundi");
});
