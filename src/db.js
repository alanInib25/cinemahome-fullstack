const { connect } = require("mongoose");
const { URL_DB_CONN } = require("./utils/handleConfig.js");
(() => connect(URL_DB_CONN, console.log("connected DB")))();
