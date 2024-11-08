const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5001;
const cors = require('cors');


app.use(cors());

app.get("/api/group", (req, res) => {
  
  const dataPath = path.join(__dirname, "src/data/group.json");


  

  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading JSON file");
    }
    res.json(JSON.parse(data)); 
  });
});

app.get("/api/appointment", (req, res) => {
  
  const dataPath = path.join(__dirname, "src/data/appointment.json");



  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Error reading JSON file");
    }
    res.json(JSON.parse(data)); 
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
