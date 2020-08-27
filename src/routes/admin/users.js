const express = require("express");
const router = express.Router();
const { isAdmin, WithAuth } = require("../../app/middlewares/auth");
const {
    index,
    show,
    update,
    destroy,
} = require("../../app/controllers/userController");

router.get("/", WithAuth, index);
router.get("/:id", WithAuth, show);
router.put("/:id", isAdmin, update);
router.delete("/:id", isAdmin, destroy);

module.exports = router;
