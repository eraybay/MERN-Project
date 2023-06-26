const Event = require("../models/eventModel");
const asyncHandler = require("express-async-handler");

const getEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({ user: req.user._id });
  res.json(events);
});

const createEvent = asyncHandler(async (req, res) => {
  const { eventName, description, ageRange, deadline, category } = req.body;

  if (!eventName || !description || !ageRange || !deadline || !category) {
    res.status(400);
    throw new Error("Please fill the all fields");
  } else {
    const event = new Event({
      user: req.user._id,
      eventName,
      description,
      ageRange,
      deadline,
      category,
    });

    const createdEvent = await event.save();

    res.status(201).json(createdEvent);
  }
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
    if (event.user.toString() !== req.user._id.toString()) {
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
  getEvents,
  createEvent,
  getEventById,
  UpdateEvent,
  deleteEvent,
};
