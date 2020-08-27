const express = require("express");
const router = express.Router();
const { WithAuth, isAdmin } = require("../../app/middlewares/auth");
const {
    index,
    show,
    store,
    update,
    destroy,
} = require("../../app/controllers/videoController");

router.get("/", WithAuth, index);
router.get("/:id", WithAuth, show);
router.post("/", isAdmin, store);
router.put("/:id", isAdmin, update);
router.delete("/:id", isAdmin, destroy);

module.exports = router;
