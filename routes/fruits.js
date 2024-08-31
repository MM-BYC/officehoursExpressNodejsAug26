const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  console.log("This middleware is running for /fruits routes only.");
  next();
});

router.get("/", (req, res) => {
  res.send("Get fruits");
});

router.get("/:id", (req, res) => {
  res.send(`Get fruit with the ID of ${req.params.id}`);
});

module.exports = router;
