const axios = require("axios");
const fs = require("fs");
const path = require("path");

const DUMMY_JSON_URL = "https://microsoftedge.github.io/Demos/json-dummy-data/256KB.json"; // Replace with the provided dummy JSON URL
const DATA_FILE = path.join(__dirname, "../src/data/dummy.json");

async function fetchData() {
  try {
    const response = await axios.get(DUMMY_JSON_URL);
    fs.writeFileSync(DATA_FILE, JSON.stringify(response.data, null, 2));
    console.log("Dummy data fetched and stored successfully!");
  } catch (error) {
    console.error("Error fetching dummy data:", error.message);
  }
}

async function loadData() {
  if (!fs.existsSync(DATA_FILE)) {
    console.log("Dummy data not found, fetching...");
    await fetchData(); // Wait for fetchData to complete
  } else {
    console.log("Dummy data already exists.");
  }
}


module.exports = { fetchData, loadData };
