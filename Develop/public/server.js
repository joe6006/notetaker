
const express = require("express");
const fs = require("fs");
const notes = require("../db/db.json");
const path = require("path");
const uuid = require("uuid");
const app = express();
var PORT = process.env.PORT || 3006;




app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));



app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../db/db.json"))
});


// add notes
app.post("/api/notes", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("../db/db.json"));
    const newNotes = req.body;

    newNotes.id = uuid.v4();
    notes.push(newNotes);

    fs.writeFileSync("../db/db.json", JSON.stringify(notes))
    res.json(notes);
});


//HTML calls
app.get("./", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("./notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});


app.listen(PORT, function () {
    console.log("listening on port: " + PORT);
});