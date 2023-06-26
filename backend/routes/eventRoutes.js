const express = require("express");
const {
  getEvents,
  createEvent,
  getEventById,
  UpdateEvent,
  deleteEvent,
} = require("../controllers/eventControllers");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getEvents);
router.route("/create").post(protect, createEvent);
router
  .route("/:id")
  .get(getEventById)
  .put(protect, UpdateEvent)
  .delete(protect, deleteEvent);

module.exports = router;
