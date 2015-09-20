var express = require('express'), router = express.Router()

router.use("/api",require("./fieldsRouter"))

module.exports = router