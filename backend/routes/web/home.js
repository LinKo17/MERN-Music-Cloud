const express = require("express");
const router = express.Router();
const path = require("path");

router.route("/").get((req, res) => {

  const contentType = req.get("Content-Type");
  console.log(contentType)
  if (contentType == "application/json") {
    res.status(200).json({'message': "Music Cloud"});
  } else if (contentType == "text/plain" || contentType == "text/xml") {
    res.status(200).send("Cloud Music");
  } else {
    res.status(200).sendFile(path.join(__dirname, "..","..","views", "index.html"));
  }

});

module.exports = router;
