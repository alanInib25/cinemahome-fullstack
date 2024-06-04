const http = require("http");
const app = require("./app.js");
const { PORT } = require("./utils/handleConfig.js");

http
.createServer(app)
.listen(PORT, () => {
  console.log(`listen on port ${PORT}`);
  require("./db.js");
});
