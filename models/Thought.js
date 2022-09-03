const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");
const moment = require("moment");

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
      default: (date) => moment(date).format('LLLL'),
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
      getters: true
    },
    id: false,
  }
);
//creates the virtual friendCount that gets reactions
thoughtSchema.virtual("reactionCount")
  .get(function () {
  return this.reactions.length;
});

//initialize the thought model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
