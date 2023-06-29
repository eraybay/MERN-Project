const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
  {
    enrolledUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    eventName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Organizer",
    },
    ageRangeFirstInt: {
      type: Number,
      required: true,
    },
    ageRangeSecondInt: {
      type: Number,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    //passing out category as an object
    category: {
      social_aid_event: {
        type: Boolean,
        default: false,
      },
      academic_event: {
        type: Boolean,
        default: false,
      },
      school_based_tournament: {
        type: Boolean,
        default: false,
      },
      sport_competition: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
