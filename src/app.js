const express = require("express");
const bodyParser = require("body-parser");
const { loadData } = require("../utils/fetchData");
const apiRoutes = require("./routes/api");

const app = express();
const PORT = 3000;

// Middleware

app.use(bodyParser.json());
app.use("/api", apiRoutes);

// Load data on initialization
(async () => {
  await loadData();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})();

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
