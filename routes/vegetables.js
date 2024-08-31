const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  console.log("This middleware is running for /vegetables routes only.");
  next();
});

/*-- General Rule: middleware written above this line ------*/

router.get("/", (req, res) => {
  res.send("Get vegetables");
});

router.get("/:id", (req, res) => {
  res.send(`Get vegetable with the ID of ${req.params.id}`);
});

module.exports = router;
