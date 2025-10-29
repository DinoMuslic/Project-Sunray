require("dotenv").config();

const app = require("./src/app");
const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});