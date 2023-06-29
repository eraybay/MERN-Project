const express = require("express");
const {
  getEventsUser,
  createEvent,
  getEventById,
  UpdateEvent,
  deleteEvent,
  getEventsWithoutAuth,
  getEventsOrganizer,
  enrollUser,
} = require("../controllers/eventControllers");
const protectOrganizer = require("../middlewares/authMiddlewareOrganizer");
const protectUser = require("../middlewares/authMiddlewareUser");

const router = express.Router();

router.route("/").get(getEventsWithoutAuth);

router.route("/events-organizer").get(protectOrganizer, getEventsOrganizer);
router.route("/events-users").get(protectUser, getEventsUser);

router.route("/create").post(protectOrganizer, createEvent);

router
  .route("/:id")
  .get(getEventById)
  .put(protectOrganizer, UpdateEvent)
  .delete(protectOrganizer, deleteEvent);
//creating seperate routes for api in order to prevent malicius interventions from user profile in the case where user tries to
//conduct a post request thorugh same route
router.route("/:id/enroll").post(protectUser, enrollUser);

module.exports = router;
