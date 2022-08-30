const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const dateFormat = require("../utils/dateFormat");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: [true, "You must leave a comment or thought"],
      minLength: [1, "Comments must be between 1 and 280 characters"],
      maxLength: [280, "Comments must be between 1 and 280 characters"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: dateFormat,
    },
    username: {
      type: String,
      required: [true, "A username must be provided"],
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
//creates the virtual friendCount that gets reactions
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

//initialize the thought model
const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
