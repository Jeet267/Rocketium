const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const DATA_FILE = path.join(__dirname, "../data/dummy.json");

// Get all data

router.get("/", (req, res) => {
  console.log("hello")
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
    console.log(data);
    console.log("coming",res)
    return res.status(200).send(data);
  } catch (error) {

    console.log(error)
    if (error.code === "ENOENT") {
      res.status(404).json({ error: "Data file not found" });
    } else {
      console.error("File access error:", error.message);
      res.status(500).json({ error: "Failed to read data" });
    }
  }
});

// Filter and sort data
router.get("/filter", (req, res) => {
  try {
    const { userId, sortBy } = req.query;
    console.log(sortBy);
    console.log(userId);

    let data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));

    if (userId) {
      data = data.filter((item) => item.id === userId);
      console.log(data);
    }
    

    // Sort by specified field
    if (sortBy) {
      data = data.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error filtering or sorting data" });
  }
});

module.exports = router;
