const { Schema, Types } = require('mongoose');
// const dateFormat = require('../utils/dateFormat');

//reactions schema through the Thought model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280
    },
    username: {
      type: String,
      required: [true, 'you must provide a username']
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now(),
    // },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false
  }
);

module.exports = reactionSchema;
