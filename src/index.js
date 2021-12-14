require("dotenv").config();
const app = require("./app.js");
const { PORT } = process.env;

app.listen(PORT, () => `Server running on port ${PORT}`);
