const Event = require("../models/eventModel");
const asyncHandler = require("express-async-handler");
const currentDate = new Date();

const getEventsUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const userEvents = await Event.find({ enrolledUsers: userId });
  res.json(userEvents);
});
const getEventsOrganizer = asyncHandler(async (req, res) => {
  const events = await Event.find({ organizer: req.organizer._id });
  res.json(events);
});
const getEventsWithoutAuth = asyncHandler(async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

const createEvent = asyncHandler(async (req, res) => {
  const {
    eventName,
    description,
    ageRangeFirstInt,
    ageRangeSecondInt,
    deadline,
    category,
  } = req.body;

  if (
    !eventName ||
    !description ||
    !ageRangeFirstInt ||
    !ageRangeSecondInt ||
    !deadline ||
    !category ||
    !(
      category.social_aid_event ||
      category.academic_event ||
      category.school_based_tournament ||
      category.sport_competition
    )
  ) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }
  if (ageRangeFirstInt >= ageRangeSecondInt) {
    res.status(400);
    throw new Error("Please set out a proper age range");
  }
  if (new Date(deadline) <= currentDate) {
    res.status(400);
    throw new Error("Deadline must be in the future");
  }

  const event = new Event({
    organizer: req.organizer._id,
    eventName,
    description,
    ageRangeFirstInt,
    ageRangeSecondInt,
    deadline,
    category,
    enrolledUsers: [],
  });

  const createdEvent = await event.save();

  res.status(201).json(createdEvent);
});

const enrollUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const eventId = req.params.id;

  const event = await Event.findById(eventId);
  if (!eventId) {
    res.status(404);
    throw new Error("Event couldn't be found");
  }
  if (event.enrolledUsers.includes(userId)) {
    res.status(405);
    throw new Error("You have already enrolled into this event");
  }

  event.enrolledUsers.push(userId);
  await event.save();
  res.json({ message: "Enrollment successful" });
});
const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  try {
    if (event) {
      res.json(event);
    }
  } catch (error) {
    res.status(404).json({ message: "Event not Found" });
  }
});
const UpdateEvent = asyncHandler(async (req, res) => {
  const { eventName, description, ageRange, deadline, category } = req.body;
  const event = await Event.findById(req.params.id);

  if (event.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You cannot perform this action");
  }
  if (event) {
    event.eventName = eventName;
    event.description = description;
    event.ageRange = ageRange;
    event.deadline = deadline;
    event.category = category;

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } else {
    res.status(404);
    throw new Error("Event do not found");
  }
});
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (event) {
    if (event.organizer.toString() !== req.organizer._id.toString()) {
      res.status(401);
      throw new Error("You cannot perform this action");
    }
    await event.deleteOne();
    res.json({ message: "Note Removed" });
  } else {
    res.status(404);
    throw new Error("Event not found");
  }
});

module.exports = {
  getEventsUser,
  createEvent,
  getEventById,
  UpdateEvent,
  deleteEvent,
  getEventsWithoutAuth,
  getEventsOrganizer,
  enrollUser,
};
